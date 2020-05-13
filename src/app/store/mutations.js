export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const LOGOUT_USER = `LOGOUT_USER`;
export const SET_STATE = `SET_STATE`;
export const USERNAME_RESERVED = `USERNAME_RESERVED`;
export const REQUEST_USER_ACCOUNT_CREATION = `REQUEST_USER_ACCOUNT_CREATION`;
export const UPDATE_USER_DETAILS = `UPDATE_USER_DETAILS`;

export const SET_CLIENT_NAME = `SET_CLIENT_NAME`;
export const DUPLICATE_CLIENT_NAME = `DUPLICATE_CLIENT_NAME`;
export const CREATE_NEW_CLIENT = `CREATE_NEW_CLIENT`;
export const DELETE_CLIENT = `DELETE_CLIENT`;
export const UPDATE_CLIENT = `UPDATE_CLIENT`;
export const REQUEST_CREATE_CLIENT = `REQUEST_CREATE_CLIENT`;
export const GET_CLIENTS = `GET_CLIENTS`;

export const createNewClient = (client = {}) => ({
  type: CREATE_NEW_CLIENT,
  client,
});

export const updateClient = (id, owner, client = {}) => ({
  type: UPDATE_CLIENT,
  id,
  owner,
  client,
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

export const requestCreateUserAccount = (username, password) => ({
  type: REQUEST_USER_ACCOUNT_CREATION,
  username,
  password,
});

export const updateUserDetails = (id, username, password) => ({
  type: UPDATE_USER_DETAILS,
  id,
  username,
  password,
});
