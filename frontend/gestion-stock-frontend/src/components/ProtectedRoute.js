import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const utilisateurConnecte = localStorage.getItem("utilisateurConnecte");

  if (!utilisateurConnecte) {
    return <Navigate to="/connexion" />;
  }

  return children;
}

export default ProtectedRoute;
