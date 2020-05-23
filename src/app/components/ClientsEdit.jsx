import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateClient } from "../store/mutations";
import { ConnectedClientNameInput } from "./ClientNameInput";
import { Toast } from "../store/sweetalert";

export const ClientsEdit = ({ client, users, updateClient, isEdit }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Edit {client.name}</h3>
          </div>
          <div className="card-body">
            <form onSubmit={updateClient}>
              <ConnectedClientNameInput
                name={client.name}
                id={client.id}
                isEdit={isEdit}
              />
              {/* <div className="form-group">
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
              </div> */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="email@gmail.com"
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
                  placeholder="555-555-5555"
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
              <div className="form-group">
                <label htmlFor="owner">Owner</label>
                <select
                  name="owner"
                  id="owner"
                  className="form-control"
                  defaultValue={client.owner}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
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
  const client = ownProps.client;
  const users = state.users;
  const isEdit = true;
  return {
    client,
    users,
    isEdit,
  };
};

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    updateClient(e) {
      e.preventDefault();
      const form = e.target;
      const { id } = ownProps.client;
      const isduplicate = form[`name`].dataset.isduplicate;
      if (isduplicate === "true") {
        Toast.fire({
          icon: "warning",
          title: "Name is already taken. Please choose another one.",
        });
      } else {
        const data = {
          id: id,
          owner: form[`owner`].value,
          name: form[`name`].value,
          email: form[`email`].value,
          address: form[`address`].value,
          phone: form[`phone`].value,
          ext: form[`ext`].value,
          cell: form[`cell`].value,
          fax: form[`fax`].value,
          // isFavorite: isFavorite,
        };
        dispatch(updateClient(id, data));
      }
    },
  };
};

export const ConnectedClientsEdit = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsEdit);
