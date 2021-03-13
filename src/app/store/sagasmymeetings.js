import axios from "axios";
import { url } from "./site-url";

export function saveMeeting(data) {
  return axios
    .post(url + `/mymeetings/new`, { data })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function editMeeting(meetingdata) {
  return axios
    .post(url + `/mymeetings/update`, { meetingdata })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function deleteMeeting(id) {
  return axios
    .delete(url + `/mymeetings/${id}`)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function verifyMeeting(id, dateVerified) {
  return axios
    .post(url + `/mymeetings/verify`, { meetingdata: { id, dateVerified } })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
