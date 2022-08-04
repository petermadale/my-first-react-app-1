import React, { Component } from "react";
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";
import { connect } from "react-redux";
import {
  processingUploadClients,
  uploadClients,
} from "../../../../../store/mutations";
import uuid from "uuid";
import { CSVLink } from "react-csv";
import { Toast } from "../../../../../scripts/sweetalert";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
};

const csvHeading = [
  [
    "Last Name",
    "First Name",
    "Credentials",
    "Title",
    "Name of Orginazation or Private Practice",
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

var blankUploadCSV = csvHeading.concat([]);

class CSVImportExport extends Component {
  constructor(props) {
    super();
    const { onUploadClients, isUploadingClients, onClose } = props;
    this.state = {
      clientData: [],
      clientContactData: [],
      hasClientData: false,
      hasError: false,
      onUploadClients,
      isUploadingClients,
      onClose,
    };
  }
  onUploadClients = (clientData, clientContactData, isUploadingClients) => {
    this.props.onUploadClients(
      clientData,
      clientContactData,
      isUploadingClients
    );
  };

  downloadUploadTemplate = () => {};

  handleFileUpload = (data, fileInfo) => {
    this.setState({ hasError: false });
    data.map((d) => {
      if (
        !d.first_name ||
        !d.last_name ||
        d.first_name === " " ||
        d.last_name === " "
      ) {
        this.setState({ hasError: true });
      }
    });

    if (this.state.hasError) {
      Toast.fire({
        icon: "error",
        title:
          "Upload file has error.  Please make sure First and Last name is not empty.",
      });
      return;
    } else {
      var clientData = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        if (d.first_name && d.last_name) {
          var clientId = uuid();
          var contactId = uuid();
          clientData.push({
            id: clientId,
            name: d.first_name + " " + d.last_name,
            isVerified: true,
            owner: "User1", //only admin can; move to back-end
            // "firstName": d.first_name,
            // "lastName": d.last_name,
            //"credentials": d.credentials,
            titleWithOrg: d.title,
            nameOfOrg: d.name_of_organization_or_private_practice
              ? d.name_of_organization_or_private_practice
              : d.company_name,
            typeOfOrg: d.type_of_organization
              ? d.type_of_organization
              : d.industry,
            clientAddressOption:
              d.street_address != null || d.street != null
                ? "Has Address"
                : "Don't List Address",
            clientContactDetails: [
              {
                id: contactId,
                client: clientId,
                address1: d.street_address ? d.street_address : d.street,
                city: d.city,
                state: d.state,
                zip: d.zip,
                workEmail: d.email,
                officePhoneNumber: d.phone ? d.phone : d.office_phone_number,
                officePhoneNumberExt: d.extension,
                alternativePhoneNumber: d.alternative_phone_number,
                cellPhoneNumber: d.mobile_phone,
                faxNumber: d.fax_number ? d.fax_number : d.fax,
              },
            ],
            email: d.email ? d.email.split(";") : null,
            website: d.website,
            contactNumber: d.phone ? d.phone : d.phone_number,
            populationsServed: d.population_served
              ? d.population_served.split(";")
              : null,
            typesOfServices: d.types_of_services
              ? d.types_of_services.split(";")
              : null,
            specialties: d.specialties ? d.specialties.split(";") : null,
            notes: d.notes,
            dates: d.dates,
            assignedLocations: d.assigned_locations
              ? d.assigned_locations.split(";")
              : ["Others"],
            users: d.assigned_users
              ? d.assigned_users.split(";")
              : ["Peep Madz"],
          });
        }
      }
      const clientContactData = clientData.map((d) => {
        return { ...d.clientContactDetails[0] };
      });

      this.setState({
        hasClientData: true,
        clientData: clientData,
        clientContactData: clientContactData,
      });

      Toast.fire({
        icon: "success",
        title: "No error found.  Click upload button.",
      });
    }
  };

  render() {
    const {
      hasClientData,
      clientData,
      clientContactData,
      onUploadClients,
      hasError,
      isUploadingClients,
      onClose,
    } = this.state;
    return (
      <>
        <div className="modal-body">
          <div className="container">
            <CSVReader
              onFileLoaded={this.handleFileUpload}
              parserOptions={papaparseOptions}
            />
            <CSVLink
              data={blankUploadCSV}
              className="btn btn-link p-0"
              filename="UploadTemplate.csv"
            >
              <i className="fa fa-download"></i>{" "}
              <small>Download Upload Template</small>
            </CSVLink>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn bg-gradient-success"
            onClick={() =>
              this.onUploadClients(
                clientData,
                clientContactData,
                isUploadingClients
              )
            }
            disabled={!hasClientData}
          >
            <i className="fas fa-save"></i> Upload
          </button>
          <button
            type="button"
            className="btn bg-gradient-danger"
            // data-dismiss="modal"
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
  const { isUploadingClients } = state;
  return { isUploadingClients, ownProps };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUploadClients(clientData, clientContactData, isUploadingClients) {
      console.log(clientData, clientContactData, isUploadingClients);
      dispatch(
        processingUploadClients(
          clientData,
          clientContactData,
          isUploadingClients
        )
      );
    },
  };
};
export const ConnectedCSVImportExport = connect(
  mapStateToProps,
  mapDispatchToProps
)(CSVImportExport);
