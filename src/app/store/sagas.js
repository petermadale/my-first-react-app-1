import { take, put, select, call, all } from "redux-saga/effects";
import * as mutations from "./mutations";
import { history } from "./history";
import uuid from "uuid";
import axios from "axios";
import { Toast, alert_msg } from "../scripts/sweetalert";
import $ from "jquery";
import { url } from "./site-url";
import {
  authenticateUser,
  createUser,
  updateUser,
  deleteUser,
} from "./sagasusers";
import {
  createNewClient,
  updateClient,
  deleteClient,
  createNewClientContactDetails,
  updateClientContactDetails,
  deleteClientContactDetails,
  suggestEditsToClientContactDetails,
  approveClientContactDetailsSuggestions,
  rejectClientContactDetailsSuggestions,
} from "./sagasclients";

import { sendFeedback } from "../scripts/emailJS";

export function* clientCreationSaga() {
  while (true) {
    const { client, clientContact } = yield take(mutations.CREATE_NEW_CLIENT);

    const [newClient, newClientContactDetails] = yield all([
      call(createNewClient, client),
      call(createNewClientContactDetails, clientContact),
    ]);
    console.log(newClient);
    console.log(newClientContactDetails);
    if (
      newClient.response.status === 200 &&
      newClientContactDetails.response.status === 200
    ) {
      Toast.fire({
        icon: "success",
        title: alert_msg.client_and_address_create_success,
      });
      history.push("/client/" + newClient.response.data.id + "/true");
      $("[data-widget='control-sidebar']").click(); //find another solution
    } else {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
    // axios.post(url + `/client/new`, {
    //   client: {
    //     address: client.address,
    //     cell: client.cell,
    //     email: client.email,
    //     ext: client.ext,
    //     fax: client.fax,
    //     id: client.id,
    //     name: client.name,
    //     owner: client.owner,
    //     phone: client.phone,
    //   },
    // });
  }
}

export function* clientModificationSaga() {
  while (true) {
    const { client } = yield take(mutations.UPDATE_CLIENT);

    const { response, error } = yield call(updateClient, client);
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.client_update_success,
          });
          history.push("/clients");
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
    // const fav_toast_title = data.client.isFavorite
    //   ? "Client added to your favorites."
    //   : "Client removed from your favorites.";
    // const toast_title =
    //   data.type === "ADD_TO_FAVORITES" ? fav_toast_title : "Client updated.";
  }
}

export function* clientDeletionSaga() {
  while (true) {
    const { id } = yield take(mutations.DELETE_CLIENT);

    const { response, error } = yield call(deleteClient, id);
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.client_delete_success,
          });
          history.push("/clients");
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
      //   axios.delete(url + `/clients/${id}`);
      //   history.push("/clients");
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
  }
}

export function* clientContactDetailCreationSaga() {
  while (true) {
    const { clientContact } = yield take(
      mutations.CREATE_CLIENT_CONTACT_DETAILS
    );
    const { response, error } = yield call(
      createNewClientContactDetails,
      clientContact
    );
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.client_create_success,
          });
          history.push("/client/" + response.data.clientID + "/true");
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
    console.log(clientContact);
  }
}

export function* clientContactDetailModificationSaga() {
  while (true) {
    const { clientContact } = yield take(
      mutations.UPDATE_CLIENT_CONTACT_DETAILS
    );
    //axios.post(url + `/clientcontactdetails/update`, { clientContact });
    const { response, error } = yield call(
      updateClientContactDetails,
      clientContact
    );
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.client_address_update_success,
          });
          history.push("/client/" + response.data.clientID + "/true");
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
  }
}

export function* clientContactDetailDeletionSaga() {
  while (true) {
    const { id, client } = yield take(mutations.DELETE_CLIENT_CONTACT_DETAILS);
    const { response, error } = yield call(deleteClientContactDetails, id);

    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.client_address_delete_success,
          });
          history.push("/client/" + client + "/true");
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
  }
}

export function* clientContactDetailsSuggestionsSaga() {
  while (true) {
    const { clientContactDetailsSuggestions } = yield take(
      mutations.SUGGEST_EDITS_TO_CLIENT_CONTACT_DETAILS
    );

    const { response, error } = yield call(
      suggestEditsToClientContactDetails,
      clientContactDetailsSuggestions
    );
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.client_suggest_edits_success,
          });
          history.push(
            "/client/" + clientContactDetailsSuggestions.client + "/true"
          );
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
    // const fav_toast_title = data.client.isFavorite
    //   ? "Client added to your favorites."
    //   : "Client removed from your favorites.";
    // const toast_title =
    //   data.type === "ADD_TO_FAVORITES" ? fav_toast_title : "Client updated.";
  }
}

export function* approveClientContactDetailsSuggestionsSaga() {
  while (true) {
    const { clientContactDetailsSuggestions } = yield take(
      mutations.APPROVE_ADDRESS_SUGGESTION
    );

    const { response, error } = yield call(
      approveClientContactDetailsSuggestions,
      clientContactDetailsSuggestions
    );

    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Client Suggestion Approved",
          });
          //redirect to the same client

          history.push("/client/" + response.data.clientID + "/true");

          //   yield put(
          //     mutations.ADDRESS_SUGGESTION_SUCCESS({
          //       clientContactDetailsSuggestions:
          //         response.data.new_clientContactDetailsSuggestions,
          //     })
          //   );
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
  }
}

