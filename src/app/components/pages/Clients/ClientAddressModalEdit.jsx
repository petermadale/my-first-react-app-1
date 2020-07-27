import React, { Component } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import $ from "jquery";
import { ConnectedInputForm } from "../../../scripts/inputForm";
import {
  createClientContactDetails,
  updateClientContactDetails,
  deleteClientContactDetails,
} from "../../../store/mutations";
import { Swal_alert } from "../../../scripts/sweetalert";
import uuid from "uuid";

class ClientAddressModalEdit extends Component {
  constructor(props) {
    super();

    this.state = {
      clientID: props.clientID,
      selectedContactDetails: null,
      isNew: false,
    };
  }

  onClick = (contact, isNew) => {
    const selectedContactDetails = {
      id: null,
      client: this.state.clientID,
      address1: null,
      address2: null,
      workEmail: null,
      alternateEmail: null,
      city: null,
      state: null,
      zip: null,
      officePhoneNumber: null,
      officePhoneNumberExt: null,
      cellPhoneNumber: null,
      alternativePhoneNumber: null,
      faxNumber: null,
    };
    this.setState({
      selectedContactDetails: !isNew ? contact : selectedContactDetails,
      isNew,
    });
  };

  onCancel = () => {
    this.setState({
      selectedContactDetails: null,
      isNew: false,
    });
  };

