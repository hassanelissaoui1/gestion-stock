import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Alertes() {
  const [alertes, setAlertes] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [etat, setEtat] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerAlertes();
  }, []);

  function chargerAlertes() {
    setChargement(true);
    setErreur("");

    fetch(`${API_BASE_URL}/alertes/afficherAlertes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des alertes");
        }
        return response.json();
      })
      .then((data) => {
        setAlertes(data);
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }

  function formaterDate(date) {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString("fr-FR");
  }

  function getBadgeEtat(etatAlerte) {
    if (etatAlerte === "TRAITEE") {
      return "badge bg-success";
    }

    if (etatAlerte === "CONSULTEE") {
      return "badge bg-info text-dark";
    }

    return "badge bg-warning text-dark";
  }

  const alertesFiltres = alertes.filter((alerte) => {
    const rechercheOk =
      alerte.message?.toLowerCase().includes(recherche.toLowerCase()) ||
      alerte.produit?.designation?.toLowerCase().includes(recherche.toLowerCase());

    const etatOk =
      etat === "" || alerte.etat === etat;

    return rechercheOk && etatOk;
  });

  const nombreNouvelles = alertes.filter((alerte) => alerte.etat === "NOUVELLE").length;
  const nombreConsultees = alertes.filter((alerte) => alerte.etat === "CONSULTEE").length;
  const nombreTraitees = alertes.filter((alerte) => alerte.etat === "TRAITEE").length;

  return (
    <Layout sousTitre="Gestion des alertes de stock">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Alertes de stock</h3>
          <span className="small-text">Liste des alertes liées aux produits en stock</span>
        </div>

        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i>
          Ajouter alerte
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card content-card p-3">
            <p className="small-text mb-1">Nouvelles alertes</p>
            <h3>{nombreNouvelles}</h3>
            <span className="badge bg-warning text-dark">NOUVELLE</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card content-card p-3">
            <p className="small-text mb-1">Alertes consultées</p>
            <h3>{nombreConsultees}</h3>
            <span className="badge bg-info text-dark">CONSULTEE</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card content-card p-3">
            <p className="small-text mb-1">Alertes traitées</p>
            <h3>{nombreTraitees}</h3>
            <span className="badge bg-success">TRAITEE</span>
          </div>
        </div>
      </div>

      <div className="card content-card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label">Recherche</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par produit ou message"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">État</label>
              <select
                className="form-select"
                value={etat}
                onChange={(e) => setEtat(e.target.value)}
              >
                <option value="">Tous les états</option>
                <option value="NOUVELLE">NOUVELLE</option>
                <option value="CONSULTEE">CONSULTEE</option>
                <option value="TRAITEE">TRAITEE</option>
              </select>
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100" onClick={chargerAlertes}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Actualiser
              </button>
            </div>
          </div>
        </div>
      </div>

      {chargement && (
        <div className="alert alert-info">
          Chargement des alertes...
        </div>
      )}

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      <div className="card content-card">
        <div className="card-header bg-white">
          <h5 className="mb-0">Liste des alertes</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Produit</th>
                <th>Message</th>
                <th>État</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {alertesFiltres.length === 0 && !chargement ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Aucune alerte trouvée
                  </td>
                </tr>
              ) : (
                alertesFiltres.map((alerte) => (
                  <tr key={alerte.id}>
                    <td>{alerte.id}</td>
                    <td>{formaterDate(alerte.dateAlerte)}</td>
                    <td>{alerte.produit?.designation}</td>
                    <td>{alerte.message}</td>
                    <td>
                      <span className={getBadgeEtat(alerte.etat)}>
                        {alerte.etat}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-info btn-sm me-1">
                        Consulter
                      </button>

                      <button className="btn btn-success btn-sm me-1">
                        Traiter
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

export default Alertes;
