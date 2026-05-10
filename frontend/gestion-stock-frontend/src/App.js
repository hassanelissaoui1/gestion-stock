import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import Connexion from './pages/Connexion';
import Dashboard from './pages/Dashboard';
import Produits from './pages/Produits';
import Fournisseurs from './pages/Fournisseurs';
import Utilisateurs from './pages/Utilisateurs';
import Mouvements from './pages/Mouvements';
import Alertes from './pages/Alertes';
import Statistiques from './pages/Statistiques';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/connexion" />} />

        <Route path="/connexion" element={<Connexion />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/produits"
          element={
            <ProtectedRoute>
              <Produits />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fournisseurs"
          element={
            <ProtectedRoute>
              <Fournisseurs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/utilisateurs"
          element={
            <ProtectedRoute>
              <Utilisateurs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mouvements"
          element={
            <ProtectedRoute>
              <Mouvements />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alertes"
          element={
            <ProtectedRoute>
              <Alertes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/statistiques"
          element={
            <ProtectedRoute>
              <Statistiques />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
