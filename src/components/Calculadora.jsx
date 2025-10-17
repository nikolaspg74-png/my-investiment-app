import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Calculadora = () => {
  const [formData, setFormData] = useState({
    fundo: '',
    preco: '0,00',
    dividendo: '0,00',
    renda_desejada: '0,00'
  })


  const [errors, setErrors] = useState({})
  const [resultado, setResultado] = useState(null)
  const [salvando, setSalvando] = useState(false)

const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    let cleanedValue = value
    if (name !== 'fundo') {
      cleanedValue = value.replace(/[^\d,.]/g, '')
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: cleanedValue
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const formatarNumero = (valor) => {
    if (!valor || valor === '') return 0
    const numeroString = valor.replace(',', '.')
    return parseFloat(numeroString) || 0
  }

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor)
  }

  const validarFormulario = () => {
    const novosErros = {}

    if (!formData.fundo.trim()) {
      novosErros.fundo = 'Nome do fundo é obrigatório'
    } else if (formData.fundo.trim().length < 4) {
      novosErros.fundo = 'Nome do fundo deve ter pelo menos 4 caracteres'
    }

    if (!formData.preco.trim()) {
      novosErros.preco = 'Preço da cota é obrigatório'
    } else {
      const precoNum = formatarNumero(formData.preco)
      if (precoNum <= 0) {
        novosErros.preco = 'Preço da cota deve ser maior que zero'
      }
    }

    if (!formData.dividendo.trim()) {
      novosErros.dividendo = 'Dividendo é obrigatório'
    } else {
      const dividendoNum = formatarNumero(formData.dividendo)
      if (dividendoNum <= 0) {
        novosErros.dividendo = 'Dividendo deve ser maior que zero'
      }
    }

    if (!formData.renda_desejada.trim()) {
      novosErros.renda_desejada = 'Renda desejada é obrigatória'
    } else {
      const rendaNum = formatarNumero(formData.renda_desejada)
      if (rendaNum <= 0) {
        novosErros.renda_desejada = 'Renda desejada deve ser maior que zero'
      }
    }

    setErrors(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const calcularNumeroMagico = () => {
    if (!validarFormulario()) {
      return
    }

    const rendaDesejada = formatarNumero(formData.renda_desejada)
    const dividendo = formatarNumero(formData.dividendo)
    const preco = formatarNumero(formData.preco)

    if (dividendo === 0) {
      setErrors(prev => ({ ...prev, dividendo: 'O dividendo não pode ser zero' }))
      return
    }

    // Cálculo do Número Mágico (cotas para os dividendos pagarem uma nova cota)
    const numeroMagico = Math.ceil(preco / dividendo)
    const valorNecessarioNumeroMagico = numeroMagico * preco

    // Cálculo para renda mensal desejada
    const cotasParaRenda = Math.ceil(rendaDesejada / dividendo)
    const investimentoParaRenda = cotasParaRenda * preco

    setResultado({
      numeroMagico,
      valorNecessarioNumeroMagico,
      cotasParaRenda,
      investimentoParaRenda,
      rendaDesejada: rendaDesejada
    })
  }

  const handleCalcular = (e) => {
    e.preventDefault()
    calcularNumeroMagico()
  }

  const handleLimpar = () => {
    setFormData({
      fundo: '',
      preco: '0,00',
      dividendo: '0,00',
      renda_desejada: '0,00'
    })
    setErrors({})
    setResultado(null)
  }

  const handleSalvarCalculo = async () => {
    if (!validarFormulario() || !resultado) {
      alert('Preencha todos os campos obrigatórios corretamente antes de salvar')
      return
    }

    setSalvando(true)

    try {
      const preco = formatarNumero(formData.preco)
      const dividendo = formatarNumero(formData.dividendo)
      const rendaDesejada = formatarNumero(formData.renda_desejada)

      const calculoData = {
        fundo: formData.fundo.toUpperCase(),
        preco: preco,
        dividendo: dividendo,
        renda_desejada: rendaDesejada,
        numero_magico: resultado.numeroMagico,
        investimento: resultado.valorNecessarioNumeroMagico, // ✅ CORRIGIDO: Valor para número mágico
        data: new Date().toISOString().split('T')[0],
        cotas_necessarias: resultado.cotasParaRenda,
        valor_necessario: resultado.investimentoParaRenda // ✅ CORRIGIDO: Valor para renda mensal
      }

      console.log('Enviando para o backend:', calculoData)

      const response = await fetch('https://investiment.onrender.com/investment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calculoData)
      })

      // Verifica se a resposta é OK
      if (!response.ok) {
        let errorMessage = `Erro ${response.status}: ${response.statusText}`
        
        // Tenta extrair mensagem de erro do corpo da resposta
        try {
          const errorText = await response.text()
          if (errorText) {
            // Tenta parsear como JSON, se não conseguir, usa o texto puro
            try {
              const errorData = JSON.parse(errorText)
              errorMessage = errorData.error || errorData.message || errorText
            } catch {
              errorMessage = errorText
            }
          }
        } catch {
          // Se não conseguir ler o corpo, mantém a mensagem padrão
        }
        
        throw new Error(errorMessage)
      }

      // Tenta parsear a resposta como JSON
      let responseData
      const responseText = await response.text()
      
      if (responseText) {
        try {
          responseData = JSON.parse(responseText)
        } catch (parseError) {
          console.warn('Resposta não é JSON válido, usando texto:', responseText)
          responseData = { message: responseText }
        }
      } else {
        responseData = { message: 'Cálculo salvo com sucesso!' }
      }

      console.log('Resposta do servidor:', responseData)
      navigate('/historico');
      alert(responseData.message || 'Cálculo salvo com sucesso!')
      setTimeout(() => {
        window.location.reload();
      }, 100);
      handleLimpar()


    } catch (error) {
      console.error('Erro ao salvar cálculo:', error)
      alert(`Erro ao salvar cálculo: ${error.message}`)
    } finally {
      setSalvando(false)
    }
  }

  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '12px 15px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: errors[fieldName] ? '1px solid var(--danger)' : '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    marginBottom: errors[fieldName] ? '5px' : '0'
  })

  return (
    <div className="calculadora-layout">
      <div className="calculadora-form-container">
        <form onSubmit={handleCalcular}>
          {/* Nome do Fundo */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-icon">🏢</span>
              Nome do Fundo *
            </label>
            <input
              type="text"
              name="fundo"
              value={formData.fundo}
              onChange={handleInputChange}
              placeholder="Ex: MXRF11"
              style={getInputStyle('fundo')}
            />
            {errors.fundo && (
              <p style={{ 
                color: 'var(--danger)', 
                fontSize: '0.8rem', 
                margin: '5px 0 0 0',
                fontWeight: '500'
              }}>
                ⚠️ {errors.fundo}
              </p>
            )}
            <p className="form-hint">EX: MXRF11, FIGLG11, etc.</p>
          </div>

          {/* Preço da Cota */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-icon">💰</span>
              Preço da cota (R$) *
            </label>
            <input
              type="text"
              name="preco"
              value={formData.preco}
              onChange={handleInputChange}
              style={getInputStyle('preco')}
            />
            {errors.preco && (
              <p style={{ 
                color: 'var(--danger)', 
                fontSize: '0.8rem', 
                margin: '5px 0 0 0',
                fontWeight: '500'
              }}>
                ⚠️ {errors.preco}
              </p>
            )}
            <p className="form-hint">Valor atual da cota no mercado</p>
          </div>

          {/* Último Dividendo */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-icon">📈</span>
              Último dividendo pago (R$) *
            </label>
            <input
              type="text"
              name="dividendo"
              value={formData.dividendo}
              onChange={handleInputChange}
              style={getInputStyle('dividendo')}
            />
            {errors.dividendo && (
              <p style={{ 
                color: 'var(--danger)', 
                fontSize: '0.8rem', 
                margin: '5px 0 0 0',
                fontWeight: '500'
              }}>
                ⚠️ {errors.dividendo}
              </p>
            )}
            <p className="form-hint">Valor do último provento pago por cota</p>
          </div>

          {/* Renda Mensal Desejada */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-icon">🎯</span>
              Renda mensal desejada (R$) *
            </label>
            <input
              type="text"
              name="renda_desejada"
              value={formData.renda_desejada}
              onChange={handleInputChange}
              style={getInputStyle('renda_desejada')}
            />
            {errors.renda_desejada && (
              <p style={{ 
                color: 'var(--danger)', 
                fontSize: '0.8rem', 
                margin: '5px 0 0 0',
                fontWeight: '500'
              }}>
                ⚠️ {errors.renda_desejada}
              </p>
            )}
            <p className="form-hint">Renda mensal que você deseja receber</p>
          </div>

          {/* Divisor */}
          <div style={{
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '25px 0'
          }}></div>

          {/* Botões */}
          <div className="buttons" style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <button
              type="submit"
              className="btn"
              style={{
                flex: 1,
                padding: '12px 24px',
                background: 'var(--gradient-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Calcular
            </button>
            <button
              type="button"
              onClick={handleLimpar}
              className="btn"
              style={{
                flex: 1,
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-primary)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius)',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
            >
              Limpar
            </button>
          </div>
        </form>

        {/* Resultados */}
        {resultado && (
          <div className="result">
            <div className="result-header">
              <h3>Resultado do Cálculo</h3>
            </div>
            
            <div className="result-grid">
              <div className="result-item">
                <span className="result-label">Número Mágico:</span>
                <span className="result-value" style={{ color: 'var(--primary-light)' }}>
                  {resultado.numeroMagico.toLocaleString('pt-BR')} cotas
                </span>
              </div>
              
              <div className="result-item">
                <span className="result-label">Valor necessário:</span>
                <span className="result-value" style={{ color: 'var(--success)' }}>
                  R$ {formatarMoeda(resultado.valorNecessarioNumeroMagico)}
                </span>
              </div>
              
              <div className="result-divider"></div>
              
              <div className="result-item highlight">
                <span className="result-label">
                  Para ganhar R$ {formatarMoeda(resultado.rendaDesejada)} por mês:
                </span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>
                    Você precisa de {resultado.cotasParaRenda.toLocaleString('pt-BR')} cotas
                  </div>
                  <div style={{ color: 'var(--success)', fontWeight: '700', fontSize: '1rem', marginTop: '5px' }}>
                    Investimento: R$ {formatarMoeda(resultado.investimentoParaRenda)}
                  </div>
                </div>
              </div>
            </div>

            {/* Botão Salvar */}
            <button
              type="button"
              onClick={handleSalvarCalculo}
              disabled={salvando}
              style={{
                width: '100%',
                padding: '12px 24px',
                background: salvando ? 'var(--secondary)' : 'var(--gradient-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: salvando ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '20px',
                opacity: salvando ? 0.7 : 1
              }}
              onMouseOver={(e) => !salvando && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => !salvando && (e.target.style.transform = 'translateY(0)')}
            >
              {salvando ? 'Salvando...' : '💾 Salvar Cálculo'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Calculadora