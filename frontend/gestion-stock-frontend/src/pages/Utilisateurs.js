import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Utilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [role, setRole] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerUtilisateurs();
  }, []);

  function chargerUtilisateurs() {
    setChargement(true);
    setErreur("");

    fetch(`${API_BASE_URL}/utilisateurs/afficherUtilisateurs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des utilisateurs");
        }
        return response.json();
      })
      .then((data) => {
        setUtilisateurs(data);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }

  const utilisateursFiltres = utilisateurs.filter((utilisateur) => {
    const rechercheOk =
      utilisateur.nom?.toLowerCase().includes(recherche.toLowerCase()) ||
      utilisateur.prenom?.toLowerCase().includes(recherche.toLowerCase()) ||
      utilisateur.login?.toLowerCase().includes(recherche.toLowerCase()) ||
      utilisateur.email?.toLowerCase().includes(recherche.toLowerCase());

    const roleOk =
      role === "" || utilisateur.role?.nom === role;

    return rechercheOk && roleOk;
  });

  return (
    <Layout sousTitre="Gestion des utilisateurs">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Gestion des utilisateurs</h3>
          <span className="small-text">Liste des utilisateurs enregistrés dans le système</span>
        </div>

        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i>
          Ajouter utilisateur
        </button>
      </div>

      <div className="card content-card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label">Recherche</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par nom, login ou email"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Rôle</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Tous les rôles</option>
                <option value="ADMIN">ADMIN</option>
                <option value="GESTIONNAIRE_STOCK">GESTIONNAIRE_STOCK</option>
              </select>
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100" onClick={chargerUtilisateurs}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Actualiser
              </button>
            </div>
          </div>
        </div>
      </div>

      {chargement && (
        <div className="alert alert-info">
          Chargement des utilisateurs...
        </div>
      )}

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      <div className="card content-card">
        <div className="card-header bg-white">
          <h5 className="mb-0">Liste des utilisateurs</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Login</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>État</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {utilisateursFiltres.length === 0 && !chargement ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                utilisateursFiltres.map((utilisateur) => (
                  <tr key={utilisateur.id}>
                    <td>{utilisateur.id}</td>
                    <td>{utilisateur.nom}</td>
                    <td>{utilisateur.prenom}</td>
                    <td>{utilisateur.login}</td>
                    <td>{utilisateur.email}</td>
                    <td>
                      <span className="badge bg-primary">
                        {utilisateur.role?.nom}
                      </span>
                    </td>
                    <td>
                      <span className={utilisateur.actif ? "badge bg-success" : "badge bg-danger"}>
                        {utilisateur.actif ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm me-1">
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button className="btn btn-danger btn-sm">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Utilisateurs;
