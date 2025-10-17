// pages/SobrePage.js
import React from 'react';

const SobrePage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>ℹ️ Sobre o Projeto</h1>
        <p>Conheça mais sobre a Calculadora de Fundos Imobiliários</p>
      </div>

      <div className="sobre-content">
        <div className="info-card">
          <h2>🎯 O que é este projeto?</h2>
          <p>
            A <strong>Calculadora FII</strong> é uma ferramenta desenvolvida para ajudar 
            investidores a planejarem seus investimentos em Fundos Imobiliários de forma 
            inteligente e estratégica.
          </p>
        </div>

        <div className="info-card">
          <h2>🧮 Como funciona a calculadora?</h2>
          <p>
            Nossa calculadora utiliza o conceito do <strong>"Número Mágico"</strong> - 
            que é a quantidade de cotas necessárias para que os dividendos recebidos 
            paguem o valor de uma nova cota.
          </p>
          
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <div>
                <h4>Número Mágico</h4>
                <p>Calcula quantas cotas são necessárias para os dividendos pagarem uma nova cota</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <h4>Renda Mensal</h4>
                <p>Mostra o investimento necessário para alcançar sua renda mensal desejada</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">💾</span>
              <div>
                <h4>Histórico</h4>
                <p>Salva todos os seus cálculos para consulta futura e acompanhamento</p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h2>📊 Benefícios para o Investidor</h2>
          <ul className="benefits-list">
            <li>✅ <strong>Planejamento estratégico</strong> dos investimentos</li>
            <li>✅ <strong>Visualização clara</strong> do caminho para a independência financeira</li>
            <li>✅ <strong>Controle e histórico</strong> de todos os cálculos realizados</li>
            <li>✅ <strong>Interface intuitiva</strong> e fácil de usar</li>
            <li>✅ <strong>100% gratuito</strong> e sem complicações</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>🚀 Tecnologias Utilizadas</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-icon">⚛️</span>
              <span>React.js</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🟢</span>
              <span>Node.js</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🗄️</span>
              <span>SQLite</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🎨</span>
              <span>CSS3</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🔗</span>
              <span>Express.js</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">⚡</span>
              <span>REST API</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h2>💡 Dica Importante</h2>
          <p>
            Lembre-se que investimentos em FIIs envolvem riscos. Esta calculadora é uma 
            ferramenta de planejamento e não uma recomendação de investimento. 
            Sempre consulte um profissional financeiro antes de tomar decisões importantes.
          </p>
        </div>

        <div className="info-card">
          <h2>🌟 Objetivo do Projeto</h2>
          <p>
            Este projeto foi desenvolvido com o objetivo de democratizar o acesso a 
            ferramentas de planejamento financeiro, ajudando investidores a tomarem 
            decisões mais informadas sobre seus investimentos em fundos imobiliários.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SobrePage;