import React from "react";
import { connect } from "react-redux";

export const Favorites = () => (
  <div className="row">
    <h1>Favorites</h1>
  </div>
);
function mapStateToProps(state) {
  return {
    state: state,
  };
}

export const ConnectedFavorites = connect(mapStateToProps)(Favorites);
