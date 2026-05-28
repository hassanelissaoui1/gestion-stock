import Sidebar from './Sidebar';
import Topbar from './Topbar';

function Layout({ sousTitre, children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-area">
        <Topbar sousTitre={sousTitre} />

        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
