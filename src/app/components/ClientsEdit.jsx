import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateClient } from "../store/mutations";

export const ClientsEdit = ({ client, updateClient }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Edit {client.name}</h3>
          </div>
          <div className="card-body">
            <form onSubmit={updateClient}>
              <input type="hidden" name="id" value={client.id} disabled />
              <input type="hidden" name="owner" value={client.owner} disabled />
              <div className="form-group">
                <label htmlFor="name">Client Name</label>
                <input
                  type="text"
                  placeholder="Client Name"
                  name="name"
                  id="name"
                  className="form-control"
                  defaultValue={client.name}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                  className="form-control"
                  defaultValue={client.email}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  id="address"
                  className="form-control"
                  defaultValue={client.address}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  id="phone"
                  className="form-control"
                  defaultValue={client.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ext">Ext</label>
                <input
                  type="text"
                  placeholder="Ext"
                  name="ext"
                  id="ext"
                  className="form-control"
                  defaultValue={client.ext}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cell">Cell Phone</label>
                <input
                  type="text"
                  placeholder="Cell Phone"
                  name="cell"
                  id="cell"
                  className="form-control"
                  defaultValue={client.cell}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fax">Fax</label>
                <input
                  type="text"
                  placeholder="Fax"
                  name="fax"
                  id="fax"
                  className="form-control"
                  defaultValue={client.fax}
                />
              </div>
              <button type="submit" className="btn btn-success mr-2">
                Save
              </button>
              <Link to="/clients" className="btn btn-danger">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
);

const mapStatetoProps = (state, ownProps) => {
  let client = ownProps.client;
  return {
    client,
  };
};

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    updateClient(e) {
      e.preventDefault();
      const form = e.target;
      const clientID = form[`id`].value;
      const owner = form[`owner`].value;
      const data = {
        name: form[`name`].value,
        email: form[`email`].value,
        address: form[`address`].value,
        phone: form[`phone`].value,
        ext: form[`ext`].value,
        cell: form[`cell`].value,
        fax: form[`fax`].value,
      };

      console.log(data);
      dispatch(updateClient(clientID, owner, data));
    },
  };
};

export const ConnectedClientsEdit = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsEdit);
