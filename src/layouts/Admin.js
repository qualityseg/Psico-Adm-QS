import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-4.jpg";


function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  const getRoutes = (routes) => {
    const role = localStorage.getItem('role');
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" || prop.layout === "/usuario") { // Verificar ambos os layouts
        if (prop.subMenu) {
          return prop.subMenu.map((subRoute, subIdx) => {
            if (subRoute.roles && !subRoute.roles.includes(role)) {
              return (
                <Route
                  path={prop.layout + subRoute.path}
                  render={(props) => <ErrorPage {...props} />}
                  key={`${key}_${subIdx}`}
                />
              );
            } else {
              return (
                <Route
                  path={prop.layout + subRoute.path}
                  render={(props) => <subRoute.component {...props} />}
                  key={`${key}_${subIdx}`}
                />
              );
            }
          });
        }
        if (prop.roles && !prop.roles.includes(role)) {
          return (
            <Route
              path={prop.layout + prop.path}
              render={(props) => <ErrorPage {...props} />}
              key={key}
            />
          );
        } else {
          return (
            <Route
              path={prop.layout + prop.path}
              render={(props) => <prop.component {...props} />}
              key={key}
            />
          );
        }
      } else {
        return null;
      }
    });
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} role={localStorage.getItem('role')} />

        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>
              {getRoutes(routes)}
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
