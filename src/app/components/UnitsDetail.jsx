import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

export const UnitDetail = ({ id, unit_type, setUnitName }) => (
  <div>
    <h1>Unit:</h1>
    <p>
      <input type="text" value={unit_type.name} onChange={setUnitName} />
    </p>
    <p>features: {unit_type.features}</p>
    <Link to="/dashboard">
      <button>Done</button>
    </Link>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let unit_type = state.unit_types.find((unit) => unit.id === id);
  return {
    id,
    unit_type,
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setUnitName(e) {
      dispatch(mutations.setUnitName(id, e.target.value));
    },
  };
};
export const ConnectedUnitDetail = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(UnitDetail);
