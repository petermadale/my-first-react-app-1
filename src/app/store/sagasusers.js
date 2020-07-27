import axios from "axios";
import { url } from "./site-url";

export function authenticateUser(username, password) {
  return axios
    .post(url + `/authenticate`, {
      username,
      password,
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function createUser(user) {
  return axios
    .post(url + `/user/create`, {
      user,
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function updateUser(user) {
  return axios
    .post(url + `/users/update`, { user })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function deleteUser(id) {
  return axios
    .delete(url + `/users/${id}`)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
