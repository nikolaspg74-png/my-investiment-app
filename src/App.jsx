// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
import Calculadora from './pages/CalculadoraPage';
import HistoricoPage from './pages/HistoricoPage';
import SobrePage from './pages/SobrePage';
import ContatoPage from './pages/ContatoPage';
import { CalculosProvider } from './context/CalculosContext';
import './App.css';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <CalculosProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Calculadora />} />
              <Route path="/historico" element={<HistoricoPage />} />
              <Route path="/sobre" element={<SobrePage />} />
              <Route path="/contato" element={<ContatoPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CalculosProvider>
  );
}

export default App;