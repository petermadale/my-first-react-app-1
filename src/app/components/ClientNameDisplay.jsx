import React from "react";
import { connect } from "react-redux";

export const ClientNameDisplay = ({ name }) => (
  <span className="client-name">{name}</span>
);

const mapStateToProps = (state, ownProps) => {
  const { name } = state.clients.find((client) => client.id === ownProps.id);
  return {
    name,
  };
};
export const ConnectedClientNameDisplay = connect(mapStateToProps)(
  ClientNameDisplay
);
