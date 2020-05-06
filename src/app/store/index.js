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
  comments: [],
  users: [],
  groups: [],
  tasks: [],
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
        case mutations.CREATE_NEW_CLIENT:
          return [...clients, action.client];
        case mutations.DELETE_CLIENT:
          return (clients = clients.filter((client) => {
            return client.id !== action.id;
          }));
      }
      return clients;
    },
    units(units = [], action) {
      switch (action.type) {
        case mutations.CREATE_UNIT:
          //   console.log(action);
          return [
            ...units,
            {
              id: action.unitID,
              area: "200",
              block: "20",
              description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
              lot: "12",
              home_owner: "H3", //action.homeownerID,
              unit_type: "UT2", //action.unittypeID,
            },
          ];
      }
      return units;
    },
    home_owners(home_owners = []) {
      return home_owners;
    },
    unit_types(unit_types = [], action) {
      switch (action.type) {
        case mutations.SET_UNIT_TYPE_NAME:
          return unit_types.map((unit) => {
            return unit.id === action.unitID
              ? { ...unit, name: action.name }
              : unit;
          });
      }
      return unit_types;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
