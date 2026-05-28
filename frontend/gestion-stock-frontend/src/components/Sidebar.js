import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="bi bi-box-seam me-2"></i>
        <span>StockApp</span>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard">
          <i className="bi bi-speedometer2 me-2"></i>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/produits">
          <i className="bi bi-box-seam me-2"></i>
          <span>Produits</span>
        </NavLink>

        <NavLink to="/fournisseurs">
          <i className="bi bi-truck me-2"></i>
          <span>Fournisseurs</span>
        </NavLink>

        <NavLink to="/mouvements">
          <i className="bi bi-arrow-left-right me-2"></i>
          <span>Mouvements</span>
        </NavLink>

        <NavLink to="/alertes">
          <i className="bi bi-exclamation-triangle me-2"></i>
          <span>Alertes</span>
        </NavLink>

        <NavLink to="/statistiques">
          <i className="bi bi-bar-chart-line me-2"></i>
          <span>Statistiques</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
