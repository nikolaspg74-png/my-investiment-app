import Calculadora from '../components/Calculadora'

const CalculadoraPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🧮 Calculadora de Investimentos</h1>
        <p>Calcule o número mágico e o investimento necessário para sua renda mensal</p>
      </div>
      
      <Calculadora />
    </div>
  )
}

export default CalculadoraPage