export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const LOGOUT_USER = `LOGOUT_USER`;
export const SET_STATE = `SET_STATE`;

export const PROCESSING_UPDATE_USER = `PROCESSING_UPDATE_USER`;
export const PROCESSING_CREATE_USER = `PROCESSING_CREATE_USER`;
export const CREATE_USER_ACCOUNT = `CREATE_USER_ACCOUNT`;
export const PASSWORD_MISMATCH = `PASSWORD_MISMATCH`;
export const PASSWORD_MATCH = `PASSWORD_MATCH`;
export const PASSWORD_INCORRECT = `PASSWORD_INCORRECT`;
export const USERNAME_RESERVED = `USERNAME_RESERVED`;
export const NAME_RESERVED = `NAME_RESERVED`;
export const USER_ACCOUNT_CREATED = `USER_ACCOUNT_CREATED`;
export const USER_ACCOUNT_ERROR = `USER_ACCOUNT_ERROR`;
export const UPDATE_USER_ACCOUNT = `UPDATE_USER_ACCOUNT`;
export const DELETE_USER_ACCOUNT = `DELETE_USER_ACCOUNT`;
export const ACCOUNT_NOT_APPROVED = `ACCOUNT_NOT_APPROVED`;

export const PROCESSING_UPDATE_MY_DETAILS = `PROCESSING_UPDATE_MY_DETAILS`;
export const UPDATE_MY_DETAILS = `UPDATE_MY_DETAILS`;

export const SET_CLIENT_NAME = `SET_CLIENT_NAME`;
export const DUPLICATE_CLIENT_NAME = `DUPLICATE_CLIENT_NAME`;
export const CREATE_NEW_CLIENT = `CREATE_NEW_CLIENT`;
export const DELETE_CLIENT = `DELETE_CLIENT`;
export const UPDATE_CLIENT = `UPDATE_CLIENT`;
export const REQUEST_CREATE_CLIENT = `REQUEST_CREATE_CLIENT`;
export const GET_CLIENTS = `GET_CLIENTS`;

export const ADD_TO_MY_FAVORITES = `ADD_TO_MY_FAVORITES`;
export const REMOVE_FROM_MY_FAVORITES = `REMOVE_FROM_MY_FAVORITES`;

export const SAVE_PERSONAL_NOTE = `SAVE_PERSONAL_NOTE`;
export const EDIT_PERSONAL_NOTE = `EDIT_PERSONAL_NOTE`;
export const DELETE_PERSONAL_NOTE = `DELETE_PERSONAL_NOTE`;
export const TOGGLE_EDIT = `TOGGLE_EDIT`;

export const CREATE_CLIENT_CONTACT_DETAILS = `CREATE_CLIENT_CONTACT_DETAILS`;
export const UPDATE_CLIENT_CONTACT_DETAILS = `UPDATE_CLIENT_CONTACT_DETAILS`;
export const DELETE_CLIENT_CONTACT_DETAILS = `DELETE_CLIENT_CONTACT_DETAILS`;
export const CLIENT_CONTACT_TOGGLE_EDIT = `CLIENT_CONTACT_TOGGLE_EDIT`;

export const SUGGEST_EDITS_TO_CLIENT_CONTACT_DETAILS = `SUGGEST_EDITS_TO_CLIENT_CONTACT_DETAILS`;
export const APPROVE_ADDRESS_SUGGESTION = `APPROVE_ADDRESS_SUGGESTION`;
export const ADDRESS_SUGGESTION_SUCCESS = `ADDRESS_SUGGESTION_SUCCESS`;
export const ADDRESS_SUGGESTION_FAILED = `ADDRESS_SUGGESTION_FAILED`;
export const REJECT_ADDRESS_SUGGESTION = `REJECT_ADDRESS_SUGGESTION`;

export const FETCH_CLIENT_SUGGESTIONS_PENDING = `FETCH_CLIENT_SUGGESTIONS_PENDING`;
export const FETCH_CLIENT_SUGGESTIONS_ERROR = `FETCH_CLIENT_SUGGESTIONS_ERROR`;
export const FETCH_CLIENT_SUGGESTIONS_SUCCESS = `FETCH_CLIENT_SUGGESTIONS_SUCCESS`;

export const createNewClient = (client = {}, clientContact = {}) => ({
  type: CREATE_NEW_CLIENT,
  client,
  clientContact,
});

