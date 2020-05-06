import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedUnitDetail } from "./UnitsDetail";
import { Redirect } from "react-router";
import { ConnectedLogin } from "./Login";
import { ConnectedClients } from "./Clients";
import { ConnectedClientsDetail } from "./ClientsDetail";
import { ConnectedClientsNew } from "./ClientsNew";

const RouteGuard = (Component) => ({ match }) =>
  !store.getState().session.authenticated ? (
    <Redirect to="/" />
  ) : (
    <Component match={match} />
  );

//   <Component match={match} />

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <Route exact path="/" component={ConnectedLogin} />
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        />
        <Route exact path="/clients" render={RouteGuard(ConnectedClients)} />
        <Route
          exact
          path="/client/:id"
          render={RouteGuard(ConnectedClientsDetail)}
        />
        <Route
          exact
          path="/add-contact"
          render={RouteGuard(ConnectedClientsNew)}
        />
        {/* <Route
          exact
          path="/unit/:id"
          render={({ match }) => <ConnectedUnitDetail match={match} />}
        /> */}
      </div>
    </Provider>
  </Router>
);
