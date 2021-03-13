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
            owner: props.owner
        }
    }
    
  handleChange = (event) => {
      const {value} = event.target;
      const {clients} = this.state;
      let newSortedClients = [];
    this.setState({selectedLocation: value})
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
        const {locations, selectedLocation, sortedClients, clients, isAdmin, requestDeleteClient, owner, getClients} = this.state;

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
                                className="btn bg-gradient-success float-right"
                            >
                                <i className="fas fa-file-alt"></i>
                                Create New Client
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
              </div>
            </section>
        
            <section className="content">
              <div className="card card-solid">
                <div className="card-body p-0">
                  {sortedClients.length > 0 ? (
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
                  )}
                </div>
              </div>
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
    return {
      clients,
      isAdmin,
      locations,
      owner
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      requestDeleteClient(client, isAdmin, owner) {
        console.log(isAdmin);
        const $html = isAdmin ? "<b><i>All address(es) attached to this client will also be removed from the database.</i></b>" : "<b><i>All address(es) attached to this client will also be removed from the database.</i></b><br>      <span class='badge bg-warning text-dark'>Important NOTE: Delete request will be pending Admin approval.</span>";
        Swal_alert.fire({
          title: "Are you sure?",
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
