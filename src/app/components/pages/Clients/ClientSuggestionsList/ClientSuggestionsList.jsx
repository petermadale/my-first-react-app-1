import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ClientSuggestionsList.module.css";
import { connect } from "react-redux";
import { history } from "../../../../store/history";
import { Link } from "react-router-dom";
import { ConnectedClientNameDisplay } from "../../../ClientNameDisplay";
import { ConnectedUsernameDisplay } from "../../../UsernameDisplay";
import { ConnectedInputForm } from "../../../../scripts/inputForm";
import NumberFormat from "react-number-format";
import $ from "jquery";
import { Swal_alert } from "../../../../scripts/sweetalert";
import {
  approveAddressSuggestion,
  rejectAddressSuggestion,
} from "../../../../store/mutations";
import uuid from "uuid";

class ClientSuggestionsList extends Component {
  constructor(props) {
    super();

    this.state = {
      selectedAddressSuggestion: null,
    };
  }

  onClick = (selectedAddressSuggestion) => {
    this.setState({
      selectedAddressSuggestion,
    });
  };
  render() {
    const { selectedAddressSuggestion } = this.state;
    const {
      clientContactDetailsSuggestions,
      isAdmin,
      pathname,
      onApproveAddressSuggestion,
      rejectAddressSuggestion,
      cancelAddressSuggestion,
      userid
    } = this.props;
    return (
      <div className="card-body table-responsive p-0">
        <table className="table table table-hover text-nowrap">
          <thead>
            <tr>
              <th style={{ width: "2%" }}></th>
              <th>Client</th>
              <th style={{ width: "20%" }}>Address</th>
              <th>Office Phone # (ext)</th>
              <th>Cell Phone #</th>
              {pathname === "/dashboard" ? (
                <>
                  {isAdmin ? <th>Suggested By</th> : <th>Status</th>}
                  <th>&nbsp;</th>
                </>
              ) : (
                <>
                  {isAdmin ? (
                    <>
                      <th>Suggested By</th>
                    </>
                  ) : (
                    <th>&nbsp;</th>
                  )}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {clientContactDetailsSuggestions.map((contact, index) => (
              <tr key={contact.id}>
                <td>{index + 1}.</td>
                <td><ConnectedClientNameDisplay id={contact.client} /></td>
                <td>                
                    {contact.address1}
                    {contact.city ? <>, {contact.city}</>  : null}
                    {contact.state ? <>, {contact.state}</>  : null}
                    {contact.zip ? <>, {contact.zip}</>  : null}
                </td>
                <td>
                  {contact.officePhoneNumber}{" "}
                  {contact.officePhoneNumberExt ? (
                    <>({contact.officePhoneNumberExt})</>
                  ) : null}
                </td>
                <td>{contact.cellPhoneNumber}</td>

                {pathname === "/dashboard" ? (
                  <>
                    <td>
                      {isAdmin ? (
                        <ConnectedUsernameDisplay id={contact.userid} />
                      ) : (
                        <span className="badge badge-success">Pending</span>
                      )}
                    </td>
                    <td>
                      <Link
                        className="btn bg-gradient-cyan btn-sm mr-1"
                        to={`/client/${contact.client}/true`}
                        target="_blank"
                      >
                        <i className="fas fa-comment-dots mr-0"></i>{" "}
                        View Suggestion
                      </Link>
                    </td>
                  </>
                ) : (
                  <>
                    {isAdmin ? (
                      <>
                        <td>
                          <ConnectedUsernameDisplay id={contact.userid} />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm bg-gradient-cyan mr-2"
                            data-toggle="modal"
                            data-target="#modal-view-suggestion"
                            onClick={() => this.onClick(contact)}
                          >
                            <i className="fas fa-comment-dots"></i> View
                            Suggestion
                          </button>
                        </td>
                      </>
                    ) : (
                        <td>
                        {contact.userid === userid ? 
                            <button
                              type="button"
                              className="btn btn-sm bg-gradient-danger mr-2"
                              onClick={() =>
                                cancelAddressSuggestion(
                                    contact.id,
                                    contact.client
                                )
                              }
                            >
                              <i className="fas fa-ban"></i> Cancel Suggestion
                            </button>
                           : null}
                        </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal fade" id="modal-view-suggestion">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header card-cyan card-outline card-client">
                <h4 className="modal-title">Address Suggestion</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {selectedAddressSuggestion ? (
                  <form onSubmit={onApproveAddressSuggestion}>
                    <div className="card-body text-left">
                      <input
                        type="hidden"
                        name="id"
                        id="id"
                        defaultValue={selectedAddressSuggestion.id}
                      />
                      <input
                        type="hidden"
                        name="client"
                        id="client"
                        defaultValue={selectedAddressSuggestion.client}
                      />
                      <div className="form-group">
                        <ConnectedInputForm
                          label="Address 1"
                          type="text"
                          nameid="address1"
                          required
                          defaultValue={selectedAddressSuggestion.address1}
                        />
                      </div>
                      <div className="form-group">
                        <ConnectedInputForm
                          label="Address 2"
                          type="text"
                          nameid="address2"
                          defaultValue={selectedAddressSuggestion.address2}
                        />
                      </div>
                      <div className="form-row mb-3">
                        <div className="col-sm-6 col-12">
                          <ConnectedInputForm
                            label="Work Email"
                            type="email"
                            nameid="workEmail"
                            placeholder="email@gmail.com"
                            defaultValue={selectedAddressSuggestion.workEmail}
                          />
                        </div>
                        <div className="col-sm-6 col-12">
                          <ConnectedInputForm
                            label="Aleternate Email"
                            type="email"
                            nameid="alternateEmail"
                            placeholder="email@gmail.com"
                            defaultValue={
                              selectedAddressSuggestion.alternateEmail
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
                            defaultValue={selectedAddressSuggestion.city}
                          />
                        </div>
                        <div className="col-sm-3 col-12">
                          <ConnectedInputForm
                            label="State"
                            type="text"
                            nameid="state"
                            defaultValue={selectedAddressSuggestion.state}
                          />
                        </div>
                        <div className="col-sm-3 col-12">
                          <ConnectedInputForm
                            label="Zip"
                            type="text"
                            nameid="zip"
                            defaultValue={selectedAddressSuggestion.zip}
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
                              selectedAddressSuggestion.officePhoneNumber
                            }
                          />
                        </div>
                        <div className="col-sm-6 col-12">
                          <ConnectedInputForm
                            label="Extension Number"
                            type="number"
                            nameid="officePhoneNumberExt"
                            defaultValue={
                              selectedAddressSuggestion.officePhoneNumberExt
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
                              selectedAddressSuggestion.cellPhoneNumber
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
                              selectedAddressSuggestion.alternativePhoneNumber
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
                            defaultValue={selectedAddressSuggestion.faxNumber}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-12">
                          <div className="text-right mt-3">
                            <button
                              type="submit"
                              className="btn bg-gradient-success mr-2"
                            >
                              <i className="fas fa-thumbs-up"></i>
                              Approve
                            </button>
                            <button
                              type="button"
                              className="btn bg-gradient-danger"
                              onClick={() =>
                                rejectAddressSuggestion(
                                  selectedAddressSuggestion.id,
                                  selectedAddressSuggestion.client
                                )
                              }
                            >
                              <i className="fas fa-thumbs-down"></i> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isAdmin } = state.session;
  const {clientContactDetailsSuggestions, userid} =
    ownProps;
  const pathname = history.location.pathname;
  return {
    pathname,
    isAdmin,
    clientContactDetailsSuggestions,
    userid
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => {
  return {
    onApproveAddressSuggestion(e) {
      e.preventDefault();
      const form = e.target;
      const newID = uuid();
      const clientContactDetailsSuggestions = {
        newID,
        id: form[`id`].value,
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
      $("#modal-view-suggestion").modal("hide");
      dispatch(approveAddressSuggestion(clientContactDetailsSuggestions));
    },
    rejectAddressSuggestion(id, clientID) {
      Swal_alert.fire({
        title: "Are you sure you want to reject this suggestion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.value) {
          $("#modal-view-suggestion").modal("hide");
          dispatch(rejectAddressSuggestion(id, clientID));
        }
      });
    },
    cancelAddressSuggestion(id, clientID) {
        Swal_alert.fire({
          title: "Are you sure you want to cancel this suggestion?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!",
        }).then((result) => {
          if (result.value) {
            $("#modal-view-suggestion").modal("hide");
            dispatch(rejectAddressSuggestion(id, clientID));            
          }
        });
    }
  };
};

export const ConnectedClientSuggestionList = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(ClientSuggestionsList);
