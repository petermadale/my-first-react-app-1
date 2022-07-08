import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import * as sagas from "./sagas";
import rootReducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export const persistor = persistStore(store);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
