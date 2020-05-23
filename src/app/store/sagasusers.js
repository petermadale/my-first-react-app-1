import { take, put, call } from "redux-saga/effects";
import * as mutations from "./mutations";
import { history } from "./history";
import axios from "axios";
import { Toast } from "./sweetalert";
import md5 from "md5";

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
    } catch (err) {
      /* catch block handles failed login */
      console.log("can't authenticate", err);
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
      Toast.fire({
        icon: "error",
        title: "Logged in failed.",
      });
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
    const passwordIsMatch =
      password === confirmPassword
        ? yield put(mutations.processAuthenticateUser(mutations.PASSWORD_MATCH))
        : yield put(
            mutations.processAuthenticateUser(mutations.PASSWORD_MISMATCH)
          );
    if (passwordIsMatch) {
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
          yield put(
            mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED)
          );
          Toast.fire({
            icon: "error",
            title: error.response.data.message,
          });
        }
      } catch (err) {
        console.log(err);
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
