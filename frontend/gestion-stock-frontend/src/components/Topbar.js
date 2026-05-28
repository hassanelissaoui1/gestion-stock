import { useNavigate } from 'react-router-dom';

function Topbar({ sousTitre }) {
  const navigate = useNavigate();

  const utilisateurConnecte = JSON.parse(localStorage.getItem("utilisateurConnecte"));

  function deconnecter() {
    localStorage.removeItem("utilisateurConnecte");
    navigate("/connexion");
  }

  return (
    <div className="topbar">
      <div className="topbar-title">
        <h5 className="mb-0">Application de gestion de stock</h5>
        <span className="small-text">{sousTitre}</span>
      </div>

      <div className="topbar-user">
        <span className="user-name">
          <i className="bi bi-person-circle"></i>{" "}
          {utilisateurConnecte
            ? `${utilisateurConnecte.prenom} ${utilisateurConnecte.nom}`
            : "Utilisateur"}
        </span>

        {utilisateurConnecte?.role?.nom && (
          <span className="badge bg-primary">
            {utilisateurConnecte.role.nom}
          </span>
        )}

        <button className="btn btn-outline-danger btn-sm" onClick={deconnecter}>
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default Topbar;
