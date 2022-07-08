import React, { Component } from "react";

class ClientSortByLocation extends Component {
  constructor(props) {
    super(props);
    const { locations, selectedLocation, handleChange } = props;
    this.state = {
      locations,
      selectedLocation,
      handleChange,
    };
  }

  handleLocationChange = (e) => {
    this.state.handleChange(e);
    this.setState({ selectedLocation: e.target.value });
  };

  render() {
    const { locations, selectedLocation } = this.state;
    return (
      <>
        <div className="col-sm-auto">
          <div className="input-group mb-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-location-arrow"></i>
              </span>
            </div>
            <select
              className="form-control"
              value={selectedLocation}
              onChange={this.handleLocationChange}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option value={loc.name} key={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
  }
}

export default ClientSortByLocation;
