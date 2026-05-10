import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Statistiques() {
  const [produits, setProduits] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [mouvements, setMouvements] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerStatistiques();
  }, []);

  function chargerStatistiques() {
    setChargement(true);
    setErreur("");

    Promise.all([
      fetch(`${API_BASE_URL}/produits/afficherProduits`),
      fetch(`${API_BASE_URL}/fournisseurs/afficherFournisseurs`),
      fetch(`${API_BASE_URL}/mouvements/afficherMouvementsStock`),
      fetch(`${API_BASE_URL}/alertes/afficherAlertes`)
    ])
      .then((responses) => {
        responses.forEach((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors du chargement des statistiques");
          }
        });

        return Promise.all(responses.map((response) => response.json()));
      })
      .then(([produitsData, fournisseursData, mouvementsData, alertesData]) => {
        setProduits(produitsData);
        setFournisseurs(fournisseursData);
        setMouvements(mouvementsData);
        setAlertes(alertesData);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }

  const totalProduits = produits.length;
  const totalFournisseurs = fournisseurs.length;
  const totalEntrees = mouvements.filter((mouvement) => mouvement.type === "ENTREE").length;
  const totalSorties = mouvements.filter((mouvement) => mouvement.type === "SORTIE").length;

  const alertesNouvelles = alertes.filter((alerte) => alerte.etat === "NOUVELLE").length;
  const alertesConsultees = alertes.filter((alerte) => alerte.etat === "CONSULTEE").length;
  const alertesTraitees = alertes.filter((alerte) => alerte.etat === "TRAITEE").length;

  function getEtatStock(produit) {
    if (produit.quantiteStock <= produit.seuilMinimum) {
      return "Stock faible";
    }

    return "Stock suffisant";
  }

  function getBadgeStock(produit) {
    if (produit.quantiteStock <= produit.seuilMinimum) {
      return "badge bg-danger";
    }

    return "badge bg-success";
  }

  return (
    <Layout sousTitre="Statistiques générales du stock">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Statistiques</h3>
          <span className="small-text">Vue générale sur les produits, mouvements et alertes</span>
        </div>

        <button className="btn btn-outline-primary" onClick={chargerStatistiques}>
          <i className="bi bi-arrow-clockwise me-1"></i>
          Actualiser
        </button>
      </div>

      {chargement && (
        <div className="alert alert-info">
          Chargement des statistiques...
        </div>
      )}

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card content-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Total produits</p>
                <h3>{totalProduits}</h3>
              </div>
              <div className="stat-icon bg-primary">
                <i className="bi bi-box-seam"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card content-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Total fournisseurs</p>
                <h3>{totalFournisseurs}</h3>
              </div>
              <div className="stat-icon bg-success">
                <i className="bi bi-truck"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card content-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Entrées stock</p>
                <h3>{totalEntrees}</h3>
              </div>
              <div className="stat-icon bg-warning">
                <i className="bi bi-arrow-down-circle"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card content-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Sorties stock</p>
                <h3>{totalSorties}</h3>
              </div>
              <div className="stat-icon bg-danger">
                <i className="bi bi-arrow-up-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card content-card p-3">
            <p className="small-text mb-1">Alertes nouvelles</p>
            <h3>{alertesNouvelles}</h3>
            <span className="badge bg-warning text-dark">NOUVELLE</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card content-card p-3">
            <p className="small-text mb-1">Alertes consultées</p>
            <h3>{alertesConsultees}</h3>
            <span className="badge bg-info text-dark">CONSULTEE</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card content-card p-3">
            <p className="small-text mb-1">Alertes traitées</p>
            <h3>{alertesTraitees}</h3>
            <span className="badge bg-success">TRAITEE</span>
          </div>
        </div>
      </div>

      <div className="card content-card">
        <div className="card-header bg-white">
          <h5 className="mb-0">État du stock</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité actuelle</th>
                <th>Seuil minimum</th>
                <th>État</th>
              </tr>
            </thead>

            <tbody>
              {produits.length === 0 && !chargement ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                produits.map((produit) => (
                  <tr key={produit.id}>
                    <td>{produit.designation}</td>
                    <td>{produit.quantiteStock}</td>
                    <td>{produit.seuilMinimum}</td>
                    <td>
                      <span className={getBadgeStock(produit)}>
                        {getEtatStock(produit)}
                      </span>
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

export default Statistiques;
