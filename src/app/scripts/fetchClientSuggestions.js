import axios from "axios";
import { url } from "../store/site-url";

import {
  fetchClientSuggestionsError,
  fetchClientSuggestionsPending,
  fetchClientSuggestionsSuccess,
} from "../store/mutations";

function fetchClientSuggestions() {
  return axios
    .fetch(url + `/clientContactDetailsSuggestions`)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(fetchClientSuggestionsSuccess(res.products));
      return res.products;
    })
    .catch((error) => {
      dispatch(fetchClientSuggestionsError(error));
    });
}

export default fetchClientSuggestions;
