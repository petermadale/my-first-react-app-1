import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { requestDeleteClient, getClients } from "../../../../store/mutations";
import { Swal_alert } from "../../../../scripts/sweetalert";
import $ from "jquery";
import { compare } from "../../../../scripts/compare";
import { ConnectedClient } from "../Client/Client";
import moment from "moment";
import BarLoader from "react-bar-loader";
import ClientSortByLocation from "../clientfunctions/ClientSortByLocation/ClientSortByLocation";
import ClientToggleView from "../clientfunctions/ClientToggleView/ClientToggleView";
import UploadDownloadClients from "../clientfunctions/UploadDownloadClients/UploadDownloadClients";
import AlertComponent from "../../../reusableComponents/AlertComponent/AlertComponent";
import ClientTable from "../ClientTable/ClientTable";

class ClientsList extends Component {
  constructor(props) {
    super(props);
    const {
      clients,
      sortedClients = clients,
      locations,
      isAdmin,
      requestDeleteClient,
      owner,
      filename,
    } = this.props;
    this.state = {
      clients,
      locations,
      selectedLocation: "",
      sortedClients,
      isAdmin,
      requestDeleteClient,
      getClients,
      owner,
      fileName: filename ? filename : null,
      isSort: false,
      toggleView: "detail",
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    const { clients } = this.state;
    const newSortedClients = clients.filter((client) => {
      if (client.assignedLocations !== null)
        return client.assignedLocations.includes(value);
    });
    this.setState({
      selectedLocation: value,
      isSort: true,
    });
    this.setState({ sortedClients: value === "" ? clients : newSortedClients });
  };

  handleToggleView = (toggleView) => {
    this.setState({ toggleView: toggleView });
  };

  render() {
    const {
      locations,
      selectedLocation,
      sortedClients,
      isAdmin,
      requestDeleteClient,
      owner,
      isSort,
      toggleView,
    } = this.state;
    const { clients, isUploadingClients } = this.props;

    return (
      <>
        {isUploadingClients && <BarLoader color="#1D8BF1" height="2" />}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-4">
                <h1>
                  Clients{" "}
                  <small className="badge-sm badge-pill badge-info">
                    {sortedClients.length}
                  </small>
                </h1>
              </div>
              <div className="col-sm-8">
                <div className="row g-3 float-right">
                  <ClientToggleView handleToggleView={this.handleToggleView} />
                  <ClientSortByLocation
                    locations={locations}
                    handleChange={this.handleChange}
                  />
                  <div className="col-sm-auto">
                    <Link
                      to="/client-new"
                      className="btn bg-gradient-success mr-2"
                    >
                      <i className="fas fa-file-alt"></i>
                      Create New Client
                    </Link>

                    <UploadDownloadClients
                      locations={locations}
                      clients={clients}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          {sortedClients.length > 0 ? (
            <div className="row d-flex align-items-stretch">
              {toggleView === "detail" ? (
                <>
                  {sortedClients.map((client) => (
                    <ConnectedClient
                      client={client}
                      key={client.id}
                      isAdmin={isAdmin}
                      requestDeleteClient={requestDeleteClient}
                      owner={owner}
                    />
                  ))}
                </>
              ) : (
                <>
                  <ClientTable clients={sortedClients} />
                </>
              )}
            </div>
          ) : (
            <AlertComponent type="warning" text="clients" />
          )}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isAdmin } = state.session;
  const owner = state.session.id;
  const { locations, isUploadingClients } = state;
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
  var dtoday = new Date();
  var fileName = "ClientList-" + moment(dtoday).format("MM-DD-YYYY") + ".csv";
  return {
    clients,
    isAdmin,
    locations,
    owner,
    fileName,
    isUploadingClients,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestDeleteClient(client, isAdmin, owner) {
      console.log(isAdmin);
      const $html = isAdmin
        ? "<b><i>All address(es), note(s) and meetings attached to this client will also be removed from the database.  Proceed?</i></b>"
        : "<b><i>All address(es), note(s) and meetings attached to this client will also be removed from the database.  Proceed?</i></b><br>      <span className='badge bg-warning text-dark'>Important NOTE: Delete request will be pending Admin approval.</span>";
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
        }
      });
    },
    getClients(isAdmin) {
      dispatch(getClients(isAdmin));
    },
  };
};
export const ConnectedClientsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsList);
