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
      "Client Name", 
      "License Number", 
      "License Expiry Date", 
      "Date the License was last verified", 
      "Title", 
      "Name of Organization",
      "Type of Organization/Provider",
      "Street Address",
      "City",
      "State",
      "Zip",
      "Office Phone Number",
      "Alt Phone Number",
      "Fax Number",
      "Email", 
      "Website", 
      "Population Served",
      "Types of Services",
      "Specialties",
      "Notes",
      "Locations", 

    //   "Contact Number", 
    //   //"Contact Client ID",
      
    //   "Cell Phone Number",
    //   "Insurance Accepted"
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
                "licenseNumber": d.license_number,
                "licenseExpiryDate": d.license_expiry_date,
                "licenseLastVerifiedDate": d.date_the_license_was_last_verified,
                "titleWithOrg": d.title,
                "nameOfOrg": d.name_of_organization,
                "typeOfOrg": d.type_of_organization_provider,
                "email": d.email,
                //"contactNumber": d.contactNumber ? d.contactNumber : null,
                "website": d.website,
                "populationsServed": d.population_served ? d.population_served.split(",") : null,
                "typesOfServices": d.types_of_services ? d.types_of_services.split(",") : null,
                "specialties": d.specialties ? d.specialties.split(",") : null,
                "notes": d.notes,
                "assignedLocations": d.locations ? d.locations.split(",") : null,
                //"insuranceAccepted": d.insurance_accepted ? d.insurance_accepted.split(",") : null,
                
                "isVerified": true,
                "clientAddressOption": "Has Address",
                "owner": "User1",//only admin can 
                "clientContactDetails": [
                    {"id": contactId,
                    "client" : clientId,
                    "address1" : d.street_address,
                    "city" : d.city,
                    "state" : d.state,
                    "zip" : d.zip,
                    "officePhoneNumber" : d.office_phone_number,
                    //"officePhoneNumberExt" : "875",
                    //"cellPhoneNumber" : d.cell_phone_number,
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
            dispatch(processingUploadClients(clientData, clientContactData));
        }
    }
}
export const ConnectedCSVImportExport = connect(mapStateToProps, mapDispatchToProps)(CSVImportExport);
