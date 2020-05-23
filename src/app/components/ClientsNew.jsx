import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "uuid";
import { createNewClient } from "../store/mutations";
import { ConnectedClientNameInput } from "./ClientNameInput";
import { Toast } from "../store/sweetalert";

export const ClientsNew = ({ id, users, createNewClient }) => (
  <>
    <form onSubmit={createNewClient} id="newClient">
      {/* <input type="hidden" name="owner" value={id} /> */}
      <ConnectedClientNameInput />
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="email@gmail.com"
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
          placeholder="555-555-5555"
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
      <div className="form-group">
        <label htmlFor="owner">Owner</label>
        <select
          name="owner"
          id="owner"
          className="form-control"
          defaultValue={id}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      {/* <button
        type="submit"
        className={`btn btn-success mr-2 ${isDuplicate ? "disabled" : ""}`}
        disabled={`${isDuplicate ? "disabled" : ""}`}
      > */}
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

const mapStatetoProps = (state, ownProps) => {
  let id = state.session.id;
  let { clients, users } = state;
  return {
    id,
    clients,
    users,
  };
};

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    createNewClient(e) {
      e.preventDefault();
      const clientID = uuid();
      const form = e.target;
      const isduplicate = form[`name`].dataset.isduplicate;
      if (isduplicate === "true") {
        Toast.fire({
          icon: "warning",
          title: "Name is already taken. Please choose another one.",
        });
      } else {
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
        dispatch(createNewClient(data));
      }
    },
  };
};

export const ConnectedClientsNew = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsNew);
