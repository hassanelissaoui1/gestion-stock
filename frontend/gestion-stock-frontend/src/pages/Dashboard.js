import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Dashboard() {
  const [produits, setProduits] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [mouvements, setMouvements] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerDashboard();
  }, []);

  function chargerDashboard() {
    setErreur("");

    fetch(`${API_BASE_URL}/produits/afficherProduits`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des produits");
        }
        return response.json();
      })
      .then((data) => {
        setProduits(data);
      })
      .catch((error) => {
        setErreur(error.message);
      });

    fetch(`${API_BASE_URL}/fournisseurs/afficherFournisseurs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des fournisseurs");
        }
        return response.json();
      })
      .then((data) => {
        setFournisseurs(data);
      })
      .catch((error) => {
        setErreur(error.message);
      });

    fetch(`${API_BASE_URL}/mouvements/afficherMouvementsStock`)
      .then((response) => {
        if (!response.ok) {
          setMouvements([]);
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setMouvements(data);
      })
      .catch(() => {
        setMouvements([]);
      });

    fetch(`${API_BASE_URL}/alertes/afficherAlertes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des alertes");
        }
        return response.json();
      })
      .then((data) => {
        setAlertes(data);
      })
      .catch((error) => {
        setErreur(error.message);
      });
  }

  const produitsRecents = produits.slice(-5).reverse();
  const alertesRecentes = alertes.slice(-3).reverse();

  return (
    <Layout sousTitre="Bienvenue dans votre espace de gestion">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Tableau de bord</h3>
        </div>

        <button className="btn btn-outline-primary" onClick={chargerDashboard}>
          <i className="bi bi-arrow-clockwise me-1"></i>
          Actualiser
        </button>
      </div>

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Produits</p>
                <h3>{produits.length}</h3>
              </div>
              <div className="stat-icon bg-products">
                <i className="bi bi-box"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Fournisseurs</p>
                <h3>{fournisseurs.length}</h3>
              </div>
              <div className="stat-icon bg-suppliers">
                <i className="bi bi-truck"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Mouvements</p>
                <h3>{mouvements.length}</h3>
              </div>
              <div className="stat-icon bg-movements">
                <i className="bi bi-arrow-left-right"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card stat-card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Alertes</p>
                <h3>{alertes.length}</h3>
              </div>
              <div className="stat-icon bg-alerts">
                <i className="bi bi-exclamation-triangle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-7">
          <div className="card content-card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Produits récents</h5>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Désignation</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Seuil</th>
                  </tr>
                </thead>

                <tbody>
                  {produitsRecents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Aucun produit trouvé
                      </td>
                    </tr>
                  ) : (
                    produitsRecents.map((produit) => (
                      <tr key={produit.id}>
                        <td>{produit.id}</td>
                        <td>{produit.designation}</td>
                        <td>{produit.prix} DH</td>
                        <td>
                          <span className={
                            produit.quantiteStock <= produit.seuilMinimum
                              ? "badge bg-danger"
                              : "badge bg-success"
                          }>
                            {produit.quantiteStock}
                          </span>
                        </td>
                        <td>{produit.seuilMinimum}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card content-card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Alertes récentes</h5>
            </div>

            <div className="card-body">
              {alertesRecentes.length === 0 ? (
                <p className="text-muted mb-0">Aucune alerte trouvée</p>
              ) : (
                alertesRecentes.map((alerte) => (
                  <div
                    key={alerte.id}
                    className={
                      alerte.etat === "TRAITEE"
                        ? "alert alert-success"
                        : alerte.etat === "CONSULTEE"
                          ? "alert alert-info"
                          : "alert alert-warning"
                    }
                  >
                    <strong>
                      {alerte.etat === "TRAITEE"
                        ? "Alerte traitée"
                        : alerte.etat === "CONSULTEE"
                          ? "Alerte consultée"
                          : "Stock faible"}
                    </strong>
                    <br />
                    {alerte.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
