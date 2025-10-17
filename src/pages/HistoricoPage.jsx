import { useState } from 'react'
import { useCalculos } from '../context/CalculosContext'

const HistoricoPage = () => {
  const { calculos, carregando, erro, carregarCalculos } = useCalculos()
  const [excluindo, setExcluindo] = useState(null)

  const formatarMoeda = (valor) => {
    if (!valor && valor !== 0) return 'R$ 0,00'
    return `R$ ${Number(valor)
      .toFixed(2)
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }

  const formatarData = (dataString) => {
    const data = new Date(dataString + 'T00:00:00')
    return data.toLocaleDateString('pt-BR')
  }

  const calcularEstatisticas = () => {
    if (calculos.length === 0) return null

    const totalInvestido = calculos.reduce((sum, calc) => sum + calc.investimento, 0)
    const fundosUnicos = [...new Set(calculos.map((calc) => calc.fundo))].length

    // 🔹 Soma total da renda desejada
    const totalRendaDesejada = calculos.reduce((sum, calc) => sum + calc.renda_desejada, 0)

    // 🔹 Soma total do valor necessário
    const totalValorNecessario = calculos.reduce((sum, calc) => sum + calc.valor_necessario, 0)

    return {
      totalCalculos: calculos.length,
      fundosUnicos,
      totalInvestido,
      totalRendaDesejada,
      totalValorNecessario
    }
  }

  const handleExcluirCalculo = async (id, fundo) => {
    if (!window.confirm(`Tem certeza que deseja excluir o cálculo do fundo ${fundo}?`)) {
      return
    }

    setExcluindo(id)

    try {
      const response = await fetch(`https://investiment.onrender.com/investment/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      await carregarCalculos()
      alert('Cálculo excluído com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir cálculo:', error)
      alert(`Erro ao excluir cálculo: ${error.message}`)
    } finally {
      setExcluindo(null)
    }
  }

  const estatisticas = calcularEstatisticas()

  if (carregando) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>📋 Histórico de Consultas</h1>
          <p>Visualize todos os cálculos realizados</p>
        </div>
        <div className="loading">Carregando histórico...</div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📋 Histórico de Consultas</h1>
        <p>Visualize todos os cálculos realizados</p>
      </div>

      {erro && (
        <div className="alerta">
          {erro}
          <button
            onClick={carregarCalculos}
            className="btn btn-primary"
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              fontSize: '0.8rem'
            }}
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {estatisticas && (
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total de Cálculos</h3>
            <div className="stat-value">{estatisticas.totalCalculos}</div>
          </div>
          <div className="stat-card">
            <h3>Fundos Únicos</h3>
            <div className="stat-value">{estatisticas.fundosUnicos}</div>
          </div>
          <div className="stat-card">
            <h3>Investimento Total</h3>
            <div className="stat-value">{formatarMoeda(estatisticas.totalInvestido)}</div>
          </div>
          <div className="stat-card destaque">
            <h3>💵 Soma da Renda Desejada</h3>
            <div className="stat-value">{formatarMoeda(estatisticas.totalRendaDesejada)}</div>
          </div>
          <div className="stat-card destaque">
            <h3>🏦 Soma do Valor Necessário</h3>
            <div className="stat-value">{formatarMoeda(estatisticas.totalValorNecessario)}</div>
          </div>
        </div>
      )}

      {calculos.length > 0 ? (
        <div className="table-responsive">
          <div className="table-container">
            <table className="historico-table">
              <thead>
                <tr>
                  <th>Fundo</th>
                  <th className="mobile-hidden">Data</th>
                  <th className="mobile-hidden">Preço</th>
                  <th className="mobile-hidden">Dividendo</th>
                  <th>Investimento</th>
                  <th>Nº Mágico</th>
                  <th className="mobile-hidden">Renda Desejada</th>
                  <th className="mobile-hidden">Valor Necessário</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {calculos.map((calculo) => (
                  <tr key={calculo.id}>
                    <td data-label="Fundo">
                      <strong>{calculo.fundo}</strong>
                    </td>
                    <td data-label="Data" className="mobile-hidden">
                      {formatarData(calculo.data)}
                    </td>
                    <td data-label="Preço" className="mobile-hidden">
                      {formatarMoeda(calculo.preco)}
                    </td>
                    <td data-label="Dividendo" className="mobile-hidden">
                      {formatarMoeda(calculo.dividendo)}
                    </td>
                    <td data-label="Investimento">
                      <strong>{formatarMoeda(calculo.investimento)}</strong>
                    </td>
                    <td data-label="Nº Mágico">
                      <span className="numero-magico-badge">
                        {calculo.numero_magico}
                      </span>
                    </td>
                    <td data-label="Renda Desejada" className="mobile-hidden">
                      {formatarMoeda(calculo.renda_desejada)}
                    </td>
                    <td data-label="Valor Necessário" className="mobile-hidden">
                      {formatarMoeda(calculo.valor_necessario)}
                    </td>
                    <td data-label="Ações">
                      <button
                        onClick={() => handleExcluirCalculo(calculo.id, calculo.fundo)}
                        disabled={excluindo === calculo.id}
                        style={{
                          padding: '6px 12px',
                          background: excluindo === calculo.id ? '#95a5a6' : '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: excluindo === calculo.id ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          opacity: excluindo === calculo.id ? 0.7 : 1
                        }}
                        onMouseOver={(e) => {
                          if (excluindo !== calculo.id) {
                            e.target.style.background = '#c0392b'
                            e.target.style.transform = 'translateY(-1px)'
                          }
                        }}
                        onMouseOut={(e) => {
                          if (excluindo !== calculo.id) {
                            e.target.style.background = '#e74c3c'
                            e.target.style.transform = 'translateY(0)'
                          }
                        }}
                      >
                        {excluindo === calculo.id ? '🗑️ Excluindo...' : '🗑️ Excluir'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !erro && (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              color: '#7f8c8d'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📊</div>
            <h3>Nenhum cálculo encontrado</h3>
            <p>Realize cálculos na página da calculadora para ver o histórico aqui.</p>
          </div>
        )
      )}
    </div>
  )
}

export default HistoricoPage
