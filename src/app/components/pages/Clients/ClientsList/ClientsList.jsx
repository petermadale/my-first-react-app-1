import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import styles from "./ClientsList.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { requestDeleteClient, getClients } from "../../../../store/mutations";
import { Toast, Swal_alert } from "../../../../scripts/sweetalert";
import $ from "jquery";
import { compare } from "../../../../scripts/compare";
import { ConnectedClient } from "../Client/Client";
import { ConnectedCSVImportExport } from "../clientfunctions/CSVImportExport/CSVImportExport";
import { CSVLink, CSVDownload } from "react-csv";
import moment from "moment";

class ClientsList extends PureComponent {
    constructor(props) {
        super();
        
        this.state = {
            clients: props.clients,
            locations: props.locations,
            selectedLocation: "",
            sortedClients: props.clients,
            isAdmin: props.isAdmin,
            requestDeleteClient: props.requestDeleteClient,
            getClients: props.getClients,
            owner: props.owner,
            csvData: props.csvData,
            fileName: props.fileName,
            isSort: false
        }
    }
    
  handleChange = (event) => {
      const {value} = event.target;
      const {clients} = this.state;
      let newSortedClients = [];
    this.setState({
      selectedLocation: value,
      isSort: true
    })
    clients.map((client) => {
        client.assignedLocations.map((loc) => {
            if(loc === value) newSortedClients.push(client)
        });
    })
    this.setState({sortedClients: value === "" ? clients : newSortedClients})
  };

  getClientList = () => {
      const {isAdmin, getClients} = this.state;
      getClients(isAdmin);
  }
    render() {//
        const {
          locations, 
          selectedLocation, 
          sortedClients, 
          //clients, 
          isAdmin, 
          requestDeleteClient, 
          owner, 
          getClients, 
          csvData,
          fileName,
          isSort
        } = this.state;
        const {clients} = this.props;
        
        //this.setState({sortedClients : this.props.clients});

        return (
            <>
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-4">
                    <h1>Clients</h1>
                  </div>
                  <div className="col-sm-8">
                  <div className="row g-3 float-right"> 
                        {/* <div className="col-auto">
                            <button
                                className="btn bg-gradient-success float-right" onClick={this.getClientList}
                            >
                                <i className="fas fa-sync-alt"></i>
                                Refresh
                            </button>
                        </div>  */}
                        <div className="col-sm-auto">   
                            <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-location-arrow"></i></span>
                            </div>       
                            <select className="form-control" value={selectedLocation} onChange={this.handleChange}>
                                <option value=""> Sort by Location</option>
                                {locations.map((loc) => 
                                <option value={loc.name} key={loc.id}>{loc.name}</option>
                                )}
                            </select>
                            </div>      
                        </div>
                        <div className="col-sm-auto">
                            <Link
                                to="/client-new"
                                className="btn bg-gradient-success mr-2"
                            >
                                <i className="fas fa-file-alt"></i>
                                Create New Client
                            </Link>
                            <div className="dropdown float-right">
                              <a className="btn btn-link text-dark dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fas fa-ellipsis-v" data-toggle="tooltip" title="Actions"></i>
                              </a>

                              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                <button
                                    type="button"
                                    className="dropdown-item btn btn-link text-dark"
                                    data-toggle="modal"
                                    data-target="#modal-upload-client"
                                  >
                                  <i className="fas fa-upload"></i> Upload Clients
                                </button>
                                <CSVLink 
                                data={csvData} 
                                className="dropdown-item btn btn-link text-dark float-right"
                                filename={fileName}><i className="fa fa-download"></i> Download Clients</CSVLink>
                              </div>
                            </div>
                            <div className="modal fade" id="modal-upload-client">
                              <div className="modal-dialog modal-md">
                                <div className="modal-content">
                                <div className="modal-header">
                                        <h4 className="modal-title">
                                          Upload Clients
                                        </h4>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>
                                      <ConnectedCSVImportExport />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
            </section>
        
            <section className="content">
              {isSort ? <>{sortedClients.length > 0 ? (
                  <div className="row d-flex align-items-stretch">              
                      {sortedClients.map((client) => (
                      <ConnectedClient client={client} key={client.id} isAdmin={isAdmin} requestDeleteClient={requestDeleteClient} owner={owner} />
                      ))}
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <h5>
                      <i className="icon fas fa-exclamation-triangle"></i>
                      No clients found.
                    </h5>
                  </div>
                )}</> : 
                <>
                {clients.length > 0 ? (
                  <div className="row d-flex align-items-stretch">              
                      {clients.map((client) => (
                      <ConnectedClient client={client} key={client.id} isAdmin={isAdmin} requestDeleteClient={requestDeleteClient} owner={owner} />
                      ))}
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <h5>
                      <i className="icon fas fa-exclamation-triangle"></i>
                      No clients found.
                    </h5>
                  </div>
                )}
                </>
              } 
                
            </section>
          </>
        )
    }
}
  
