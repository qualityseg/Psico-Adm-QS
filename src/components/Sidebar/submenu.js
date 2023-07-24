import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from 'react-bootstrap';
import "./style.modules.css";

function SubMenu({ icon, title, items, activeRoute, layout }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.indexOf(path) > -1 ? "active" : "";
  };

  return (
    <li className={open ? "active" : ""}>
      <a
        onClick={() => setOpen(!open)}
        data-toggle="collapse"
        aria-expanded={open}
        className="nav-link"
      >
        <i className={icon} />
        <p>{title}</p>
      </a>
      <Collapse in={open}>
        <div>
          <ul className="nav">
            {items.map((item, key) => (
              <li key={key} className={isActive(item.path)}>
                <NavLink
                  to={layout + item.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <span className="sidebar-mini-icon">{item.short}</span>
                  <span className="sidebar-normal">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </li>
  );
}

export default SubMenu;
