import React from "react";
import { connect } from "react-redux";

export const ClientNameDisplay = ({ name }) => <>{name}</>;

const mapStateToProps = (state, ownProps) => {
  const { name } = state.clients.find((client) => client.id === ownProps.id);
  return {
    name,
  };
};
export const ConnectedClientNameDisplay = connect(mapStateToProps)(
  ClientNameDisplay
);
