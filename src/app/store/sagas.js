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
  verifyClient,
  deleteClient,
  deleteClientRequest,
  createNewClientContactDetails,
  updateClientContactDetails,
  deleteClientContactDetails,
  suggestEditsToClientContactDetails,
  approveClientContactDetailsSuggestions,
  rejectClientContactDetailsSuggestions,
  requestRejectDeleteClientRequest,
  requestCancelDeleteClientRequest,
  deleteAllClientContactDetails,
  uploadClients,
} from "./sagasclients";

import {
  getPersonalNote,
  deletePersonalNote,
  verifyPersonalNote,
} from "./sagaspersonalnotes";

import {
  saveMeeting,
  editMeeting,
  deleteMeeting,
  verifyMeeting,
} from "./sagasmymeetings";

import { sendFeedback } from "../scripts/emailJS";

export function* clientCreationSaga() {
  while (true) {
    const { client, clientContact } = yield take(mutations.CREATE_NEW_CLIENT);

    if (clientContact) {
      const [newClient, newClientContactDetails] = yield all([
        call(createNewClient, client),
        call(createNewClientContactDetails, clientContact),
      ]);
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
    } else {
      const { response, error } = yield call(createNewClient, client);
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: alert_msg.client_create_success,
        });
        history.push("/client/" + response.data.id + "/true");
        $("[data-widget='control-sidebar']").click(); //find another solution
      } else {
        Toast.fire({
          icon: "error",
          title: alert_msg.server_error,
        });
      }
    }
  }
}

export function* clientUploadSaga() {
  while (true) {
    const { clientData, clientContactData } = yield take(
      mutations.PROCESSING_UPLOAD_CLIENTS
    );

    Toast.fire({
      icon: "warning",
      title: alert_msg.client_upload_processing,
    });
    const { response, error } = yield call(
      uploadClients,
      clientData,
      clientContactData
    );
    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: alert_msg.client_upload_success,
      });

      yield put(mutations.uploadClients(clientData, clientContactData));
      location.reload();
    } else {
      Toast.fire({
        icon: "error",
        title: alert_msg.client_upload_success,
      });
    }
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

