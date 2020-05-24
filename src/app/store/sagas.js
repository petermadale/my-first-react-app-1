import { take, put, select, call } from "redux-saga/effects";
import * as mutations from "./mutations";
import { history } from "./history";
import uuid from "uuid";
import axios from "axios";
import { Toast } from "./sweetalert";
import md5 from "md5";
import $ from "jquery";

const url = process.env.NODE_ENV == `production` ? `` : "http://localhost:7777";

export function* clientModificationSaga() {
  while (true) {
    const { client } = yield take(mutations.UPDATE_CLIENT);

    console.log("client data: ", client);
    axios.post(url + `/client/update`, { client });
    // axios.post(url + `/client/update`, {
    //   client: {
    //     id: data.client.id,
    //     // owner: client.owner,
    //     name: data.client.name,
    //     email: data.client.email,
    //     address: data.client.address,
    //     phone: data.client.phone,
    //     ext: data.client.ext,
    //     cell: data.client.cell,
    //     fax: data.client.fax,
    //     isFavorite: data.client.isFavorite,
    //   },
    // });
    // const fav_toast_title = data.client.isFavorite
    //   ? "Client added to your favorites."
    //   : "Client removed from your favorites.";
    // const toast_title =
    //   data.type === "ADD_TO_FAVORITES" ? fav_toast_title : "Client updated.";
    Toast.fire({
      icon: "success",
      title: "Client updated.",
    });
    history.push("/clients");
  }
}

export function* clientCreationSaga() {
  while (true) {
    const { client } = yield take(mutations.CREATE_NEW_CLIENT);

    axios.post(url + `/client/new`, {
      client: {
        address: client.address,
        cell: client.cell,
        email: client.email,
        ext: client.ext,
        fax: client.fax,
        id: client.id,
        name: client.name,
        owner: client.owner,
        phone: client.phone,
      },
    });
    Toast.fire({
      icon: "success",
      title: "Client added.",
    });
    history.push("/clients");
    $("[data-widget='control-sidebar']").click(); //find another solution
  }
}

export function* clientDeletionSaga() {
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

export function* addToMyFavoritesSaga() {
  while (true) {
    const { id, clientID, owner } = yield take(mutations.ADD_TO_MY_FAVORITES);
    axios.post(url + `/myfavorites/new`, {
      myfavorite: {
        id: id,
        client: clientID,
        owner: owner,
      },
    });
    Toast.fire({
      icon: "success",
      title: "Client added to your favorites.",
    });
    history.push("/my-favorites");
  }
}

export function* removeFromMyFavoritesSaga() {
  while (true) {
    const { id } = yield take(mutations.REMOVE_FROM_MY_FAVORITES);
    try {
      axios.delete(url + `/myfavorites/${id}`);
      Toast.fire({
        icon: "success",
        title: "Client removed from your favorites.",
      });
      history.push("/my-favorites");
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

export function* personalNoteCreationSaga() {
  while (true) {
    const { personalnote } = yield take(mutations.SAVE_PERSONAL_NOTE);

    axios.post(url + `/personalnotes/new`, { personalnote });
    Toast.fire({
      icon: "success",
      title: "Personal note added.",
    });
    history.push("/clients");
  }
}

export function* personalNoteUpdateSaga() {
  while (true) {
    const { personalnote } = yield take(mutations.EDIT_PERSONAL_NOTE);
    console.log(personalnote);
    axios.post(url + `/personalnotes/update`, { personalnote });
    Toast.fire({
      icon: "success",
      title: "Personal note updated.",
    });
    history.push("/clients");
  }
}

export function* personalNoteDeletionSaga() {
  while (true) {
    const { id } = yield take(mutations.DELETE_PERSONAL_NOTE);
    try {
      console.log(id);
      axios.delete(url + `/personalnotes/${id}`);
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

export function* updateUserSage() {
  while (true) {
    const { id, name, username, password } = yield take(
      mutations.UPDATE_USER_DETAILS
    );
    const passwordHash = md5(password);
    const user = { id, name, username, passwordHash };
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

function authenticateUser(username, password) {
  return axios
    .post(url + `/authenticate`, {
      username,
      password,
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { response, error } = yield call(
        authenticateUser,
        username,
        password
      );
      if (response) {
        var data = response.data;
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
      } else {
        var err_res = error.response.data;
        if (!err_res.isApproved)
          yield put(
            mutations.processAuthenticateUser(mutations.ACCOUNT_NOT_APPROVED)
          );
        if (err_res.passwordCorrect && !err_res.passwordCorrect)
          yield put(
            mutations.processAuthenticateUser(mutations.PASSWORD_INCORRECT)
          );
        Toast.fire({
          icon: "error",
          title: err_res.message,
        });
      }
    } catch (err) {
      /* catch block handles failed login */
      console.log(err);
    }
  }
}
function createUser(name, username, password) {
  return axios
    .post(url + `/user/create`, {
      name,
      username,
      password,
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
export function* userAccountCreationSaga() {
  while (true) {
    const { name, username, password, confirmPassword } = yield take(
      mutations.REQUEST_USER_ACCOUNT_CREATION
    );
    const { authenticated } =
      password === confirmPassword
        ? yield put(mutations.processAuthenticateUser(mutations.PASSWORD_MATCH))
        : yield put(
            mutations.processAuthenticateUser(mutations.PASSWORD_MISMATCH)
          );
    if (authenticated === mutations.PASSWORD_MATCH) {
      try {
        const { response, error } = yield call(
          createUser,
          name,
          username,
          password
        );
        if (response) {
          yield put(
            mutations.processAuthenticateUser(mutations.USER_ACCOUNT_CREATED)
          );
          Toast.fire({
            icon: "success",
            title:
              "Account created successfully.  Admin will review and approve your account before you can login.",
          });
          history.push("/");
        } else {
          var err_message = error.response.data.message;
          if (err_message === "A user with that account name already exists.")
            yield put(
              mutations.processAuthenticateUser(mutations.NAME_RESERVED)
            );
          else
            yield put(
              mutations.processAuthenticateUser(mutations.USERNAME_RESERVED)
            );
          Toast.fire({
            icon: "error",
            title: error.response.data.message,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        // yield put(mutations.processAuthenticateUser(null));
      }
      //   try {
      //     const { data } = yield axios.post(url + `/user/create`, {
      //       name,
      //       username,
      //       password,
      //     });
      //     console.log(data);
      //   .then(function (response) {
      // mutations.processAuthenticateUser(mutations.USER_ACCOUNT_CREATED);
      // Toast.fire({
      //   icon: "success",
      //   title:
      //     "Account created successfully.  Admin will review and approve your account before you can login.",
      // });
      // history.push("/");
      //   })
      //   .catch(function (error) {
      //     if (error.response) {
      //       console.log(error.response);
      //       Toast.fire({
      //         icon: "error",
      //         title: error.response.data.message,
      //       });
      //     }
      //   });
      //   } catch (err) {
      //     /* catch block handles failed login */
      //     console.log("can't authenticate", err);
      //     yield put(
      //       mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED)
      //     );
      // Toast.fire({
      //   icon: "error",
      //   title: "Account creation in failed.",
      // });
      //   }
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
