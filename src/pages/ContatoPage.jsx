// pages/ContatoPage.js
import React, { useState } from 'react';

const ContatoPage = () => {
  const [copiado, setCopiado] = useState(false);

  const copiarEmail = () => {
    navigator.clipboard.writeText('nikolaspg74@gmail.com');
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const contatoItems = [
    {
      icon: '📧',
      title: 'E-mail',
      value: 'nikolaspg74@gmail.com',
      description: 'Principal forma de contato',
      action: copiarEmail
    },
    {
      icon: '💼',
      title: 'Disponibilidade',
      value: 'Freelance & Projetos',
      description: 'Aceitando novos projetos'
    },
    {
      icon: '🕒',
      title: 'Tempo de Resposta',
      value: 'Até 24 horas',
      description: 'Geralmente respondo rapidamente'
    },
    {
      icon: '📍',
      title: 'Localização',
      value: 'Remoto',
      description: 'Trabalho de qualquer lugar'
    }
  ];

  const projetosItems = [
    'Desenvolvimento Web Full Stack',
    'Aplicações React/Node.js',
    'Sistemas e APIs RESTful',
    'Banco de Dados SQL/NoSQL',
    'Landing Pages Responsivas',
    'Manutenção e Otimização'
  ];

  const tecnologiasItems = [
    'React.js & Next.js',
    'Node.js & Express',
    'JavaScript & TypeScript',
    'SQLite, MySQL & MongoDB',
    'CSS3 & Styled Components',
    'Git & GitHub'
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📞 Contato</h1>
        <p>Entre em contato com o desenvolvedor</p>
      </div>

      <div className="contato-content">
        {/* Card Principal de Contato */}
        <div className="contato-card">
          <div className="contato-header">
            <div className="avatar">👨‍💻</div>
            <div className="contato-info">
              <h2>Nikolas Pereira</h2>
              <p>Desenvolvedor Full Stack</p>
              <div className="status">
                <span className="status-dot"></span>
                Disponível para novos projetos
              </div>
            </div>
          </div>

          <div className="contato-details">
            {contatoItems.map((item, index) => (
              <div key={index} className="contato-item">
                <span className="contato-icon">{item.icon}</span>
                <div className="contato-text">
                  <h4>{item.title}</h4>
                  <p className="contato-value">{item.value}</p>
                  <p className="contato-description">{item.description}</p>
                </div>
                {item.action && (
                  <button 
                    onClick={item.action}
                    className={`btn-copiar ${copiado ? 'copiado' : ''}`}
                  >
                    {copiado ? '✅ Copiado!' : '📋 Copiar'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="info-cards-grid">
          <div className="info-card">
            <h3>🚀 Tipo de Projetos</h3>
            <ul className="skills-list">
              {projetosItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h3>💻 Tecnologias</h3>
            <ul className="skills-list">
              {tecnologiasItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="info-card">
            <h3>🎯 Sobre Mim</h3>
            <p>
              Sou um desenvolvedor apaixonado por criar soluções inovadoras e funcionais. 
              Este projeto nasceu da união entre minha paixão por programação e educação financeira.
            </p>
            <div className="personal-info">
              <div className="info-tag">🎓 Autodidata</div>
              <div className="info-tag">💡 Solucionador de Problemas</div>
              <div className="info-tag">🚀 Focado em Resultados</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>💬 Vamos trabalhar juntos?</h3>
            <p>
              Tem uma ideia de projeto? Precisa de um desenvolvedor para sua equipe? 
              Entre em contato e vamos conversar sobre como posso ajudar!
            </p>
            <div className="cta-buttons">
              <button 
                onClick={copiarEmail}
                className="btn-primary"
              >
                📧 Copiar E-mail
              </button>
              <button 
                onClick={() => window.location.href = 'mailto:nikolaspg74@gmail.com?subject=Projeto&body=Olá Nikolas, gostaria de conversar sobre...'}
                className="btn-secondary"
              >
                ✉️ Abrir E-mail
              </button>
            </div>
          </div>
        </div>

        {/* Dica Extra */}
        <div className="dica-card">
          <div className="dica-icon">💡</div>
          <div className="dica-content">
            <h4>Dica Profissional</h4>
            <p>
              Ao entrar em contato, mencione brevemente sobre seu projeto ou ideia. 
              Isso ajuda a entendermos rapidamente como posso contribuir!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;