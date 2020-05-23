import { take } from "redux-saga/effects";
import * as mutations from "./mutations";
import { history } from "./history";
import axios from "axios";
import { Toast } from "./sweetalert";

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
