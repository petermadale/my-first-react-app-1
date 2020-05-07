import React from "react";
import { connect } from "react-redux";
import { Autocomplete } from "react-autocomplete";

export const SearchInput = () => (
  <form className="form-inline ml-3">
    <div className="input-group input-group-sm">
      <input
        className="form-control form-control-navbar"
        type="search"
        placeholder="Search Client"
        aria-label="Search"
      />
      <div className="input-group-append">
        <button className="btn btn-navbar" type="submit">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  </form>
);

const mapStateToProps = (state) => state;
export const ConnectedSearchInput = connect(mapStateToProps)(SearchInput);
