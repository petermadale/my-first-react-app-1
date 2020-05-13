import { createStore, applyMiddleware, combineReducers } from "redux";
// import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
// import * as sagas from "./sagas.mock";
import * as sagas from "./sagas";
import * as mutations from "./mutations";
// import { UnitType } from "../components/UnitType";
// import { select } from "redux-saga/effects";

let defaultState = {
  session: {},
  clients: [],
  users: [],
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    session(userSession = defaultState.session, action) {
      let { type, authenticated, session } = action;

      switch (type) {
        case mutations.SET_STATE:
          let id = action.state.session.id;
          let isAdmin = id === "User1" ? true : false;
          return {
            ...userSession,
            id: id,
            name: action.state.session.name,
            isAdmin: isAdmin,
          };
        case mutations.REQUEST_AUTHENTICATE_USER:
          return { ...userSession, authenticated: mutations.AUTHENTICATING };
        case mutations.PROCESSING_AUTHENTICATE_USER:
          return { ...userSession, authenticated };
        case mutations.UPDATE_USER_DETAILS:
          return userSession;
        case mutations.LOGOUT_USER:
          return {
            authenticated: action.authenticated,
            id: null,
            name: null,
            isAdmin: false,
          };
        default:
          return userSession;
      }
    },

    clients(clients = defaultState.clients, action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.clients;
        case mutations.SET_CLIENT_NAME:
          return clients.map((client) => {
            return client.id === action.id
              ? { ...client, name: action.name }
              : client;
          });
        case mutations.UPDATE_CLIENT:
          return clients.map((client) => {
            return client.id === action.id
              ? {
                  ...client,
                  name: action.client.name,
                  email: action.client.email,
                  address: action.client.address,
                  phone: action.client.phone,
                  ext: action.client.ext,
                  cell: action.client.cell,
                  fax: action.client.fax,
                }
              : client;
          });
        case mutations.CREATE_NEW_CLIENT:
          return [...clients, action.client];
        case mutations.DELETE_CLIENT:
          return (clients = clients.filter((client) => {
            return client.id !== action.id;
          }));
        case mutations.LOGOUT_USER:
          return [];
        // case mutations.DUPLICATE_CLIENT_NAME:
        //   let isDuplicate = clients.some((client) => {
        //     return client.name.toLowerCase() === action.name.toLowerCase()
        //       ? true
        //       : false;
        //   });
        //   return isDuplicate;
        // //   return clients;
      }
      return clients;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
