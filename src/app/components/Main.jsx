import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { Redirect, Switch } from "react-router";

import { ConnectedMainHeader } from "./template/MainHeader/MainHeader";
import { ConnectedMainSidebar } from "./template/MainSidebar/MainSidebar";
import { ConnectedMainFooter } from "./template/MainFooter/MainFooter";

import { ConnectedLogin } from "./pages/Login/Login";
import { ConnectedDashboard } from "./pages/Dashboard/Dashboard";
import { ConnectedClientsList } from "./pages/Clients/ClientsList/ClientsList";
import { ConnectedClientsDetail } from "./pages/Clients/ClientsDetail/ClientsDetail";
import { ConnectedClientsNew } from "./pages/Clients/ClientsNew/ClientsNew";
import { ConnectedMyDetails } from "./pages/MyDetails/MyDetails";
import { ConnectedUsers } from "./pages/Users/Users/Users";
import { ConnectedUsersNew } from "./pages/Users/UsersNew/UsersNew";
import { ConnectedUserEdit } from "./pages/Users/UsersEdit/UsersEdit";
import { ConnectedMyFavorites } from "./pages/MyFavorites/MyFavorites";
import { ConnectedMyMeetings } from "./pages/MyMeeting/MyMeetings/MyMeetings";
import { ConnectedMeetingsNew } from "./pages/MyMeeting/MeetingsNew/MeetingsNew";
import { ConnectedMeetingsEdit } from "./pages/MyMeeting/MeetingsEdit/MeetingsEdit";

const RouteGuard = (Component) => ({ match }) =>
  !store.getState().session.authenticated ? (
    <Redirect to="/" />
  ) : (
    <div className="wrapper">
      <ConnectedMainHeader />
      <ConnectedMainSidebar />

      <div className="content-wrapper">
        {/* Content here */}
        <Component match={match} />
      </div>

      <ConnectedMainFooter />
    </div>
  );

//   <Component match={match} />

export const Main = () => (
  <Router history={history} forceRefresh={true}>
    <Provider store={store}>
      <div>
        <Switch>
          <PersistGate persistor={persistor}>
            <Route exact path="/" component={ConnectedLogin} />

            <Route
              exact
              path="/dashboard"
              render={RouteGuard(ConnectedDashboard)}
            />
            <Route
              exact
              path="/clients"
              render={RouteGuard(ConnectedClientsList)}
            />
            <Route exact path="/users" render={RouteGuard(ConnectedUsers)} />
            <Route
              exact
              path="/user-new"
              render={RouteGuard(ConnectedUsersNew)}
            />
            <Route
              exact
              path="/user/:id/:isEdit?"
              render={RouteGuard(ConnectedUserEdit)}
            />
            <Route
              exact
              path="/my-details"
              render={RouteGuard(ConnectedMyDetails)}
            />
            <Route
              exact
              path="/my-favorites"
              render={RouteGuard(ConnectedMyFavorites)}
            />
            <Route
              exact
              path="/my-meetings"
              render={RouteGuard(ConnectedMyMeetings)}
            />
            <Route
              exact
              path="/meetings-new/:id"
              render={RouteGuard(ConnectedMeetingsNew)}
            />
            <Route
              exact
              path="/meeting/:id/"
              render={RouteGuard(ConnectedMeetingsEdit)}
            />
            <Route
              exact
              path="/client/:id/:isEdit?"
              render={RouteGuard(ConnectedClientsDetail)}
            />

            <Route
              exact
              path="/client-new"
              render={RouteGuard(ConnectedClientsNew)}
            />

            {/* <Route
              exact
              path="/personal-notes/:id"
              render={RouteGuard(ConnectedClients)}
            /> */}
          </PersistGate>
        </Switch>
      </div>
    </Provider>
  </Router>
);
