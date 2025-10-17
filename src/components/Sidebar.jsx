import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = ({ isMobileOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/",
      icon: "🧮",
      label: "Calculadora",
      active: location.pathname === "/",
    },
    {
      path: "/historico",
      icon: "📋",
      label: "Histórico de Consultas",
      active: location.pathname === "/historico",
    },
    {
      path: "/sobre",
      icon: "ℹ️",
      label: "Sobre",
      active: location.pathname === "/sobre",
    },
    {
      path: "/contato",
      icon: "📞",
      label: "Contato",
      active: location.pathname === "/contato",
    },
  ];

  const handleLinkClick = (path) => {
    if (onClose) onClose();

    if (path === "/historico") {
      if (location.pathname === "/historico") {
        // Se já está em /historico, força refresh da página
        window.location.reload();
      } else {
        // Se ainda não está, navega normalmente
        navigate("/historico");
      }
    }
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isMobileOpen && (
        <div className="mobile-overlay active" onClick={onClose} />
      )}

      <div className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <h2>
            <span>📊</span>
            <span>Invest Calculator</span>
          </h2>
        </div>

        <nav>
          <ul className="sidebar-nav">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={item.active ? "active" : ""}
                  onClick={(e) => {
                    // Intercepta o clique em Histórico
                    if (item.path === "/historico") {
                      e.preventDefault();
                      handleLinkClick(item.path);
                    } else {
                      handleLinkClick(item.path);
                    }
                  }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer da Sidebar */}
        <div className="sidebar-footer">
          <div className="footer-content">
            <p>💰 Seu parceiro em investimentos</p>
            <div className="footer-links">
              <span>Versão 1.0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
