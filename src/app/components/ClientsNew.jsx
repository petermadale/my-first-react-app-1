import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "uuid";
import { createNewClient } from "../store/mutations";

export const ClientsNew = ({ id, createNewClient }) => (
  <div className="container-fluid mt-5">
    <div className="row justify-content-center">
      <div className="col-4">
        <div className="card border-primary mb-3">
          <div className="card-header">Add New</div>
          <div className="card-body text-secondary">
            <form onSubmit={createNewClient}>
              <div className="form-group">
                <input type="hidden" name="owner" value={id} />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="ext"
                  placeholder="Ext"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="cell"
                  placeholder="Cell Phone"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="fax"
                  placeholder="Fax"
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="btn btn-success btn-sm btn-block mb-2"
              >
                Save
              </button>
            </form>

            <Link
              to="/dashboard"
              className="btn btn-primary btn-sm btn-block mb-2"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStatetoProps = (state) => {
  let id = state.session.id;
  return {
    id,
  };
};

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    createNewClient(e) {
      e.preventDefault();
      const clientID = uuid();
      const form = e.target;
      const data = {
        id: clientID,
        owner: form[`owner`].value,
        name: form[`name`].value,
        email: form[`email`].value,
        address: form[`address`].value,
        phone: form[`phone`].value,
        ext: form[`ext`].value,
        cell: form[`cell`].value,
        fax: form[`fax`].value,
      };

      console.log(data);
      dispatch(createNewClient(data));
    },
  };
};

export const ConnectedClientsNew = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsNew);