export function* rejectClientContactDetailSuggestionsSaga() {
  while (true) {
    const { id } = yield take(mutations.REJECT_ADDRESS_SUGGESTION);

    const { response, error } = yield call(
      rejectClientContactDetailsSuggestions,
      id
    );
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Address Suggestion Rejected.",
          });
          history.push("/clients");
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
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

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    const { response, error } = yield call(
      authenticateUser,
      username,
      password
    );
    try {
      if (response) {
        var data = response.data;
        if (data) {
          yield put(mutations.setState(data.state));
          yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

          Toast.fire({
            icon: "success",
            title: alert_msg.user_authenticated,
          });
          const search = window.location.search;
          const params = new URLSearchParams(search);
          const returnurl = params.get("returnurl");
          console.log(returnurl);
          returnurl ? history.push(returnurl) : history.push("/dashboard");
        }

        if (!data) {
          throw new Error();
        }
      } else {
        if (error.response) {
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
        } else {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
        }
      }
    } catch (err) {
      /* catch block handles failed login */
      console.log(err);
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
  }
}

export function* userAccountCreationSaga() {
  while (true) {
    const { userdata } = yield take(mutations.PROCESSING_CREATE_USER);

    // const { authenticated } =
    //   password === confirmPassword
    //     ? yield put(mutations.processAuthenticateUser(mutations.PASSWORD_MATCH))
    //     : yield put(
    //         mutations.processAuthenticateUser(mutations.PASSWORD_MISMATCH)
    //       );
    //if (authenticated === mutations.PASSWORD_MATCH) {
    const { response, error } = yield call(createUser, userdata);
    try {
      if (response) {
        var data = response.data;
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.user_create_success,
          });
          history.push("/users");
          yield put(mutations.createUserAccount(data.user));
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
          //yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
          yield put(mutations.createUserAccount(null));
        }
      } else {
        var data = error.response.data;
        var err_msg = data.message ? data.message : error.message;
        // if (data.nameReserved)
        //   err_msg = alert_msg.name_reserved
        //   if (data.usernameReserved)
        Toast.fire({
          icon: "error",
          title: err_msg,
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
    //}
  }
}

export function* userAccountDeletionSaga() {
  while (true) {
    const { id } = yield take(mutations.DELETE_USER_ACCOUNT);

    const { response, error } = yield call(deleteUser, id);
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.user_delete_success,
          });
          history.push("/users");
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      }
      //   axios.delete(url + `/clients/${id}`);
      //   history.push("/clients");
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
  }
}

export function* userAccountModificationSaga() {
  while (true) {
    const { userdata } = yield take(mutations.PROCESSING_UPDATE_USER);

    const user = {
      id: userdata.id,
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      location: userdata.location,
      officePhoneNumber: userdata.officePhoneNumber,
      cellPhoneNumber: userdata.cellPhoneNumber,
      email: userdata.email,
      username: userdata.username,
      //   password: userdata.password,
    };
    const { response, error } = yield call(updateUser, user);
    try {
      if (response) {
        var data = response.data;
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.user_update_success,
          });
          //sendFeedback(name, user.id);
          history.push(history.location.pathname);
          yield put(mutations.updateUserAccount(user));
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
          yield put(mutations.updateUserAccount(null));
        }
      } else {
        var data = error.response.data;
        var err_msg = data.message ? data.message : error.message;
        // if (data.nameReserved)
        //   err_msg = alert_msg.name_reserved
        //   if (data.usernameReserved)
        Toast.fire({
          icon: "error",
          title: err_msg,
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
      });
    }
  }
}

export function* myDetailsModificationSaga() {
  while (true) {
    const { userdata } = yield take(mutations.PROCESSING_UPDATE_MY_DETAILS);

    const user = {
      id: userdata.id,
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      location: userdata.location,
      officePhoneNumber: userdata.officePhoneNumber,
      cellPhoneNumber: userdata.cellPhoneNumber,
      email: userdata.email,
      username: userdata.username,
      //   password: userdata.password,
    };
    const { response, error } = yield call(updateUser, user);
    try {
      if (response) {
        var data = response.data;
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.user_update_success,
          });
          console.log(history);
          const name = user.firstName + " " + user.lastName;
          //sendFeedback(name, user.id);
          history.push(history.location.pathname);
          yield put(mutations.updateUserAccount(user));
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
          yield put(mutations.updateUserAccount(null));
        }
      } else {
        var data = error.response.data;
        var err_msg = data.message ? data.message : error.message;
        // if (data.nameReserved)
        //   err_msg = alert_msg.name_reserved
        //   if (data.usernameReserved)
        Toast.fire({
          icon: "error",
          title: err_msg,
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: alert_msg.server_error,
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
      title: alert_msg.user_logout,
    });
  }
}