export const updateClient = (client = {}) => ({
  type: UPDATE_CLIENT,
  client,
});

export const suggestEditsToClientContactDetails = (
  clientContactDetailsSuggestions = {}
) => ({
  type: SUGGEST_EDITS_TO_CLIENT_CONTACT_DETAILS,
  clientContactDetailsSuggestions,
});

export const approveAddressSuggestion = (
  clientContactDetailsSuggestions = {}
) => ({
  type: APPROVE_ADDRESS_SUGGESTION,
  clientContactDetailsSuggestions,
});

export const rejectAddressSuggestion = (id, clientID) => ({
  type: REJECT_ADDRESS_SUGGESTION,
  id,
  clientID,
});

export const addToMyFavorites = (id, clientID, owner, isFavorite) => ({
  type: ADD_TO_MY_FAVORITES,
  id,
  clientID,
  owner,
  isFavorite,
});

export const removeFromMyFavorites = (id) => ({
  type: REMOVE_FROM_MY_FAVORITES,
  id,
});

export const deleteClient = (id) => ({
  type: DELETE_CLIENT,
  id,
});

export const setClientName = (id, name) => ({
  type: SET_CLIENT_NAME,
  id,
  name,
});

export const duplicateClientName = (name) => ({
  type: DUPLICATE_CLIENT_NAME,
  name,
});

export const getClients = () => ({
  type: GET_CLIENTS,
});

export const savePersonalNote = (personalnote = {}) => ({
  type: SAVE_PERSONAL_NOTE,
  personalnote,
});

export const editPersonalNote = (personalnote = {}) => ({
  type: EDIT_PERSONAL_NOTE,
  personalnote,
});

export const deletePersonalNote = (id) => ({
  type: DELETE_PERSONAL_NOTE,
  id,
});

export const toggleEditClick = (id, toggleEdit) => ({
  type: TOGGLE_EDIT,
  id,
  toggleEdit,
});

export const clientContactToggleEditClick = (
  clientID,
  clientContactDetails,
  toggleEdit
) => ({
  type: CLIENT_CONTACT_TOGGLE_EDIT,
  clientID,
  clientContactDetails,
  toggleEdit,
});

export const createClientContactDetails = (clientContact = {}) => ({
  type: CREATE_CLIENT_CONTACT_DETAILS,
  clientContact,
});

export const updateClientContactDetails = (clientContact = {}) => ({
  type: UPDATE_CLIENT_CONTACT_DETAILS,
  clientContact,
});

export const deleteClientContactDetails = (id, client) => ({
  type: DELETE_CLIENT_CONTACT_DETAILS,
  id,
  client,
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password,
});

export const processAuthenticateUser = (
  status = AUTHENTICATING,
  session = null
) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  session,
  authenticated: status,
});

export const logoutUser = (status = NOT_AUTHENTICATED, session = null) => ({
  type: LOGOUT_USER,
  session,
  authenticated: status,
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state,
});

export const createUserAccount = (userdata) => ({
  type: CREATE_USER_ACCOUNT,
  userdata,
});

export const processCreateUser = (userdata) => ({
  type: PROCESSING_CREATE_USER,
  userdata,
});

export const updateUserAccount = (userdata) => ({
  type: UPDATE_USER_ACCOUNT,
  userdata,
});

export const processUpdateUser = (userdata) => ({
  type: PROCESSING_UPDATE_USER,
  userdata,
});

export const deleteUserAccount = (id) => ({
  type: DELETE_USER_ACCOUNT,
  id,
});

export const processUpdateMyDetails = (userdata) => ({
  type: PROCESSING_UPDATE_MY_DETAILS,
  userdata,
});

export const updateMyDetails = (userdata) => ({
  type: UPDATE_MY_DETAILS,
  userdata,
});

//TODO for dashboard client suggestions
export const fetchClientSuggestionsPending = () => ({
  type: FETCH_CLIENT_SUGGESTIONS_PENDING,
});
export const fetchClientSuggestionsSuccess = (clientSuggestions) => ({
  type: FETCH_CLIENT_SUGGESTIONS_SUCCESS,
  clientSuggestions,
});
export const fetchClientSuggestionsError = (error) => ({
  type: FETCH_CLIENT_SUGGESTIONS_ERROR,
  error,
});
