import React from "react";
import { connect } from "react-redux";

export const SearchInput = ({ id, name }) => (
  <form>
    <input
      type="text"
      name=""
      id=""
      className="form-control"
      placeholder="Search Client"
    />
  </form>
);

const mapStateToProps = (state) => state;
export const ConnectedSearchInput = connect(mapStateToProps)(SearchInput);
