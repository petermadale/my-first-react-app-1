import React from "react";
import { connect } from "react-redux";
import { requestCreateUnit } from "../store/mutations";
import { Link } from "react-router-dom";

export const UnitType = ({ unit_types, description, id, createNewUnit }) => (
  <>
    {unit_types.map((unit) => (
      <Link to={`/unit/${unit.id}`} key={unit.id}>
        <div>
          <p>
            <strong>Unit Type: </strong>
            {unit.name}
          </p>
        </div>
      </Link>
    ))}
    <button>Add New Unit</button>
  </>
);

const mapStateToProps = (state, ownProps) => {
  let unitID = ownProps.id;
  return {
    id: unitID,
    unit_type: ownProps.unit_type,
    description: ownProps.description,
    unit_types: state.unit_types.filter(
      (type) => type.id === ownProps.unit_type
    ),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewUnit(id) {
      console.log("create new unit", id);
      dispatch(requestCreateUnit(id));
    },
  };
};

export const ConnectedUnitType = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitType);
