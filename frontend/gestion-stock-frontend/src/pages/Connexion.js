import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../services/api';

function Connexion() {
  const [login, setLogin] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const navigate = useNavigate();

  function connecterUtilisateur(e) {
    e.preventDefault();

    setErreur("");
    setChargement(true);

    fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: login,
        motDePasse: motDePasse
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login ou mot de passe incorrect");
        }

        return response.json();
      })
      .then((utilisateur) => {
        localStorage.setItem("utilisateurConnecte", JSON.stringify(utilisateur));
        navigate("/dashboard");
        setChargement(false);
      })
      .catch((error) => {
        setErreur(error.message);
        setChargement(false);
      });
  }

  return (
    <div className="container-fluid login-page">
      <div className="row">
        <div className="col-md-6 login-left">
          <div className="login-left-content">
            <div className="login-icon">
              <i className="bi bi-box-seam"></i>
            </div>

            <h1>StockApp</h1>

            <p>
              Application web de gestion de stock permettant de gérer les produits,
              les fournisseurs, les mouvements de stock et les alertes de stock faible.
            </p>

            <p>
              Connectez-vous pour accéder à votre espace selon votre rôle.
            </p>
          </div>
        </div>

        <div className="col-md-6 login-right">
          <div className="login-card">
            <div className="text-center mb-4">
              <h3>Connexion</h3>
              <p className="small-text mb-0">
                Veuillez saisir vos informations d’accès
              </p>
            </div>

            {erreur && (
              <div className="alert alert-danger">
                {erreur}
              </div>
            )}

            <form onSubmit={connecterUtilisateur}>
              <div className="mb-3">
                <label className="form-label">Login</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Entrer votre login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Entrer votre mot de passe"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 btn-login" disabled={chargement}>
                <i className="bi bi-box-arrow-in-right me-1"></i>
                {chargement ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <div className="text-center small-text mt-4">
              Système de gestion de stock
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
