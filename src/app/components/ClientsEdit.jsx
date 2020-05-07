import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createNewClient } from "../store/mutations";

export const ClientsEdit = ({ client, createNewClient }) => (
  <>
    <form>
      <input type="hidden" name="owner" value={client.id} />
      <div class="form-group">
        <label htmlFor="name">Client Name</label>
        <input
          type="text"
          placeholder="Client Name"
          name="name"
          id="name"
          className="form-control"
          value={client.name}
          required
        />
      </div>
      <div class="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          className="form-control"
          value={client.email}
        />
      </div>
      <div class="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          placeholder="Address"
          name="address"
          id="address"
          className="form-control"
          value={client.address}
        />
      </div>
      <div class="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          id="phone"
          className="form-control"
          value={client.phone}
        />
      </div>
      <div class="form-group">
        <label htmlFor="ext">Ext</label>
        <input
          type="text"
          placeholder="Ext"
          name="ext"
          id="ext"
          className="form-control"
          value={client.ext}
        />
      </div>
      <div class="form-group">
        <label htmlFor="cell">Cell Phone</label>
        <input
          type="text"
          placeholder="Cell Phone"
          name="cell"
          id="cell"
          className="form-control"
          value={client.cell}
        />
      </div>
      <div class="form-group">
        <label htmlFor="fax">Fax</label>
        <input
          type="text"
          placeholder="Fax"
          name="fax"
          id="fax"
          className="form-control"
          value={client.fax}
        />
      </div>
    </form>
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

export const ConnectedClientsEdit = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsEdit);
