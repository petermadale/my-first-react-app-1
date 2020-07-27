import React from "react";
import { connect } from "react-redux";
import {
  addToMyFavorites,
  removeFromMyFavorites,
} from "../../../../store/mutations";
import uuid from "uuid";

export const ButtonFavorite = ({ client, ownerID, addRemoveToMyFavorites }) => (
  <button
    className="btn btn-link p-0 float-right"
    onClick={() =>
      addRemoveToMyFavorites(
        client.id,
        client.myfave,
        ownerID,
        (client.isFavorite = !client.isFavorite)
      )
    }
    data-toggle="tooltip"
    title={`${
      client.isFavorite ? "Remove from My Favorites." : "Add to My Favorites"
    }`}
  >
    <i
      className={`fas fa-heart ${
        client.isFavorite ? "text-danger" : "text-muted"
      }`}
    ></i>
  </button>
);
const mapStateToProps = (state, ownProps) => {
  const client = ownProps.client;
  const ownerID = state.session.id;
  return {
    client,
    ownerID,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addRemoveToMyFavorites(clientID, myfave, ownerID, isFavorite) {
      const myfaveID = isFavorite ? uuid() : null; //move myfaveid uuid to server
      const id = myfave ? myfave.id : null;
      //   if (id) dispatch(removeFromMyFavorites(id));
      //   else dispatch(addToMyFavorites(myfaveID, clientID, ownerID, isFavorite));
    },
  };
};
export const ConnectedButtonFavorite = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonFavorite);
