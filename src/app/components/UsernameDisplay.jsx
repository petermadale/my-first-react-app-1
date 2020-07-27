import React from "react";
import { connect } from "react-redux";

export const UsernameDisplay = ({ name }) => (
  <span className="user-name">{name}</span>
);

const mapStateToProps = (state, ownProps) => {
  const { firstName, lastName } = state.users.find(
    (user) => user.id === ownProps.id
  );
  const name = firstName + " " + lastName;
  return {
    name,
  };
};
export const ConnectedUsernameDisplay = connect(mapStateToProps)(
  UsernameDisplay
);
