import Sidebar from './Sidebar';
import Topbar from './Topbar';

function Layout({ sousTitre, children }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-md-10 p-0">
          <Topbar sousTitre={sousTitre} />

          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
