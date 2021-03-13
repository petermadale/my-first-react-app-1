import axios from "axios";
import { url } from "./site-url";

export function getPersonalNote(id) {
  return axios
    .get(url + `/personalnotes/${id}`)
    .then((noteresponse) => ({ noteresponse }))
    .catch((noteerror) => ({ noteerror }));
}
export function deletePersonalNote(id) {
  return axios
    .delete(url + `/personalnotes/${id}`)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function verifyPersonalNote(notedata) {
  return axios
    .post(url + `/personalnotes/verify`, { notedata })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
