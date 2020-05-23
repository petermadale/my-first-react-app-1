import { take, put, select, call } from "redux-saga/effects";
import * as mutations from "./mutations";
import { history } from "./history";
import axios from "axios";
import { Toast } from "./sweetalert";

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
