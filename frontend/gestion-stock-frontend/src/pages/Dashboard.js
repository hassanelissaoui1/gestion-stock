import Layout from '../components/Layout';

function Dashboard() {
  return (
    <Layout sousTitre="Bienvenue dans votre espace de gestion">
      <h3 className="page-title mb-4">Tableau de bord</h3>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card card-stat p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Produits</p>
                <h3 className="mb-0">1</h3>
              </div>
              <div className="card-icon bg-products">
                <i className="bi bi-box-seam"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card card-stat p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Fournisseurs</p>
                <h3 className="mb-0">1</h3>
              </div>
              <div className="card-icon bg-suppliers">
                <i className="bi bi-truck"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card card-stat p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Mouvements</p>
                <h3 className="mb-0">6</h3>
              </div>
              <div className="card-icon bg-movements">
                <i className="bi bi-arrow-left-right"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card card-stat p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="small-text mb-1">Alertes</p>
                <h3 className="mb-0">2</h3>
              </div>
              <div className="card-icon bg-alerts">
                <i className="bi bi-exclamation-triangle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <div className="card table-card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Produits récents</h5>
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Désignation</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Seuil</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Clavier</td>
                    <td>120 DH</td>
                    <td><span className="badge bg-success">32</span></td>
                    <td>5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card table-card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Alertes récentes</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-warning">
                <strong>Stock faible</strong><br />
                Stock faible pour le produit Clavier
              </div>
              <div className="alert alert-success">
                <strong>Alerte traitée</strong><br />
                L’alerte du produit Clavier est traitée.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
