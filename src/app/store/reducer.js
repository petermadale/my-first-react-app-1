import { combineReducers } from "redux";
import * as mutations from "./mutations";

let defaultState = {
  session: {},
  clients: [],
  users: [],
  myfavorites: [],
  personalnotes: [],
};

export const reducer = combineReducers({
  session(userSession = defaultState.session, action) {
    let { type, authenticated, session } = action;

    switch (type) {
      case mutations.SET_STATE:
        let id = action.state.session.id;
        let isAdmin = id === "User1" ? true : false;
        return {
          ...userSession,
          id: id,
          name: action.state.session.name,
          isAdmin: isAdmin,
          username: action.state.session.username,
        };
      case mutations.REQUEST_AUTHENTICATE_USER:
        return { ...userSession, authenticated: mutations.AUTHENTICATING };
      case mutations.PROCESSING_AUTHENTICATE_USER:
        return { ...userSession, authenticated };
      case mutations.UPDATE_USER_DETAILS:
        return { ...userSession, name: action.name, username: action.username };
      case mutations.LOGOUT_USER:
        return {};
      default:
        return userSession;
    }
  },

  clients(clients = defaultState.clients, action) {
    switch (action.type) {
      case mutations.SET_STATE:
        return action.state.clients;
      // .map((client) => {
      //   return {
      //     ...client,
      //     personalnotes: action.state.personalnotes.filter((note) => {
      //       return note.client === client.id;
      //     }),
      //   };
      // });
      case mutations.SET_CLIENT_NAME:
        return clients.map((client) => {
          return client.id === action.id
            ? { ...client, name: action.name }
            : client;
        });
      case mutations.UPDATE_CLIENT:
        let {
          id,
          name,
          email,
          address,
          phone,
          ext,
          cell,
          fax,
          owner,
        } = action.client;
        return clients.map((client) => {
          return client.id === id
            ? {
                ...client,
                name,
                email,
                address,
                phone,
                ext,
                cell,
                fax,
                owner,
              }
            : client;
        });
      case mutations.CREATE_NEW_CLIENT:
        return [...clients, action.client];
      case mutations.DELETE_CLIENT:
        return (clients = clients.filter((client) => {
          return client.id !== action.id;
        }));
      case mutations.LOGOUT_USER:
        return [];
    }
    return clients;
  },
  users(users = defaultState.users, action) {
    switch (action.type) {
      case mutations.SET_STATE:
        return action.state.users;
      case mutations.LOGOUT_USER:
        return [];
    }
    return users;
  },
  myfavorites(myfavorites = defaultState.myfavorites, action) {
    switch (action.type) {
      case mutations.SET_STATE:
        return action.state.myfavorites;
      case mutations.ADD_TO_MY_FAVORITES:
        let { clientID, id, owner } = action;
        return [
          ...myfavorites,
          {
            client: clientID,
            id,
            owner,
          },
        ];
      case mutations.REMOVE_FROM_MY_FAVORITES:
        return myfavorites.filter((myfave) => {
          return myfave.id !== action.id;
        });
      case mutations.LOGOUT_USER:
        return [];
    }
    return myfavorites;
  },
  personalnotes(personalnotes = defaultState.personalnotes, action) {
    switch (action.type) {
      case mutations.SET_STATE:
        return action.state.personalnotes;

      case mutations.TOGGLE_EDIT:
        return personalnotes.map((note) => {
          return note.id === action.id
            ? {
                ...note,
                toggleEdit: action.toggleEdit,
              }
            : note;
        });
      case mutations.SAVE_PERSONAL_NOTE:
        return [
          ...personalnotes,
          {
            id: action.id,
            client: action.client,
            note: action.note,
            datetime: action.datetime,
            owner: action.owner,
            //isVerified: action.isVerified,
          },
        ];
      case mutations.EDIT_PERSONAL_NOTE:
        let { id, isVerified, note, datetimeupdated } = action.personalnote;
        return personalnotes.map((pnote) => {
          return pnote.id === id
            ? {
                ...pnote,
                isVerified,
                note,
                datetimeupdated,
                toggleEdit: false,
              }
            : pnote;
        });
      case mutations.DELETE_PERSONAL_NOTE:
        return (personalnotes = personalnotes.filter((note) => {
          return note.id !== action.id;
        }));
      case mutations.LOGOUT_USER:
        return [];
    }
    return personalnotes;
  },
});
