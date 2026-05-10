import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [modeModification, setModeModification] = useState(false);
  const [idFournisseurModifie, setIdFournisseurModifie] = useState(null);

  const [nouveauFournisseur, setNouveauFournisseur] = useState({
    nom: "",
    telephone: "",
    email: "",
    adresse: ""
  });

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

  function changerValeur(e) {
    const { name, value } = e.target;

    setNouveauFournisseur({
      ...nouveauFournisseur,
      [name]: value
    });
  }

  function ajouterFournisseur(e) {
    e.preventDefault();

    setErreur("");
    setMessage("");

    let url = `${API_BASE_URL}/fournisseurs/ajouterFournisseur`;
    let method = "POST";

    if (modeModification) {
      url = `${API_BASE_URL}/fournisseurs/modifierFournisseur/${idFournisseurModifie}`;
      method = "PUT";
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nouveauFournisseur)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            modeModification
              ? "Erreur lors de la modification du fournisseur"
              : "Erreur lors de l’ajout du fournisseur"
          );
        }
        return response.json();
      })
      .then(() => {
        setMessage(
          modeModification
            ? "Fournisseur modifié avec succès"
            : "Fournisseur ajouté avec succès"
        );

        setAfficherFormulaire(false);
        setModeModification(false);
        setIdFournisseurModifie(null);

        setNouveauFournisseur({
          nom: "",
          telephone: "",
          email: "",
          adresse: ""
        });

        chargerFournisseurs();
      })
      .catch((error) => {
        setErreur(error.message);
      });
  }

  function preparerModification(fournisseur) {
    setAfficherFormulaire(true);
    setModeModification(true);
    setIdFournisseurModifie(fournisseur.id);

    setNouveauFournisseur({
      nom: fournisseur.nom,
      telephone: fournisseur.telephone,
      email: fournisseur.email,
      adresse: fournisseur.adresse
    });

    setErreur("");
    setMessage("");
  }

  function annulerFormulaire() {
    setAfficherFormulaire(false);
    setModeModification(false);
    setIdFournisseurModifie(null);

    setNouveauFournisseur({
      nom: "",
      telephone: "",
      email: "",
      adresse: ""
    });
  }

  function supprimerFournisseur(id) {
    const confirmation = window.confirm("Voulez-vous vraiment supprimer ce fournisseur ?");

    if (!confirmation) {
      return;
    }

    setErreur("");
    setMessage("");

    fetch(`${API_BASE_URL}/fournisseurs/supprimerFournisseur/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du fournisseur");
        }

        return response.text();
      })
      .then(() => {
        setMessage("Fournisseur supprimé avec succès");
        chargerFournisseurs();
      })
      .catch((error) => {
        setErreur(error.message);
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

        <button
          className="btn btn-primary"
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
        >
          <i className="bi bi-plus-circle me-1"></i>
          {afficherFormulaire ? "Fermer" : "Ajouter fournisseur"}
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
              {modeModification ? "Modifier un fournisseur" : "Ajouter un fournisseur"}
            </h5>
          </div>

          <div className="card-body">
            <form onSubmit={ajouterFournisseur}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    className="form-control"
                    value={nouveauFournisseur.nom}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="text"
                    name="telephone"
                    className="form-control"
                    value={nouveauFournisseur.telephone}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={nouveauFournisseur.email}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    className="form-control"
                    value={nouveauFournisseur.adresse}
                    onChange={changerValeur}
                    required
                  />
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
                      <button
                        className="btn btn-warning btn-sm me-1"
                        onClick={() => preparerModification(fournisseur)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => supprimerFournisseur(fournisseur.id)}
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

export default Fournisseurs;
