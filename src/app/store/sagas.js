import { take, put, select } from "redux-saga/effects";
import * as mutations from "./mutations";
import { history } from "./history";
import uuid from "uuid";
import axios from "axios";

const url = process.env.NODE_ENV == `production` ? `` : "http://localhost:7777";

export function* taskCreationSaga() {
  while (true) {
    const { homeownerID, unittypeID } = yield take(
      mutations.REQUEST_CREATE_UNIT
    );
    const unitID = uuid();
    yield put(mutations.createUnit(unitID, homeownerID, unittypeID));
    // console.log("Got unit ID", unitID);
    const { res } = yield axios.post(url + `/unit_types/new`, {
      unit_types: {
        id: unitID,
        name: "New Unit",
        name: "Magnolia",
        features:
          "2 Storey 3 Bedrooms 2 Toilets & Bath Carport Lot Area: 64 sq. m (689 sq. ft.)",
        lot_area: "64 sq. m(689 sq. ft.)",
        floor_area: "84.56 sq. m(910 sq. ft.)",
      },
    });
  }
}

export function* clientModificationSage() {
  while (true) {
    const client = yield take(mutations.SET_CLIENT_NAME);
    console.log("client: ", client);
    axios.post(url + `/client/update`, {
      client: {
        id: client.id,
        name: client.name,
      },
    });
  }
}

export function* clientCreationSage() {
  while (true) {
    const { client } = yield take(mutations.CREATE_NEW_CLIENT);
    console.log(client);
    axios.post(url + `/client/new`, { client });
    history.push("/clients");
  }
}

export function* clientDeletionSage() {
  while (true) {
    const { id } = yield take(mutations.DELETE_CLIENT);
    try {
      console.log(id);
      axios.delete(url + `/clients/${id}`);
      history.push("/clients");
      if (!data) {
        throw new Error();
      }
      console.log("Delete data: ", data);
    } catch (e) {
      console.log("error:", e);
    }
  }
}

export function* getDataSaga() {
  while (true) {
    const clients = yield take(mutations.GET_CLIENTS);
    // const data = axios.get(url + `/clients`);
    const user_status = yield take(mutations.AUTHENTICATED);
    console.log("user_status", user_status);
  }
}

export function* taskModificationSaga() {
  while (true) {
    const unit_type = yield take(mutations.SET_UNIT_TYPE_NAME);
    console.log("unit_type: ", unit_type);
    axios.post(url + `/unit_types/update`, {
      unit_type: {
        id: unit_type.id,
        name: unit_type.name,
      },
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + `/authenticate`, {
        username,
        password,
      });
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
      history.push("/dashboard");
      if (!data) {
        throw new Error();
      }
      console.log("Authenticated!", data);
    } catch (e) {
      /* catch block handles failed login */
      console.log("can't authenticate");
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}
