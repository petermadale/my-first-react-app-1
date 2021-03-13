import "./admin-lte/plugins/fontawesome-free/css/all.min.css";
import "./admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./admin-lte/dist/css/adminlte.min.css";
import "./styles/style.css";
import $ from "./admin-lte/plugins/jquery/jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;
import "./admin-lte/plugins/jquery-ui/jquery-ui";
import "./admin-lte/plugins/bootstrap/js/bootstrap.bundle";
const adminlte = require("./admin-lte/dist/js/adminlte");

import { store } from "./store";
import React from "react";
import ReactDOM from "react-dom";
import { Main } from "./components/Main";

//console.log(store.getState());
ReactDOM.render(<Main />, document.getElementById("app"));
