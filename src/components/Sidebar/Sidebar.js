import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import SubMenu from './submenu';

function Sidebar({ color, routes }) {
  const location = useLocation();
  const role = localStorage.getItem('role');

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  return (
    <div className="sidebar" data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundColor: `white` // Aqui definimos a cor do background como branco
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.qualitysegconsultoria.com.br"
            className="simple-text logo-mini mx-1"
          >
            <div>
              <img src={logo} alt="..." width="100%" />
            </div>
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (prop.roles && !prop.roles.includes(role)) {
              return null;
            }

            if (prop.subMenu) {
              return (
                <SubMenu
                  key={key}
                  icon={prop.icon}
                  title={prop.name}
                  items={prop.subMenu}
                  activeRoute={activeRoute}
                  layout={prop.layout}
                />
              );
            } else if (!prop.redirect) {
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
