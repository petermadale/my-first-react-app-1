import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import * as sagas from "./sagas";
import rootReducer from "./reducer";

// import * as sagas from "./sagas.mock";
// import { defaultState } from "../../server/defaultState";
// import { UnitType } from "../components/UnitType";
// import { select } from "redux-saga/effects";
// import * as mutations from "./mutations";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// export const store = createStore(
//   rootReducer,
//   applyMiddleware(createLogger(), sagaMiddleware)
// );

export const persistor = persistStore(store);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
