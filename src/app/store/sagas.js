import { take, put, select } from "redux-saga/effects";
import * as mutations from "./mutations";
import { history } from "./history";
import uuid from "uuid";
import axios from "axios";
import { Toast } from "./sweetalert";
import md5 from "md5";
import $ from "jquery";

const url = process.env.NODE_ENV == `production` ? `` : "http://localhost:7777";

export function* clientModificationSage() {
  while (true) {
    const { id, owner, client } = yield take(mutations.UPDATE_CLIENT);
    client.id = id;
    client.owner = owner;
    console.log("client: ", client);
    axios.post(url + `/client/update`, { client });
    Toast.fire({
      icon: "success",
      title: "Client updated.",
    });
    history.push("/clients");
  }
}

export function* clientCreationSage() {
  while (true) {
    const { client } = yield take(mutations.CREATE_NEW_CLIENT);
    console.log(client);
    axios.post(url + `/client/new`, { client });
    Toast.fire({
      icon: "success",
      title: "Client added.",
    });
    history.push("/clients");
    $("[data-widget='control-sidebar']").click();
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

export function* updateUserSage() {
  while (true) {
    const { id, username, password } = yield take(
      mutations.UPDATE_USER_DETAILS
    );
    const passwordHash = md5(password);
    const user = { id, username, passwordHash };
    console.log(user);
    try {
      axios.post(url + `/users/update`, { user });
      Toast.fire({
        icon: "success",
        title: "User details updated.",
      });
      history.push("/dashboard");
    } catch (e) {
      console.log("error:", e);
    }
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

      if (!data) {
        throw new Error();
      }
      console.log("Authenticated!", data);

      Toast.fire({
        icon: "success",
        title: "Logged in successfully.",
      });
      history.push("/dashboard");
    } catch (e) {
      /* catch block handles failed login */
      console.log("can't authenticate");
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
      Toast.fire({
        icon: "error",
        title: "Logged in failed.",
      });
    }
  }
}

export function* logoutUser() {
  while (true) {
    const { session, authenticated } = yield take(mutations.LOGOUT_USER);
    console.log("session:", session);
    console.log("authenticated:", authenticated);
    history.push("/");
    Toast.fire({
      icon: "success",
      title: "Logged out successfully.",
    });
  }
}
