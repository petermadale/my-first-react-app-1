import React from "react";
import { connect } from "react-redux";

export const ComponentName = () => <span>component content</span>;

const mapStateToProps = (state, ownProps) => {
  return;
};
export const ConnectedComponentName = connect(mapStateToProps)(ComponentName);
