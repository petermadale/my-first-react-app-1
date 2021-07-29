import React, { Component } from "react";
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";
import { connect } from "react-redux";
import { processingUploadClients, uploadClients } from "../../../../../store/mutations";
import uuid from "uuid";
import { CSVLink } from "react-csv";


const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };

  
  const csvHeading = [
    [
      //"ID",
      "Client Name", 
      "Email", 
      "Contact Number", 
      //"Contact Client ID",
      "Address 1",
      "Address 2",
      "City",
      "State",
      "Zip",
      "Office Phone Number",
      "Cell Phone Number",
      "Alt Phone Number",
      "Fax Number",
      "Website", 
      "Name of Organization", 
      "Title", 
      "License Number", 
      "License Expiry Date", 
      "Date the License was last verified", 
      "Locations", 
      "Notes",
      "Population Served",
      "Types of Services",
      "Specialties",
      "Insurance Accepted"
    ]
  ];
  
var blankUploadCSV = csvHeading.concat([]);

class CSVImportExport extends Component{
    constructor(props) {
        super();

        this.state = {
            clientData:[],
            clientContactData: [],
            hasClientData: false,
            onUploadClients: props.onUploadClients
        }
    }   
    onUploadClients = (clientData, clientContactData) => {
        this.props.onUploadClients(clientData, clientContactData);
    }
    downloadUploadTemplate = () => {


    }
    handleFileUpload = (data, fileInfo) => {
        const clientData = data.map((d) => {
            var clientId = uuid();
            var contactId = uuid();
            return {
                "id": clientId,
                "name": d.client_name,
                "email": d.email,
                "contactNumber": d.contactNumber ? d.contactNumber : null,
                "website": d.website,
                "nameOfOrg": d.name_of_organization,
                "titleWithOrg": d.title,
                "licenseNumber": d.license_number,
                "licenseExpiryDate": d.license_expiry_date,
                "licenseLastVerifiedDate": d.date_the_license_was_last_verified,
                "assignedLocations": d.locations ? d.locations.split(",") : null,
                "notes": d.notes,
                "populationsServed": d.population_served ? d.population_served.split(",") : null,
                "typesOfServices": d.types_of_services ? d.types_of_services.split(",") : null,
                "specialties": d.specialties ? d.specialties.split(",") : null,
                "insuranceAccepted": d.insurance_accepted ? d.insurance_accepted.split(",") : null,
                "isVerified": true,
                "clientAddressOption": "Has Address",
                "owner": "User1",//only admin can 
                "clientContactDetails": [
                    {"id": contactId,
                    "client" : clientId,
                    "address1" : d.address_1,
                    "address2" : d.address_2,
                    "city" : d.city,
                    "state" : d.state,
                    "zip" : d.zip,
                    "officePhoneNumber" : d.office_phone_number,
                    //"officePhoneNumberExt" : "875",
                    "cellPhoneNumber" : d.cell_phone_number,
                    "alternativePhoneNumber" : d.alt_phone_number,
                    "faxNumber" : d.fax_number,
                    //"alternateEmail" : "",
                    //"workEmail" : ""
                    }
                ]                    
            }
        });
        const clientContactData = clientData.map((d) => {
            return {...d.clientContactDetails[0]}
        });

        this.setState({
            hasClientData: true,
            clientData: clientData,
            clientContactData: clientContactData
        });
    }

    render() {
        const { hasClientData, clientData, clientContactData, onUploadClients } = this.state;
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
                filename="UploadTemplate.csv"><i className="fa fa-download"></i> <small>Download Upload Template</small></CSVLink>
        </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn bg-gradient-success" onClick={() => this.onUploadClients(clientData, clientContactData)} disabled={!hasClientData}>
                <i className="fas fa-save"></i>{" "}
                Upload
            </button>
            <button
                type="button"
                className="btn bg-gradient-danger"
                data-dismiss="modal"
            >
                <i className="fas fa-times-circle"></i> Cancel
            </button>
        </div>
    </>
)

    }
}

const mapStateToProps = (state, ownProps) => {
  return {ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUploadClients (clientData, clientContactData) {
            console.log(clientData, clientContactData);
            
            //dispatch(processingUploadClients(clientData, clientContactData));
        }
    }
}
export const ConnectedCSVImportExport = connect(mapStateToProps, mapDispatchToProps)(CSVImportExport);
