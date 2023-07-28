import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Login from "layouts/Login.js";
import Register from "layouts/Register.js"

const root = ReactDOM.createRoot(document.getElementById("root"));

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/register" render={(props) => <Register {...props} />} />
     
      <Route path="/admin" render={(props) => isAuthenticated() ? <AdminLayout {...props} /> : <Redirect to="/login" />} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>
);



<script async src="//static.zotabox.com/4/d/4da5e12916aa183ffd04f337867909d9/widgets.js"></script>
