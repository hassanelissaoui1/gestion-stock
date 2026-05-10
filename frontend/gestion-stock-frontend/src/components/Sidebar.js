import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="col-md-2 sidebar p-0">
      <div className="logo">
        <i className="bi bi-box-seam me-2"></i>
        StockApp
      </div>

      <NavLink to="/dashboard">
        <i className="bi bi-speedometer2 me-2"></i>
        Dashboard
      </NavLink>

      <NavLink to="/produits">
        <i className="bi bi-box-seam me-2"></i>
        Produits
      </NavLink>

      <NavLink to="/fournisseurs">
        <i className="bi bi-truck me-2"></i>
        Fournisseurs
      </NavLink>

      <NavLink to="/utilisateurs">
        <i className="bi bi-people me-2"></i>
        Utilisateurs
      </NavLink>

      <NavLink to="/mouvements">
        <i className="bi bi-arrow-left-right me-2"></i>
        Mouvements
      </NavLink>

      <NavLink to="/alertes">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Alertes
      </NavLink>

      <NavLink to="/statistiques">
        <i className="bi bi-bar-chart-line me-2"></i>
        Statistiques
      </NavLink>

      <NavLink to="/connexion">
        <i className="bi bi-box-arrow-right me-2"></i>
        Déconnexion
      </NavLink>
    </div>
  );
}

export default Sidebar;
