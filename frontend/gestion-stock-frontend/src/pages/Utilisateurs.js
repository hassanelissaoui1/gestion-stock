import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API_BASE_URL from '../services/api';

function Utilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [roles, setRoles] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [roleFiltre, setRoleFiltre] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [message, setMessage] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [modeModification, setModeModification] = useState(false);
  const [idUtilisateurModifie, setIdUtilisateurModifie] = useState(null);

  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    nom: "",
    prenom: "",
    login: "",
    motDePasse: "",
    email: "",
    actif: true,
    roleId: ""
  });

  useEffect(() => {
    chargerUtilisateurs();
    chargerRoles();
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

  function chargerRoles() {
    fetch(`${API_BASE_URL}/roles/afficherRoles`)
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
      })
      .catch(() => {
        setRoles([]);
      });
  }

  function changerValeur(e) {
    const { name, value, type, checked } = e.target;

    setNouvelUtilisateur({
      ...nouvelUtilisateur,
      [name]: type === "checkbox" ? checked : value
    });
  }

  function enregistrerUtilisateur(e) {
    e.preventDefault();

    setErreur("");
    setMessage("");

    const utilisateurAEnvoyer = {
      nom: nouvelUtilisateur.nom,
      prenom: nouvelUtilisateur.prenom,
      login: nouvelUtilisateur.login,
      motDePasse: nouvelUtilisateur.motDePasse,
      email: nouvelUtilisateur.email,
      actif: nouvelUtilisateur.actif,
      role: {
        id: Number(nouvelUtilisateur.roleId)
      }
    };

    let url = `${API_BASE_URL}/utilisateurs/ajouterUtilisateur`;
    let method = "POST";

    if (modeModification) {
      url = `${API_BASE_URL}/utilisateurs/modifierUtilisateur/${idUtilisateurModifie}`;
      method = "PUT";
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(utilisateurAEnvoyer)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            modeModification
              ? "Erreur lors de la modification de l’utilisateur"
              : "Erreur lors de l’ajout de l’utilisateur"
          );
        }

        return response.json();
      })
      .then(() => {
        setMessage(
          modeModification
            ? "Utilisateur modifié avec succès"
            : "Utilisateur ajouté avec succès"
        );

        annulerFormulaire();
        chargerUtilisateurs();
      })
      .catch((error) => {
        setErreur(error.message);
      });
  }

  function preparerModification(utilisateur) {
    setAfficherFormulaire(true);
    setModeModification(true);
    setIdUtilisateurModifie(utilisateur.id);

    setNouvelUtilisateur({
      nom: utilisateur.nom || "",
      prenom: utilisateur.prenom || "",
      login: utilisateur.login || "",
      motDePasse: utilisateur.motDePasse || "",
      email: utilisateur.email || "",
      actif: utilisateur.actif === true,
      roleId: utilisateur.role?.id || ""
    });

    setErreur("");
    setMessage("");
  }

  function supprimerUtilisateur(id) {
    const confirmation = window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?");

    if (!confirmation) {
      return;
    }

    setErreur("");
    setMessage("");

    fetch(`${API_BASE_URL}/utilisateurs/supprimerUtilisateur/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l’utilisateur");
        }

        return response.text();
      })
      .then(() => {
        setMessage("Utilisateur supprimé avec succès");
        chargerUtilisateurs();
      })
      .catch((error) => {
        setErreur(error.message);
      });
  }

  function annulerFormulaire() {
    setAfficherFormulaire(false);
    setModeModification(false);
    setIdUtilisateurModifie(null);

    setNouvelUtilisateur({
      nom: "",
      prenom: "",
      login: "",
      motDePasse: "",
      email: "",
      actif: true,
      roleId: ""
    });
  }

  const utilisateursFiltres = utilisateurs.filter((utilisateur) => {
    const nomComplet = `${utilisateur.prenom || ""} ${utilisateur.nom || ""}`.toLowerCase();
    const login = utilisateur.login?.toLowerCase() || "";
    const email = utilisateur.email?.toLowerCase() || "";
    const rechercheMinuscule = recherche.toLowerCase();

    const correspondRecherche =
      nomComplet.includes(rechercheMinuscule) ||
      login.includes(rechercheMinuscule) ||
      email.includes(rechercheMinuscule);

    const correspondRole =
      roleFiltre === "" || utilisateur.role?.nom === roleFiltre;

    return correspondRecherche && correspondRole;
  });

  return (
    <Layout sousTitre="Gestion des utilisateurs">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title mb-1">Gestion des utilisateurs</h3>
          <span className="small-text">
            Liste des utilisateurs enregistrés dans le système
          </span>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            if (afficherFormulaire) {
              annulerFormulaire();
            } else {
              setAfficherFormulaire(true);
            }
          }}
        >
          <i className="bi bi-plus-circle me-1"></i>
          {afficherFormulaire ? "Fermer" : "Ajouter utilisateur"}
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
              {modeModification ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
            </h5>
          </div>

          <div className="card-body">
            <form onSubmit={enregistrerUtilisateur}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    className="form-control"
                    value={nouvelUtilisateur.nom}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    className="form-control"
                    value={nouvelUtilisateur.prenom}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Login</label>
                  <input
                    type="text"
                    name="login"
                    className="form-control"
                    value={nouvelUtilisateur.login}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Mot de passe</label>
                  <input
                    type="text"
                    name="motDePasse"
                    className="form-control"
                    value={nouvelUtilisateur.motDePasse}
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
                    value={nouvelUtilisateur.email}
                    onChange={changerValeur}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Rôle</label>
                  <select
                    name="roleId"
                    className="form-select"
                    value={nouvelUtilisateur.roleId}
                    onChange={changerValeur}
                    required
                  >
                    <option value="">Choisir un rôle</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="actif"
                      className="form-check-input"
                      checked={nouvelUtilisateur.actif}
                      onChange={changerValeur}
                      id="actifCheck"
                    />
                    <label className="form-check-label" htmlFor="actifCheck">
                      Compte actif
                    </label>
                  </div>
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
            <div className="col-md-6">
              <label className="form-label">Recherche</label>
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher par nom, login ou email"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Rôle</label>
              <select
                className="form-select"
                value={roleFiltre}
                onChange={(e) => setRoleFiltre(e.target.value)}
              >
                <option value="">Tous</option>
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

      <div className="card content-card">
        <div className="card-header bg-white">
          <h5 className="mb-0">Liste des utilisateurs</h5>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom complet</th>
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
                  <td colSpan="7" className="text-center text-muted">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                utilisateursFiltres.map((utilisateur) => (
                  <tr key={utilisateur.id}>
                    <td>{utilisateur.id}</td>
                    <td>{utilisateur.prenom} {utilisateur.nom}</td>
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
                      <button
                        className="btn btn-warning btn-sm me-1"
                        onClick={() => preparerModification(utilisateur)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => supprimerUtilisateur(utilisateur.id)}
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

export default Utilisateurs;