  render() {
    const { selectedContactDetails, isNew } = this.state;
    const {
      updateClientContactDetails,
      clientContactDetails,
      deleteClientContactDetails,
    } = this.props;
    return (
      <>
        <div className="card-body table-responsive p-0">
          <table className="table table table-hover text-nowrap">
            <thead>
              <tr>
                <th style={{ width: "2%" }}>#</th>
                <th style={{ width: "20%" }}>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Office Phone # (ext)</th>
                <th>Cell Phone #</th>
                <th>Alt Phone #</th>
                <th>Fax #</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {clientContactDetails.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{index + 1}.</td>
                  <td>
                    {contact.address1} {contact.address2}
                  </td>
                  <td>{contact.city}</td>
                  <td>{contact.state}</td>
                  <td>{contact.zip}</td>
                  <td>
                    {contact.officePhoneNumber}{" "}
                    {contact.officePhoneNumberExt ? (
                      <>({contact.officePhoneNumberExt})</>
                    ) : null}
                  </td>
                  <td>{contact.cellPhoneNumber}</td>
                  <td>{contact.alternativePhoneNumber}</td>
                  <td>{contact.faxNumber}</td>
                  <td className="text-right">
                    <button
                      type="button"
                      className="btn btn-sm bg-gradient-success mr-2"
                      data-toggle="modal"
                      data-target="#modal-edit-address"
                      onClick={() => this.onClick(contact, false)}
                    >
                      <i className="fas fa-pencil-alt"></i> Edit
                    </button>

                    <button
                      className="btn btn-sm bg-gradient-danger"
                      onClick={() =>
                        deleteClientContactDetails(contact.id, contact.client)
                      }
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="modal fade" id="modal-edit-address">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                {selectedContactDetails || isNew ? (
                  <form onSubmit={updateClientContactDetails}>
                    <div className="modal-header card-client-primary card-outline card-client">
                      <h4 className="modal-title">
                        {isNew ? <>New</> : <>Edit</>} Address
                      </h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={this.onCancel}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="card-body text-left">
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          defaultValue={selectedContactDetails.id}
                        />
                        <input
                          type="hidden"
                          name="client"
                          id="client"
                          defaultValue={selectedContactDetails.client}
                        />
                        <div className="form-group">
                          <ConnectedInputForm
                            label="Address 1"
                            type="text"
                            nameid="address1"
                            required
                            defaultValue={selectedContactDetails.address1}
                          />
                        </div>
                        <div className="form-group">
                          <ConnectedInputForm
                            label="Address 2"
                            type="text"
                            nameid="address2"
                            defaultValue={selectedContactDetails.address2}
                          />
                        </div>
                        <div className="form-row mb-3">
                          <div className="col-sm-6 col-12">
                            <ConnectedInputForm
                              label="Work Email"
                              type="email"
                              nameid="workEmail"
                              placeholder="email@gmail.com"
                              defaultValue={selectedContactDetails.workEmail}
                            />
                          </div>
                          <div className="col-sm-6 col-12">
                            <ConnectedInputForm
                              label="Aleternate Email"
                              type="email"
                              nameid="alternateEmail"
                              placeholder="email@gmail.com"
                              defaultValue={
                                selectedContactDetails.alternateEmail
                              }
                            />
                          </div>
                        </div>
                        <div className="form-row mb-3">
                          <div className="col-sm-6 col-12">
                            <ConnectedInputForm
                              label="City"
                              type="text"
                              nameid="city"
                              defaultValue={selectedContactDetails.city}
                            />
                          </div>
                          <div className="col-sm-3 col-12">
                            <ConnectedInputForm
                              label="State"
                              type="text"
                              nameid="state"
                              defaultValue={selectedContactDetails.state}
                            />
                          </div>
                          <div className="col-sm-3 col-12">
                            <ConnectedInputForm
                              label="Zip"
                              type="text"
                              nameid="zip"
                              defaultValue={selectedContactDetails.zip}
                            />
                          </div>
                        </div>
                        <div className="form-row mb-3">
                          <div className="col-sm-6 col-12">
                            <label htmlFor="officePhoneNumber">
                              Office Phone Number
                            </label>
                            <NumberFormat
                              format="###-###-####"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              mask="_"
                              placeholder="555-555-5555"
                              title="e.g. 555-555-5555"
                              name="officePhoneNumber"
                              id="officePhoneNumber"
                              className="form-control"
                              defaultValue={
                                selectedContactDetails.officePhoneNumber
                              }
                            />
                          </div>
                          <div className="col-sm-6 col-12">
                            <ConnectedInputForm
                              label="Extension Number"
                              type="number"
                              nameid="officePhoneNumberExt"
                              defaultValue={
                                selectedContactDetails.officePhoneNumberExt
                              }
                            />
                          </div>
                        </div>

                        <div className="form-row mb-3">
                          <div className="col-sm-4 col-12">
                            <label htmlFor="cellPhoneNumber">
                              Cell Phone Number
                            </label>
                            <NumberFormat
                              format="###-###-####"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              mask="_"
                              placeholder="555-555-5555"
                              title="e.g. 555-555-5555"
                              name="cellPhoneNumber"
                              id="cellPhoneNumber"
                              className="form-control"
                              defaultValue={
                                selectedContactDetails.cellPhoneNumber
                              }
                            />
                          </div>
                          <div className="col-sm-4 col-12">
                            <label htmlFor="alternativePhoneNumber">
                              Alternative Phone Number
                            </label>
                            <NumberFormat
                              format="###-###-####"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              mask="_"
                              placeholder="555-555-5555"
                              title="e.g. 555-555-5555"
                              name="alternativePhoneNumber"
                              id="alternativePhoneNumber"
                              className="form-control"
                              defaultValue={
                                selectedContactDetails.alternativePhoneNumber
                              }
                            />
                          </div>
                          <div className="col-sm-4 col-12">
                            <label htmlFor="faxNumber">Fax Number</label>

                            <NumberFormat
                              format="###-###-####"
                              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                              mask="_"
                              placeholder="555-555-5555"
                              title="e.g. 555-555-5555"
                              name="faxNumber"
                              id="faxNumber"
                              className="form-control"
                              defaultValue={selectedContactDetails.faxNumber}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn bg-gradient-success">
                        <i className="fas fa-save"></i>{" "}
                        {isNew ? <>Save</> : <>Update</>}
                      </button>
                      <button
                        type="button"
                        className="btn bg-gradient-danger"
                        data-dismiss="modal"
                        onClick={this.onCancel}
                      >
                        <i className="fas fa-times-circle"></i> Cancel
                      </button>
                    </div>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-right">
          <button
            type="button"
            className="btn bg-gradient-info mr-2"
            data-toggle="modal"
            data-target="#modal-edit-address"
            onClick={() => this.onClick(null, true)}
          >
            <i className="fa fa-map-marker-alt"></i> Add Another Address
          </button>

          <Link to="/clients" className="btn bg-gradient-secondary">
            <i className="fa fa-angle-double-left"></i> Back to Clients
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateClientContactDetails(e) {
      e.preventDefault();
      const form = e.target;
      const id = form[`id`].value;
      const isNew = id !== "" ? false : true;
      const clientContactID = isNew ? uuid() : id;

      const clientContact = {
        id: clientContactID,
        client: form[`client`].value,
        address1: form[`address1`].value,
        address2: form[`address2`].value,
        workEmail: form[`workEmail`].value,
        alternateEmail: form[`alternateEmail`].value,
        city: form[`city`].value,
        state: form[`state`].value,
        zip: form[`zip`].value,
        officePhoneNumber: form[`officePhoneNumber`].value,
        officePhoneNumberExt: form[`officePhoneNumberExt`].value,
        cellPhoneNumber: form[`cellPhoneNumber`].value,
        alternativePhoneNumber: form[`alternativePhoneNumber`].value,
        faxNumber: form[`faxNumber`].value,
      };
      if (isNew) dispatch(createClientContactDetails(clientContact));
      else dispatch(updateClientContactDetails(clientContact));

      $("#modal-edit-address").modal("hide");
    },
    deleteClientContactDetails(id, client) {
      const clientAddressLength = ownProps.clientContactDetails.length;
      if (clientAddressLength === 1) {
        Swal_alert.fire({
          title: "Cannot delete address.",
          icon: "warning",
          text: "Client must have at least one address.",
        });
      } else {
        Swal_alert.fire({
          title: "Are you sure you want to delete this address?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.value) {
            dispatch(deleteClientContactDetails(id, client));
          }
        });
      }
    },
  };
};
export const ConnectedClientAddressModalEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientAddressModalEdit);
