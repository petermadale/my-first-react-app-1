import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "uuid";
import { createNewClient } from "../store/mutations";

export const ClientsNew = ({
  id,
  createNewClient,
  verifyClientDuplicate,
  isDuplicate,
}) => (
  <>
    <form onSubmit={createNewClient}>
      <input type="hidden" name="owner" value={id} />
      <div className="form-group">
        <label htmlFor="name">Client Name</label>
        <input
          type="text"
          placeholder="Client Name"
          name="name"
          id="name"
          className="form-control"
          onChange={verifyClientDuplicate}
          required
        />
        {isDuplicate ? <p>Duplicate</p> : null}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          className="form-control"
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
        />
      </div>
      <button type="submit" className="btn btn-success mr-2">
        Save
      </button>
      <button
        className="btn btn-danger"
        data-widget="control-sidebar"
        data-slide="true"
        href="#"
        role="button"
      >
        Cancel
      </button>
    </form>
  </>
);

var clients = {};

const mapStatetoProps = (state, ownProps) => {
  let id = state.session.id;
  clients = state.clients;
  return {
    id,
  };
};

const mapDispatchtoProps = (dispatch, ownProps) => {
  let isDuplicate = false;
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
    verifyClientDuplicate(e) {
      const name = e.target.value;
      var duplicate = clients.findIndex((client) => client.name === name);
      isDuplicate = duplicate !== -1 ? true : false;
    },
  };
};

export const ConnectedClientsNew = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsNew);
