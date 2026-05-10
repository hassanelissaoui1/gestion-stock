import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Mouvements() {
  const [mouvements, setMouvements] = useState([]);
  const [produits, setProduits] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [typeFiltre, setTypeFiltre] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  const [nouveauMouvement, setNouveauMouvement] = useState({
    type: "ENTREE",
    quantite: "",
    remarque: "",
    produitId: ""
  });

  useEffect(() => {
    chargerMouvements();
    chargerProduits();
  }, []);

  function chargerMouvements() {
    setChargement(true);
    setErreur("");

    fetch(`${API_BASE_URL}/mouvements/afficherMouvementsStock`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des mouvements");
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

  function chargerProduits() {
    fetch(`${API_BASE_URL}/produits/afficherProduits`)
      .then((response) => response.json())
      .then((data) => {
        setProduits(data);
      })
      .catch(() => {
        setProduits([]);
      });
  }

  function changerValeur(e) {
    const { name, value } = e.target;

    setNouveauMouvement({
      ...nouveauMouvement,
      [name]: value
    });
  }

  function ajouterMouvement(e) {
    e.preventDefault();

    setErreur("");
    setMessage("");

    const utilisateurConnecte = JSON.parse(localStorage.getItem("utilisateurConnecte"));

    if (!utilisateurConnecte || !utilisateurConnecte.id) {
      setErreur("Utilisateur non connecté");
      return;
    }

    const mouvementAEnvoyer = {
      quantite: Number(nouveauMouvement.quantite),
      remarque: nouveauMouvement.remarque,
      produit: {
        id: Number(nouveauMouvement.produitId)
      },
      utilisateur: {
        id: utilisateurConnecte.id
      }
    };

    let url = `${API_BASE_URL}/mouvements/ajouterEntreeStock`;

    if (nouveauMouvement.type === "SORTIE") {
      url = `${API_BASE_URL}/mouvements/ajouterSortieStock`;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mouvementAEnvoyer)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l’ajout du mouvement");
        }

        return response.json();
      })
      .then((data) => {
        if (data === null) {
          throw new Error("Mouvement refusé. Vérifiez la quantité, le produit ou l’utilisateur.");
        }

        setMessage("Mouvement ajouté avec succès");
        setAfficherFormulaire(false);

        setNouveauMouvement({
          type: "ENTREE",
          quantite: "",
          remarque: "",
          produitId: ""
        });

        chargerMouvements();
        chargerProduits();
      })
      .catch((error) => {
        setErreur(error.message);
      });
  }

  function formaterDate(date) {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString("fr-FR");
  }

  const mouvementsFiltres = mouvements.filter((mouvement) => {
    const produitNom = mouvement.produit?.designation?.toLowerCase() || "";
    const remarque = mouvement.remarque?.toLowerCase() || "";
    const rechercheMinuscule = recherche.toLowerCase();

    const correspondRecherche =
      produitNom.includes(rechercheMinuscule) ||
      remarque.includes(rechercheMinuscule);

    const correspondType =
      typeFiltre === "" || mouvement.type === typeFiltre;

    return correspondRecherche && correspondType;
  });

  return (
    <Layout sousTitre="Gestion des mouvements de stock">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Mouvements de stock</h3>
          <span className="small-text">
            Liste des entrées et sorties de stock
          </span>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
        >
          <i className="bi bi-plus-circle me-1"></i>
          {afficherFormulaire ? "Fermer" : "Ajouter mouvement"}
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

      {afficherFormulaire && (
        <div className="card content-card mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">Ajouter un mouvement de stock</h5>
          </div>

          <div className="card-body">
            <form onSubmit={ajouterMouvement}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Type de mouvement</label>
                  <select
                    name="type"
                    className="form-select"
                    value={nouveauMouvement.type}
                    onChange={changerValeur}
                    required
                  >
                    <option value="ENTREE">Entrée de stock</option>
                    <option value="SORTIE">Sortie de stock</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Produit</label>
                  <select
                    name="produitId"
                    className="form-select"
                    value={nouveauMouvement.produitId}
                    onChange={changerValeur}
                    required
                  >
                    <option value="">Choisir un produit</option>
                    {produits.map((produit) => (
                      <option key={produit.id} value={produit.id}>
                        {produit.designation} - Stock : {produit.quantiteStock}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Quantité</label>
                  <input
                    type="number"
                    name="quantite"
                    className="form-control"
                    value={nouveauMouvement.quantite}
                    onChange={changerValeur}
                    min="1"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Remarque</label>
                  <input
                    type="text"
                    name="remarque"
                    className="form-control"
                    value={nouveauMouvement.remarque}
                    onChange={changerValeur}
                    placeholder="Exemple : Achat fournisseur ou vente client"
                  />
                </div>

                <div className="col-md-12">
                  <button type="submit" className="btn btn-success me-2">
                    Enregistrer
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setAfficherFormulaire(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card content-card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Recherche</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par produit ou remarque"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={typeFiltre}
                onChange={(e) => setTypeFiltre(e.target.value)}
              >
                <option value="">Tous</option>
                <option value="ENTREE">Entrée</option>
                <option value="SORTIE">Sortie</option>
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
          Chargement des mouvements...
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
                      <span className={
                        mouvement.type === "ENTREE"
                          ? "badge bg-success"
                          : "badge bg-danger"
                      }>
                        {mouvement.type}
                      </span>
                    </td>
                    <td>{mouvement.quantite}</td>
                    <td>
                      {mouvement.utilisateur
                        ? `${mouvement.utilisateur.prenom} ${mouvement.utilisateur.nom}`
                        : ""}
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
