import React from "react";
import { connect } from "react-redux";
import { ConnectedUnitType } from "./UnitType";

export const UnitList = ({ units, home_owner }) => (
  <>
    <p>
      <strong>Home Owner: </strong>
      {home_owner}
    </p>
    {units.map((unit) => (
      <div key={unit.id}>
        <strong>Block:</strong> {unit.block}/ <strong>Lot:</strong> {unit.lot}
        <ConnectedUnitType
          key={unit.id}
          id={unit.id}
          unit_type={unit.unit_type}
        />
      </div>
    ))}
    <hr />
  </>
);

const mapStateToProps = (state, ownProps) => {
  let homeownerID = ownProps.id;
  return {
    id: homeownerID,
    home_owner: ownProps.name,
    block: ownProps.block,
    lot: ownProps.lot,
    units: state.units.filter((unit) => unit.home_owner === homeownerID),
  };
};

export const ConnectedUnitList = connect(mapStateToProps)(UnitList);
