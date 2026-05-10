import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Mouvements() {
  const [mouvements, setMouvements] = useState([]);
  const [rechercheProduit, setRechercheProduit] = useState("");
  const [type, setType] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    chargerMouvements();
  }, []);

  function chargerMouvements() {
    setChargement(true);
    setErreur("");

    fetch(`${API_BASE_URL}/mouvements/afficherMouvementsStock`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des mouvements de stock");
        }
        return response.json();
      })
      .then((data) => {
        setMouvements(data);
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

  const mouvementsFiltres = mouvements.filter((mouvement) => {
    const produitOk =
      mouvement.produit?.designation?.toLowerCase().includes(rechercheProduit.toLowerCase());

    const typeOk =
      type === "" || mouvement.type === type;

    return produitOk && typeOk;
  });

  return (
    <Layout sousTitre="Suivi des entrées et sorties de stock">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Mouvements de stock</h3>
          <span className="small-text">Liste des entrées et sorties de stock enregistrées</span>
        </div>

        <div>
          <button className="btn btn-success me-2">
            <i className="bi bi-plus-circle me-1"></i>
            Entrée stock
          </button>

          <button className="btn btn-danger">
            <i className="bi bi-dash-circle me-1"></i>
            Sortie stock
          </button>
        </div>
      </div>

      <div className="card content-card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label">Produit</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par produit"
                value={rechercheProduit}
                onChange={(e) => setRechercheProduit(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Tous les types</option>
                <option value="ENTREE">ENTREE</option>
                <option value="SORTIE">SORTIE</option>
              </select>
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100" onClick={chargerMouvements}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Actualiser
              </button>
            </div>
          </div>
        </div>
      </div>

      {chargement && (
        <div className="alert alert-info">
          Chargement des mouvements de stock...
        </div>
      )}

      {erreur && (
        <div className="alert alert-danger">
          {erreur}
        </div>
      )}

      <div className="card content-card">
        <div className="card-header bg-white">
          <h5 className="mb-0">Liste des mouvements</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Produit</th>
                <th>Type</th>
                <th>Quantité</th>
                <th>Utilisateur</th>
                <th>Remarque</th>
              </tr>
            </thead>

            <tbody>
              {mouvementsFiltres.length === 0 && !chargement ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    Aucun mouvement trouvé
                  </td>
                </tr>
              ) : (
                mouvementsFiltres.map((mouvement) => (
                  <tr key={mouvement.id}>
                    <td>{mouvement.id}</td>
                    <td>{formaterDate(mouvement.dateMouvement)}</td>
                    <td>{mouvement.produit?.designation}</td>
                    <td>
                      <span className={mouvement.type === "ENTREE" ? "badge bg-success" : "badge bg-danger"}>
                        {mouvement.type}
                      </span>
                    </td>
                    <td>{mouvement.quantite}</td>
                    <td>
                      {mouvement.utilisateur?.nom} {mouvement.utilisateur?.prenom}
                    </td>
                    <td>{mouvement.remarque}</td>
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

export default Mouvements;
