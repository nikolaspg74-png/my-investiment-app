import { createContext, useContext, useState, useEffect } from 'react'

const BACKEND_URL = 'https://investiment.onrender.com'

const CalculosContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useCalculos = () => {
  const context = useContext(CalculosContext)
  if (!context) {
    throw new Error('useCalculos deve ser usado dentro de CalculosProvider')
  }
  return context
}

export const CalculosProvider = ({ children }) => {
  const [calculos, setCalculos] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const carregarCalculos = async () => {
    try {
      setCarregando(true)
      setErro('')
      const response = await fetch(`${BACKEND_URL}/investment`)
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setCalculos(data.data || [])
    } catch (error) {
      console.error('Erro ao carregar cálculos:', error)
      setErro('Erro ao carregar cálculos')
    } finally {
      setCarregando(false)
    }
  }

  const adicionarCalculo = async (novoCalculo) => {
    try {
      const response = await fetch(`${BACKEND_URL}/investiment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoCalculo)
      })

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      const resultado = await response.json()
      
      // Atualiza a lista localmente
      setCalculos(prev => [resultado.data, ...prev])
      
      return resultado
    } catch (error) {
      console.error('Erro ao salvar cálculo:', error)
      throw error
    }
  }

  // Carrega os cálculos quando o provider é montado
  useEffect(() => {
    carregarCalculos()
  }, [])

  const value = {
    calculos,
    carregando,
    erro,
    carregarCalculos,
    adicionarCalculo
  }

  return (
    <CalculosContext.Provider value={value}>
      {children}
    </CalculosContext.Provider>
  )
}