import { take } from "redux-saga/effects";
import * as mutations from "./mutations";
import { history } from "./history";
import axios from "axios";
import { Toast } from "./sweetalert";
import $ from "jquery";

export function* clientModificationSaga() {
  while (true) {
    // const data = yield take([
    //   mutations.UPDATE_CLIENT,
    //   mutations.ADD_TO_FAVORITES,
    // ]);
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

// export function* getDataSaga() {
//   while (true) {
//     const clients = yield take(mutations.GET_CLIENTS);
//     // const data = axios.get(url + `/clients`);
//     const user_status = yield take(mutations.AUTHENTICATED);
//     console.log("user_status", user_status);
//   }
// }
