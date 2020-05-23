import React from "react";
import { connect } from "react-redux";

export const UsernameDisplay = ({ name }) => <span>{name}</span>;

const mapStateToProps = (state, ownProps) => {
  const { name } = state.users.find((user) => user.id === ownProps.id);
  return {
    name,
  };
};
export const ConnectedUsernameDisplay = connect(mapStateToProps)(
  UsernameDisplay
);
