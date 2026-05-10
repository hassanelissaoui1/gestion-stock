import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Produits() {
  const [produits, setProduits] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [modeModification, setModeModification] = useState(false);
  const [idProduitModifie, setIdProduitModifie] = useState(null);

  const [nouveauProduit, setNouveauProduit] = useState({
    designation: "",
    description: "",
    prix: "",
    quantiteStock: "",
    seuilMinimum: "",
    fournisseurId: ""
  });

  useEffect(() => {
    chargerProduits();
    chargerFournisseurs();
  }, []);

  function chargerProduits() {
    setChargement(true);
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
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }

  function chargerFournisseurs() {
    fetch(`${API_BASE_URL}/fournisseurs/afficherFournisseurs`)
      .then((response) => response.json())
      .then((data) => {
        setFournisseurs(data);
      })
      .catch(() => {
        setFournisseurs([]);
      });
  }

  function changerValeur(e) {
    const { name, value } = e.target;

    setNouveauProduit({
      ...nouveauProduit,
      [name]: value
    });
  }

  function ajouterProduit(e) {
    e.preventDefault();

    setErreur("");
    setMessage("");

    const produitAEnvoyer = {
      designation: nouveauProduit.designation,
      description: nouveauProduit.description,
      prix: Number(nouveauProduit.prix),
      quantiteStock: Number(nouveauProduit.quantiteStock),
      seuilMinimum: Number(nouveauProduit.seuilMinimum),
      fournisseur: {
        id: Number(nouveauProduit.fournisseurId)
      }
    };

    let url = `${API_BASE_URL}/produits/ajouterProduit`;
    let method = "POST";

    if (modeModification) {
      url = `${API_BASE_URL}/produits/modifierProduit/${idProduitModifie}`;
      method = "PUT";
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(produitAEnvoyer)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            modeModification
              ? "Erreur lors de la modification du produit"
              : "Erreur lors de l’ajout du produit"
          );
        }
        return response.json();
      })
      .then(() => {
        setMessage(
          modeModification
            ? "Produit modifié avec succès"
            : "Produit ajouté avec succès"
        );

        setAfficherFormulaire(false);
        setModeModification(false);
        setIdProduitModifie(null);

        setNouveauProduit({
          designation: "",
          description: "",
          prix: "",
          quantiteStock: "",
          seuilMinimum: "",
          fournisseurId: ""
        });

        chargerProduits();
      })
      .catch((error) => {
        setErreur(error.message);
      });
  }

  function preparerModification(produit) {
    setAfficherFormulaire(true);
    setModeModification(true);
    setIdProduitModifie(produit.id);

    setNouveauProduit({
      designation: produit.designation,
      description: produit.description,
      prix: produit.prix,
      quantiteStock: produit.quantiteStock,
      seuilMinimum: produit.seuilMinimum,
      fournisseurId: produit.fournisseur?.id || ""
    });

    setErreur("");
    setMessage("");
  }

  function annulerFormulaire() {
    setAfficherFormulaire(false);
    setModeModification(false);
    setIdProduitModifie(null);

    setNouveauProduit({
      designation: "",
      description: "",
      prix: "",
      quantiteStock: "",
      seuilMinimum: "",
      fournisseurId: ""
    });
  }

  function supprimerProduit(id) {
    const confirmation = window.confirm("Voulez-vous vraiment supprimer ce produit ?");

    if (!confirmation) {
      return;
    }

    setErreur("");
    setMessage("");

    fetch(`${API_BASE_URL}/produits/supprimerProduit/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du produit");
        }

        return response.text();
      })
      .then(() => {
        setMessage("Produit supprimé avec succès");
        chargerProduits();
      })
      .catch((error) => {
        setErreur(error.message);
      });
  }

  const produitsFiltres = produits.filter((produit) =>
    produit.designation?.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <Layout sousTitre="Gestion des produits">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Gestion des produits</h3>
          <span className="small-text">Liste des produits enregistrés dans le stock</span>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
        >
          <i className="bi bi-plus-circle me-1"></i>
          {afficherFormulaire ? "Fermer" : "Ajouter produit"}
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
            <h5 className="mb-0">
              {modeModification ? "Modifier un produit" : "Ajouter un produit"}
            </h5>
          </div>

          <div className="card-body">
            <form onSubmit={ajouterProduit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Désignation</label>
                  <input
                    type="text"
                    name="designation"
                    className="form-control"
                    value={nouveauProduit.designation}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={nouveauProduit.description}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Prix</label>
                  <input
                    type="number"
                    name="prix"
                    className="form-control"
                    value={nouveauProduit.prix}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Quantité stock</label>
                  <input
                    type="number"
                    name="quantiteStock"
                    className="form-control"
                    value={nouveauProduit.quantiteStock}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Seuil minimum</label>
                  <input
                    type="number"
                    name="seuilMinimum"
                    className="form-control"
                    value={nouveauProduit.seuilMinimum}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Fournisseur</label>
                  <select
                    name="fournisseurId"
                    className="form-select"
                    value={nouveauProduit.fournisseurId}
                    onChange={changerValeur}
                    required
                  >
                    <option value="">Choisir un fournisseur</option>
                    {fournisseurs.map((fournisseur) => (
                      <option key={fournisseur.id} value={fournisseur.id}>
                        {fournisseur.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-12">
                  <button type="submit" className="btn btn-success me-2">
                    {modeModification ? "Modifier" : "Enregistrer"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={annulerFormulaire}
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
            <div className="col-md-9">
              <label className="form-label">Recherche</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par désignation"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100" onClick={chargerProduits}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Actualiser
              </button>
            </div>
          </div>
        </div>
      </div>

      {chargement && (
        <div className="alert alert-info">
          Chargement des produits...
        </div>
      )}

      <div className="card content-card">
        <div className="card-header bg-white">
          <h5 className="mb-0">Liste des produits</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Désignation</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Seuil minimum</th>
                <th>Fournisseur</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {produitsFiltres.length === 0 && !chargement ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                produitsFiltres.map((produit) => (
                  <tr key={produit.id}>
                    <td>{produit.id}</td>
                    <td>{produit.designation}</td>
                    <td>{produit.description}</td>
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
                    <td>{produit.fournisseur?.nom}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-1"
                        onClick={() => preparerModification(produit)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => supprimerProduit(produit.id)}
                      >
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

export default Produits;
