export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const LOGOUT_USER = `LOGOUT_USER`;
export const SET_STATE = `SET_STATE`;

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
export const REQUEST_USER_ACCOUNT_CREATION = `REQUEST_USER_ACCOUNT_CREATION`;
export const PASSWORD_MISMATCH = `PASSWORD_MISMATCH`;
export const PASSWORD_MATCH = `PASSWORD_MATCH`;
export const PASSWORD_INCORRECT = `PASSWORD_INCORRECT`;
export const USERNAME_RESERVED = `USERNAME_RESERVED`;
export const NAME_RESERVED = `NAME_RESERVED`;
export const USER_ACCOUNT_CREATED = `USER_ACCOUNT_CREATED`;
export const UPDATE_USER_DETAILS = `UPDATE_USER_DETAILS`;
export const ACCOUNT_NOT_APPROVED = `ACCOUNT_NOT_APPROVED`;

export const createNewClient = (client = {}) => ({
  type: CREATE_NEW_CLIENT,
  client,
});

export const updateClient = (id, client = {}) => ({
  type: UPDATE_CLIENT,
  id,
  client,
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

export const updateUserDetails = (id, name, username, password) => ({
  type: UPDATE_USER_DETAILS,
  id,
  name,
  username,
  password,
});

export const requestCreateUserAccount = (
  name,
  username,
  password,
  confirmPassword
) => ({
  type: REQUEST_USER_ACCOUNT_CREATION,
  name,
  username,
  password,
  confirmPassword,
});