export function* clientVerificationSaga() {
  while (true) {
    const { id, userid, approvedDate, lastContactMethod } = yield take(
      mutations.VERIFY_CLIENT
    );

    const { response, error } = yield call(
      verifyClient,
      id,
      userid,
      approvedDate,
      lastContactMethod
    );
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.client_verify_success,
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
    const { client, isAdmin, owner } = yield take(
      mutations.REQUEST_DELETE_CLIENT
    );
    if (isAdmin) {
      const { response, error } = yield call(deleteClient, client.id);
      try {
        if (response) {
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: alert_msg.client_delete_success,
            });
            yield put(mutations.deleteClient(client, isAdmin, owner));
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
          yield put(mutations.deleteClient(null));
        }
        //   axios.delete(url + `/clients/${id}`);
        //   history.push("/clients");
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: alert_msg.server_error,
        });
      }
    } else {
      let newID = uuid();
      const { response, error } = yield call(
        deleteClientRequest,
        newID,
        client.id,
        owner
      );
      try {
        if (response) {
          if (response.status === 200) {
            const clientDeleteRequestID = newID;
            Toast.fire({
              icon: "success",
              title: alert_msg.client_delete_request_success,
            });
            yield put(
              mutations.deleteClient(
                client,
                isAdmin,
                owner,
                clientDeleteRequestID
              )
            );
            history.push("/clients");
          } else {
            Toast.fire({
              icon: "error",
              title: alert_msg.server_error,
            });
            yield put(mutations.deleteClient(null));
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
    //console.log(clientContact);
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

export function* clientContactDetailDeletionAllSaga() {
  while (true) {
    const { clientData } = yield take(
      mutations.DELETE_ALL_CLIENT_CONTACT_DETAILS
    );
    const { response, error } = yield call(
      deleteAllClientContactDetails,
      clientData
    );

    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.client_address_delete_success,
          });
          Toast.fire({
            icon: "success",
            title: alert_msg.client_update_success,
          });
          history.push("/client/" + clientData.id + "/true");
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

export function* rejectDeleteClientRequestSaga() {
  while (true) {
    const { clientsDeleteRequest } = yield take(
      mutations.REQUEST_REJECT_DELETE_CLIENT_REQUEST
    );

    const { response, error } = yield call(
      requestRejectDeleteClientRequest,
      clientsDeleteRequest.id
    );
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Delete client request rejected.",
          });

          yield put(mutations.rejectDeleteClientRequest(clientsDeleteRequest));
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
          title: error.response.data.message,
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

export function* cancelDeleteClientRequestSaga() {
  while (true) {
    const { clientsDeleteRequest } = yield take(
      mutations.REQUEST_CANCEL_DELETE_CLIENT_REQUEST
    );

    const { response, error } = yield call(
      requestCancelDeleteClientRequest,
      clientsDeleteRequest.id
    );
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Delete client request cancelled.",
          });

          yield put(mutations.cancelDeleteClientRequest(clientsDeleteRequest));
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
          title: error.response.data.message,
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
    const { id, clientID, owner, clientContactDetailsID } = yield take(
      mutations.ADD_TO_MY_FAVORITES
    );
    axios.post(url + `/myfavorites/new`, {
      myfavorite: {
        id: id,
        client: clientID,
        owner: owner,
        clientContactDetailsID,
        clientContactDetailsID,
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
      //   if (!data) {
      //     throw new Error();
      //   }
      //console.log("Delete data: ", data);
    } catch (e) {
      console.log("error:", e);
    }
  }
}

export function* getClientsSaga() {
  while (true) {
    const { isAdmin } = yield take(mutations.GET_CLIENTS);
    const { response, error } = axios
      .get(url + `/clients`)
      .then((response) => ({ response }))
      .catch((error) => ({ error }));

    try {
      if (response) {
        //const user_status = yield take(mutations.AUTHENTICATED);
        console.log(response);
      }
    } catch (e) {
      console.log("error:", e);
    }
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

// export function* personalNoteDeletionSaga() {
//   while (true) {
//     const { id } = yield take(mutations.DELETE_PERSONAL_NOTE);
//     try {
//       console.log(id);
//       axios.delete(url + `/personalnotes/${id}`);
//       history.push("/clients");
//       if (!data) {
//         throw new Error();
//       }
//       console.log("Delete data: ", data);
//     } catch (e) {
//       console.log("error:", e);
//     }
//   }
// }

export function* personalNoteDeletionSaga() {
  while (true) {
    const { id } = yield take(mutations.CHECK_NOTE_ID);
    const { noteresponse, noteerror } = yield call(getPersonalNote, id);
    try {
      if (noteresponse) {
        if (noteresponse.status === 200) {
          const { response, error } = yield call(deletePersonalNote, id);

          if (response) {
            if (response.status === 200) {
              yield put(
                mutations.deletePersonalNote(id, noteresponse.data.note.client)
              );
              //   if (deleteRes) {
              Toast.fire({
                icon: "success",
                title: "Personal note deleted.",
              });
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
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        var data = noteerror.response.data;
        if (data) {
          var err_msg = data.message ? data.message : noteerror.message;
          Toast.fire({
            icon: "error",
            title: err_msg,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export function* personalNoteVerificationSaga() {
  while (true) {
    const { notedata } = yield take(mutations.VERIFY_PERSONAL_NOTE);
    const { noteresponse, noteerror } = yield call(
      getPersonalNote,
      notedata.id
    );
    try {
      if (noteresponse) {
        if (noteresponse.status === 200) {
          console.log(noteresponse);
          const { response, error } = yield call(verifyPersonalNote, notedata);

          if (response) {
            if (response.status === 200) {
              yield put(mutations.verifyPersonalNote(notedata));
              const title = isVerified
                ? "Personal note verified."
                : "Personal note unverified.";
              Toast.fire({
                icon: "success",
                title: title,
              });
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
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        var data = noteerror.response.data;
        if (data) {
          var err_msg = data.message ? data.message : noteerror.message;
          Toast.fire({
            icon: "error",
            title: err_msg,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      }
    } catch (err) {
      console.log(err);
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
      otherLocation: userdata.otherLocation,
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
          var fullName = firstName + " " + lastName;
          sendFeedback(fullName, userdata.id);
          //history.push("/users");
          yield put(mutations.updateUserAccount(user));
          history.push(history.location.pathname);
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
          const fullName = user.firstName + " " + user.lastName;
          sendFeedback(fullName, userdata.id);
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

export function* saveMeetingSaga() {
  while (true) {
    const { meetingData } = yield take(mutations.SAVE_MEETING);

    const { response, error } = yield call(saveMeeting, meetingData);
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.save_meeting_success,
          });
          //sendFeedback(name, user.id);
          history.push("/my-meetings");
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      } else {
        var data = error.response.data;
        if (data) {
          var err_msg = data.message ? data.message : error.message;
          Toast.fire({
            icon: "error",
            title: err_msg,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  }
}

export function* editMeetingSaga() {
  while (true) {
    const { meetingdata } = yield take(mutations.PROCESSING_EDIT_MEETING);

    const { response, error } = yield call(editMeeting, meetingdata);
    try {
      if (response) {
        var data = response.data;
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.edit_meeting_success,
          });
          //history.push(history.location.pathname);
          history.push("/my-meetings");
          yield put(mutations.editMeeting(meetingdata));
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
          yield put(mutations.editMeeting(null));
        }
      } else {
        var data = error.response.data;
        var err_msg = data.message ? data.message : error.message;
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

export function* deleteMeetingSaga() {
  while (true) {
    const { id } = yield take(mutations.ON_DELETE_MEETING);

    const { response, error } = yield call(deleteMeeting, id);
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.meeting_delete_success,
          });
          history.push("/my-meetings");
          yield put(mutations.deleteMeeting(id));
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

export function* verifyMeetingSage() {
  while (true) {
    const { id, dateVerified } = yield take(mutations.PROCESS_VERIFY_MEETING);

    const { response, error } = yield call(verifyMeeting, id, dateVerified);
    try {
      if (response) {
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: alert_msg.verify_meeting_success,
          });
          yield put(mutations.verifyMeeting(id, dateVerified));
          history.push("/my-meetings");
        } else {
          Toast.fire({
            icon: "error",
            title: alert_msg.server_error,
          });
          history.push("/my-meetings");
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
export function* logoutUser() {
  while (true) {
    const { session, authenticated } = yield take(mutations.LOGOUT_USER);
    // console.log("session:", session);
    // console.log("authenticated:", authenticated);
    history.push("/");
    Toast.fire({
      icon: "success",
      title: alert_msg.user_logout,
    });
  }
}
