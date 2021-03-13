import axios from "axios";
import { url } from "./site-url";

export function createNewClient(client) {
  return axios
    .post(url + `/clients/new`, { client })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function updateClient(client) {
  return axios
    .post(url + `/clients/update`, { client })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function verifyClient(id) {
  return axios
    .post(url + `/clients/verify`, { id })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function deleteClient(id) {
  return axios
    .delete(url + `/clients/${id}`)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function deleteClientRequest(id, clientID, owner) {
  return axios
    .post(url + `/clients/deleteClientRequest`, {
      data: { id, client: clientID, owner: owner },
    })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function createNewClientContactDetails(clientContact) {
  return axios
    .post(url + `/clientContactDetails/new`, { clientContact })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function updateClientContactDetails(clientContact) {
  return axios
    .post(url + `/clientContactDetails/update`, { clientContact })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function deleteClientContactDetails(id) {
  return axios
    .delete(url + `/clientContactDetails/${id}`)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function suggestEditsToClientContactDetails(clientContact) {
  return axios
    .post(url + `/clientContactDetailsSuggestions/new`, { clientContact })
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function approveClientContactDetailsSuggestions(
  clientContactDetailsSuggestions
) {
  return axios
    .post(url + `/approveClientContactDetailsSuggestions`, {
      clientContactDetailsSuggestions,
    })
    .then((response) => ({
      response,
    }))
    .catch((error) => ({ error }));
}

export function rejectClientContactDetailsSuggestions(id) {
  return axios
    .delete(url + `/clientContactDetailsSuggestions/${id}`)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function requestRejectDeleteClientRequest(id) {
  return axios
    .delete(url + `/requestRejectCancelDeleteClientRequest/${id}`)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}

export function requestCancelDeleteClientRequest(id) {
  return axios
    .delete(url + `/requestRejectCancelDeleteClientRequest/${id}`)
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
