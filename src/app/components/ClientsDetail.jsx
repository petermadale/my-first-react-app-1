import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setClientName, deleteClient } from "../store/mutations";
import { history } from "../store/history";

const ClientsDetail = ({ id, client, setClientName, deleteClient }) => (
  <div className="container-fluid mt-5">
    <div className="row justify-content-center">
      <div className="col-4">
        <div className="card border-primary mb-3">
          <div className="card-header">
            <form onSubmit={setClientName}>
              <input
                className="form-control"
                type="text"
                name="clientname"
                defaultValue={client.name}
              />
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
          <div className="card-body text-secondary">
            <button
              className="btn btn-danger btn-sm btn-block mb-2"
              onClick={deleteClient}
            >
              Delete
            </button>
            <Link
              to="/clients"
              className="btn btn-primary btn-sm btn-block mb-2"
            >
              Back to Clients
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let client = state.clients.find((client) => client.id === id);
  return {
    id,
    client,
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    setClientName(e) {
      e.preventDefault();
      dispatch(setClientName(id, e.target[`clientname`].value));
    },
    deleteClient(e) {
      e.preventDefault();
      dispatch(deleteClient(id));
      history.push("/clients");
    },
  };
};

export const ConnectedClientsDetail = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(ClientsDetail);
