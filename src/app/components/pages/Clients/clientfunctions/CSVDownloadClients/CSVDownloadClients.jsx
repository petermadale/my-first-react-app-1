import moment from "moment";
import React, { Component } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";

class CSVDownloadClients extends Component {
  constructor(props) {
    super();
    const { clients, locations, onClose } = props;
    this.state = {
      clients,
      locations,
      selectedLocation: "",
      csvData: [],
      fileName: "",
      onClose,
    };
  }

  handleChange = (e) => {
    const { clients } = this.state;
    const filteredClients =
      e.target.value === ""
        ? clients
        : clients.filter((client) =>
            client.assignedLocations.includes(e.target.value)
          );

    this.setState({
      selectedLocation: e.target.value,
    });

    const csvHeading = [
      [
        "Name",
        "Credentials",
        "Title",
        "Name of Organization or Private Practice",
        "Type of Organization",
        "Street Address",
        "City",
        "State",
        "Zip",
        "Phone",
        "Alternative Phone Number",
        "Fax",
        "Email",
        "Website",
        "Populations Served",
        "Types of Services",
        "Specialties",
        "Dates",
        "Notes",
        "Assigned Locations",
        "Assigned Users",
      ],
    ];

    const csvRow = [],
      dtoday = new Date();

    filteredClients.forEach(function (client) {
      if (
        client.clientContactDetails != null &&
        client.clientContactDetails.length > 0
      ) {
        client.clientContactDetails.forEach(function (contact) {
          csvRow.push([
            client.name,
            null, //client.credentials
            client.titleWithOrg,
            client.nameOfOrg,
            client.typeOfOrg,
            contact.address1,
            contact.city,
            contact.state,
            contact.zip,
            contact.officePhoneNumber,
            contact.alternativePhoneNumber,
            contact.faxNumber,
            client.email,
            client.website,
            client.populationsServed != null &&
            client.populationsServed.length > 0
              ? client.populationsServed.toString()
              : "",
            client.typesOfServices != null && client.typesOfServices.length > 0
              ? client.typesOfServices.toString()
              : "",
            client.specialties != null && client.specialties.length > 0
              ? client.specialties.toString()
              : "",
            client.dates,
            client.notes,
            client.assignedLocations != null &&
            client.assignedLocations.length > 0
              ? client.assignedLocations.toString()
              : "",
            client.users != null && client.users.length > 0
              ? client.users.toString()
              : "",
          ]);
        });
      } else {
        csvRow.push([
          client.name,
          null, //client.credentials
          client.titleWithOrg,
          client.nameOfOrg,
          client.typeOfOrg,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          client.email,
          client.website,
          client.populationsServed != null &&
          client.populationsServed.length > 0
            ? client.populationsServed.toString()
            : "",
          client.typesOfServices != null && client.typesOfServices.length > 0
            ? client.typesOfServices.toString()
            : "",
          client.specialties != null && client.specialties.length > 0
            ? client.specialties.toString()
            : "",
          client.dates,
          client.notes,
          client.assignedLocations != null &&
          client.assignedLocations.length > 0
            ? client.assignedLocations.toString()
            : "",
          client.users != null && client.users.length > 0
            ? client.users.toString()
            : "",
        ]);
      }
    });

    this.setState({
      csvData: csvHeading.concat(csvRow),
      fileName: "ClientList-" + moment(dtoday).format("MM-DD-YYYY") + ".csv",
    });
  };
  render() {
    const { clients, locations, selectedLocation, csvData, fileName, onClose } =
      this.state;
    return (
      <>
        <div className="modal-body">
          <div className="container">
            <div className="input-group mb-1">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-location-arrow"></i>
                </span>
              </div>
              <select
                className="form-control"
                value={selectedLocation}
                onChange={this.handleChange}
              >
                <option value=""> All Locations</option>
                {locations.map((loc) => (
                  <option value={loc.name} key={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <CSVLink
            data={csvData}
            className="btn bg-gradient-success"
            filename={fileName}
          >
            <i className="fa fa-download"></i> Download
          </CSVLink>
          <button
            type="button"
            className="btn bg-gradient-danger"
            onClick={onClose}
          >
            <i className="fas fa-times-circle"></i> Cancel
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ownProps;
};
export const ConnectedCSVDownloadClients = connect(
  mapStateToProps,
  mapDispatchToProps
)(CSVDownloadClients);
