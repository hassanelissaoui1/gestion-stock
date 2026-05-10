import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Alertes() {
  const [alertes, setAlertes] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [etatFiltre, setEtatFiltre] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");

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

  function consulterAlerte(id) {
    setErreur("");
    setMessage("");

    fetch(`${API_BASE_URL}/alertes/consulterAlerte/${id}`, {
      method: "PUT"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la consultation de l’alerte");
        }

        return response.json();
      })
      .then(() => {
        setMessage("Alerte consultée avec succès");
        chargerAlertes();
      })
      .catch((error) => {
        setErreur(error.message);
      });
  }

  function traiterAlerte(id) {
    const confirmation = window.confirm("Voulez-vous vraiment traiter cette alerte ?");

    if (!confirmation) {
      return;
    }

    setErreur("");
    setMessage("");

    fetch(`${API_BASE_URL}/alertes/traiterAlerte/${id}`, {
      method: "PUT"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du traitement de l’alerte");
        }

        return response.json();
      })
      .then(() => {
        setMessage("Alerte traitée avec succès");
        chargerAlertes();
      })
      .catch((error) => {
        setErreur(error.message);
      });
  }

  function getBadgeEtat(etat) {
    if (etat === "NOUVELLE") {
      return "badge bg-warning text-dark";
    }

    if (etat === "CONSULTEE") {
      return "badge bg-info text-dark";
    }

    if (etat === "TRAITEE") {
      return "badge bg-success";
    }

    return "badge bg-secondary";
  }

  function formaterDate(date) {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString("fr-FR");
  }

  const totalNouvelles = alertes.filter((alerte) => alerte.etat === "NOUVELLE").length;
  const totalConsultees = alertes.filter((alerte) => alerte.etat === "CONSULTEE").length;
  const totalTraitees = alertes.filter((alerte) => alerte.etat === "TRAITEE").length;

  const alertesFiltrees = alertes.filter((alerte) => {
    const produitNom = alerte.produit?.designation?.toLowerCase() || "";
    const messageAlerte = alerte.message?.toLowerCase() || "";
    const rechercheMinuscule = recherche.toLowerCase();

    const correspondRecherche =
      produitNom.includes(rechercheMinuscule) ||
      messageAlerte.includes(rechercheMinuscule);

    const correspondEtat =
      etatFiltre === "" || alerte.etat === etatFiltre;

    return correspondRecherche && correspondEtat;
  });

  return (
    <Layout sousTitre="Gestion des alertes de stock">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Alertes de stock</h3>
          <span className="small-text">
            Liste des alertes liées au stock faible
          </span>
        </div>

        <button className="btn btn-outline-primary" onClick={chargerAlertes}>
          <i className="bi bi-arrow-clockwise me-1"></i>
          Actualiser
        </button>
      </div>

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card content-card p-3">
            <p className="small-text mb-1">Alertes nouvelles</p>
            <h3>{totalNouvelles}</h3>
            <span className="badge bg-warning text-dark">NOUVELLE</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card content-card p-3">
            <p className="small-text mb-1">Alertes consultées</p>
            <h3>{totalConsultees}</h3>
            <span className="badge bg-info text-dark">CONSULTEE</span>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card content-card p-3">
            <p className="small-text mb-1">Alertes traitées</p>
            <h3>{totalTraitees}</h3>
            <span className="badge bg-success">TRAITEE</span>
          </div>
        </div>
      </div>

      <div className="card content-card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Recherche</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par produit ou message"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">État</label>
              <select
                className="form-select"
                value={etatFiltre}
                onChange={(e) => setEtatFiltre(e.target.value)}
              >
                <option value="">Tous</option>
                <option value="NOUVELLE">Nouvelle</option>
                <option value="CONSULTEE">Consultée</option>
                <option value="TRAITEE">Traitée</option>
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
              {alertesFiltrees.length === 0 && !chargement ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Aucune alerte trouvée
                  </td>
                </tr>
              ) : (
                alertesFiltrees.map((alerte) => (
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
                      <button
                        className="btn btn-info btn-sm me-1"
                        onClick={() => consulterAlerte(alerte.id)}
                        disabled={alerte.etat === "CONSULTEE" || alerte.etat === "TRAITEE"}
                      >
                        Consulter
                      </button>

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => traiterAlerte(alerte.id)}
                        disabled={alerte.etat === "TRAITEE"}
                      >
                        Traiter
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
