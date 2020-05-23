import React from "react";
import { connect } from "react-redux";
import { addToMyFavorites, removeFromMyFavorites } from "../store/mutations";
import uuid from "uuid";

export const ButtonFavorite = ({ client, ownerID, addRemoveToMyFavorites }) => (
  <button
    className="btn btn-link p-0"
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
      const id = isFavorite ? uuid() : null;
      if (myfave) dispatch(removeFromMyFavorites(myfave));
      else dispatch(addToMyFavorites(id, clientID, ownerID, isFavorite));
    },
  };
};
export const ConnectedButtonFavorite = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonFavorite);
