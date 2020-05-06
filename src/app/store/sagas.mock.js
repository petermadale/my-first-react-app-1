import { take, put, select } from "redux-saga/effects";
import * as mutations from "./mutations";
import uuid from "uuid";

export function* taskCreationSaga() {
  while (true) {
    const { homeownerID, unittypeID } = yield take(
      mutations.REQUEST_CREATE_UNIT
    );
    const unitID = uuid();
    yield put(mutations.createUnit(unitID, homeownerID, unittypeID));
    console.log("Got unit ID", unitID);
  }
}
