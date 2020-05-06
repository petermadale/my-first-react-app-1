export const CREATE_HOME_OWNERS = `CREATE_HOME_OWNERS`;
export const REQUEST_CREATE_HOME_OWNERS = `REQUEST_CREATE_HOME_OWNERS`;
export const SET_UNIT_TYPE_NAME = `SET_UNIT_TYPE_NAME`;
export const CREATE_UNIT_TYPE = `CREATE_UNIT_TYPE`;
export const REQUEST_CREATE_UNIT_TYPE = `REQUEST_CREATE_UNIT_TYPE`;
export const CREATE_UNIT = `CREATE_UNIT`;
export const REQUEST_CREATE_UNIT = `REQUEST_CREATE_UNIT`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const USERNAME_RESERVED = `USERNAME_RESERVED`;
export const REQUEST_USER_ACCOUNT_CREATION = `REQUEST_USER_ACCOUNT_CREATION`;

export const SET_CLIENT_NAME = `SET_CLIENT_NAME`;
export const CREATE_NEW_CLIENT = `CREATE_NEW_CLIENT`;
export const DELETE_CLIENT = `DELETE_CLIENT`;
export const REQUEST_CREATE_CLIENT = `REQUEST_CREATE_CLIENT`;
export const GET_CLIENTS = `GET_CLIENTS`;

export const createNewClient = (client = {}) => ({
  type: CREATE_NEW_CLIENT,
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

export const getClients = () => ({
  type: GET_CLIENTS,
});

export const createUnitType = (unitTypeID) => ({
  type: CREATE_UNIT_TYPE,
  unitTypeID,
});

export const requestCreateUnitType = (unitTypeID) => ({
  type: REQUEST_CREATE_UNIT_TYPE,
  unitTypeID,
});

export const createUnit = (unitID, homeownerID, unittypeID) => ({
  type: CREATE_UNIT,
  unitID,
  homeownerID,
  unittypeID,
});

export const requestCreateUnit = (unittypeID, homeownerID) => ({
  type: REQUEST_CREATE_UNIT,
  unittypeID,
  homeownerID,
});

export const setUnitName = (id, name) => ({
  type: SET_UNIT_TYPE_NAME,
  id,
  name,
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

export const setState = (state = {}) => ({
  type: SET_STATE,
  state,
});

export const requestCreateUserAccount = (username, password) => ({
  type: REQUEST_USER_ACCOUNT_CREATION,
  username,
  password,
});