const mapStateToProps = (state, ownProps) => {
    const isAdmin = state.session.isAdmin;
    const owner = state.session.id;
    const locations = state.locations;
    const clientsJSON = JSON.parse(JSON.stringify(state.clients));
    const clients = clientsJSON
      .map((client) => {
        return {
          ...client,
          clientContactDetails: client.clientContactDetails.map((contact) => {
            return {
              ...contact,
              toggleEdit: false,
            };
          }),
        };
      })
      .sort(compare);
    $('[data-toggle="tooltip"]').tooltip();
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
      ]
    ];
    var csvRow = [];
    clients.forEach(function(client) {
      if (client.clientContactDetails.length > 0) {
        client.clientContactDetails.forEach(function(contact) {
          csvRow.push([
            client.name, 
            client.licenseNumber,
            client.licenseExpiryDate,
            client.licenseLastVerifiedDate,
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
            client.populationsServed ? client.populationsServed.toString() : "",
            client.typesOfServices ? client.typesOfServices.toString() : "",
            client.specialties ? client.specialties.toString() : "",
            client.notes,
            client.assignedLocations.toString(),
            
            //client.insuranceAccepted ? client.insuranceAccepted.toString() : ""
          ]);
        });
      } else {
        csvRow.push([
          client.name, 
          client.licenseNumber,
          client.licenseExpiryDate,
          client.licenseLastVerifiedDate,
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
          client.populationsServed ? client.populationsServed.toString() : "",
          client.typesOfServices ? client.typesOfServices.toString() : "",
          client.specialties ? client.specialties.toString() : "",
          client.notes,
          client.assignedLocations.toString(),
        ]);
      }
    });
    var csvData = csvHeading.concat(csvRow);
    var dtoday = new Date();
    var fileName = "ClientList-" + moment(dtoday).format("MM-DD-YYYY") + ".csv";
    return {
      clients,
      isAdmin,
      locations,
      owner,
      csvData,
      fileName
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      requestDeleteClient(client, isAdmin, owner) {
        console.log(isAdmin);
        const $html = isAdmin ? "<b><i>All address(es), note(s) and meetings attached to this client will also be removed from the database.  Proceed?</i></b>" : "<b><i>All address(es), note(s) and meetings attached to this client will also be removed from the database.  Proceed?</i></b><br>      <span className='badge bg-warning text-dark'>Important NOTE: Delete request will be pending Admin approval.</span>";
        Swal_alert.fire({
          title: "Warning!",
          html: $html,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.value) {
            dispatch(requestDeleteClient(client, isAdmin, owner));
          //   const $title = isAdmin ? "Client deleted." : "Client delete request pending Admin approval.";
          //   Toast.fire({
          //     icon: "success",
          //     title: $title,
          //   });
          }
        });
      },
      getClients(isAdmin){
          dispatch(getClients(isAdmin));
      }
    };
  };
export const ConnectedClientsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsList);


// export const ClientsList = ({ clients, isAdmin, requestDeleteClient, locations, owner }) => (
 
// );

// const mapStateToProps = (state, ownProps) => {
  
// };



// export const ConnectedClientsList = connect(
//   mapStateToProps,
//   mapDispatchStateToProps
// )(ClientsList);
