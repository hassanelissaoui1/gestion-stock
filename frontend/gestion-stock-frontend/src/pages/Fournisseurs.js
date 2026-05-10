import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerFournisseurs();
  }, []);

  function chargerFournisseurs() {
    setChargement(true);
    setErreur("");

    fetch(`${API_BASE_URL}/fournisseurs/afficherFournisseurs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des fournisseurs");
        }
        return response.json();
      })
      .then((data) => {
        setFournisseurs(data);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }

  const fournisseursFiltres = fournisseurs.filter((fournisseur) =>
    fournisseur.nom?.toLowerCase().includes(recherche.toLowerCase()) ||
    fournisseur.telephone?.toLowerCase().includes(recherche.toLowerCase()) ||
    fournisseur.email?.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <Layout sousTitre="Gestion des fournisseurs">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Gestion des fournisseurs</h3>
          <span className="small-text">Liste des fournisseurs enregistrés</span>
        </div>

        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i>
          Ajouter fournisseur
        </button>
      </div>

      <div className="card content-card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-9">
              <label className="form-label">Recherche</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par nom, téléphone ou email"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100" onClick={chargerFournisseurs}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Actualiser
              </button>
            </div>
          </div>
        </div>
      </div>

      {chargement && (
        <div className="alert alert-info">
          Chargement des fournisseurs...
        </div>
      )}

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      <div className="card content-card">
        <div className="card-header bg-white">
          <h5 className="mb-0">Liste des fournisseurs</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Adresse</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {fournisseursFiltres.length === 0 && !chargement ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Aucun fournisseur trouvé
                  </td>
                </tr>
              ) : (
                fournisseursFiltres.map((fournisseur) => (
                  <tr key={fournisseur.id}>
                    <td>{fournisseur.id}</td>
                    <td>{fournisseur.nom}</td>
                    <td>{fournisseur.telephone}</td>
                    <td>{fournisseur.email}</td>
                    <td>{fournisseur.adresse}</td>
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

export default Fournisseurs;
