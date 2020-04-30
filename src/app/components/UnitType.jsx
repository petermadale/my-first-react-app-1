import React from "react";
import { connect } from "react-redux";

export const UnitType = ({ unit_types, description }) => (
  <>
    {unit_types.map((unit) => (
      <div key={unit.id}>
        <p>
          <strong>Unit Type: </strong>
          {unit.description}
        </p>
      </div>
    ))}
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

export const ConnectedUnitType = connect(mapStateToProps)(UnitType);
