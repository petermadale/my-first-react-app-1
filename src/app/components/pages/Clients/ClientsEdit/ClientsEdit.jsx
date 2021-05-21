import React from "react";
import PropTypes from "prop-types";
import styles from "./ClientsEdit.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select2 from "../../../../scripts/select2";
import { updateClient, verifyClient, requestDeleteClient, requestRejectDeleteClientRequest, requestCancelDeleteClientRequest } from "../../../../store/mutations";
import { ConnectedClientNameInput } from "../ClientNameInput/ClientNameInput";
import { Toast, Swal_alert } from "../../../../scripts/sweetalert";
import { ConnectedClientsAddressEdit } from "../ClientsAddressEdit/ClientsAddressEdit";
import { ConnectedClientSuggestionList } from "../ClientSuggestionsList/ClientSuggestionsList";
import { clientDataSets } from "../../../../../server/clientDataSets";
import { ConnectedInputForm } from "../../../../scripts/inputForm";
import moment from 'moment';
import { lastContactMethod } from "../../../../scripts/lastContactMethod";
import NumberFormat from "react-number-format";

export const ClientsEdit = ({
  userid,
  client,
  clients,
  users,
  locations,
  updateClient,
  verifyClient,
  requestDeleteClient,
  rejectDeleteClientRequest,
  cancelDeleteClientRequest,
  isEdit,
  isAdmin,
  typeOfOrganization,
  populationsServed,
  typesOfServices,
  specialties,
  groupsOffered,
  insuranceAccepted,
  serviceDeliveryMethod
}) => (
  <>
    <div className="row">
      <div className="col-md-12">
      <form onSubmit={updateClient}>
            <div className="card card-client-primary collapsed-card">
              <div className="card-header">
                <button
                  type="button"
                  className="btn btn-tool p-0"
                  data-card-widget="collapse"
                >
                  <h3 className="card-title text-white">
                    <i className="fas fa-angle-down"></i> 1. Edit {client.name}
                  </h3>
                </button>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
              <input
                    type="hidden"
                    id="userid"
                    name="userid"
                    defaultValue={userid}
                  />
                <ConnectedClientNameInput
                  name={client.name}
                  id={client.id}
                  isEdit={isEdit}
                  postNominalLetters={client.postNominalLetters}
                />
                <div className="form-row mb-3">
                  <div className="col-sm-4 col-12">
                    <ConnectedInputForm
                      label="Email"
                      required
                      type="email"
                      placeholder="email@web.com"
                      nameid="email"
                      defaultValue={client.email}
                    />
                  </div>
                  <div className="col-sm-4 col-12">
                    <label htmlFor="contactNumber">
                      Contact Number
                    </label>
                    <NumberFormat
                      format="###-###-####"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      mask="_"
                      placeholder="555-555-5555"
                      title="e.g. 555-555-5555"
                      name="contactNumber"
                      id="contactNumber"
                      className="form-control"
                      defaultValue={client.contactNumber}
                    />
                  </div>
                  <div className="col-sm-4 col-12">
                    <ConnectedInputForm
                      label="Website"
                      type="url"
                      placeholder="https://example.com"
                      nameid="website"
                      pattern="https://.*"
                      defaultValue={client.website}
                    />
                  </div>
                </div>
                <div className="form-row mb-3">
                  <div className="col-sm-6 col-12">
                    <ConnectedInputForm
                      label="Name of Organization"
                      type="text"
                      nameid="nameOfOrg"
                      defaultValue={client.nameOfOrg}
                    />
                  </div>
                  <div className="col-sm-6 col-12">
                    <ConnectedInputForm
                      label="Title (Position with organization)"
                      type="text"
                      placeholder="Title"
                      nameid="titleWithOrg"
                      defaultValue={client.titleWithOrg}
                    />
                  </div>
                </div>
                <div className="form-row mb-3">
                  <div className="col-sm-4 col-12">
                    <ConnectedInputForm
                      label="License Number"
                      type="text"
                      nameid="licenseNumber"
                      defaultValue={client.licenseNumber}
                    />
                  </div>
                  <div className="col-sm-4 col-12">
                    <ConnectedInputForm
                      label="License Expiry Date"
                      type="date"
                      nameid="licenseExpiryDate"
                      defaultValue={client.licenseExpiryDate}
                    />
                  </div>
                  <div className="col-sm-4 col-12">
                    <ConnectedInputForm
                      label="Date the License was last verified"
                      type="date"
                      nameid="licenseLastVerifiedDate"
                      defaultValue={client.licenseLastVerifiedDate}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <Select2
                    label="Assign Location(s)"
                    required
                    isMulti
                    isDisabled={isAdmin ? false : true}
                    options={locations.map((d) => {
                      return {
                        ...d,
                        value: d.location,
                        label: d.location,
                      };
                    })}
                    selected={client.assignedLocations.map((d) => {
                      return { value: d, label: d };
                    })}
                    name="assignedLocations"
                  />
                </div>
                <div className={`${!isAdmin ? "d-none" : ""} form-group`}>
                    <Select2
                        label="Assign User(s)"
                        required
                        isMulti
                        isDisabled={isAdmin ? false : true}
                        selected={client.users.map((d) => {
                        return { value: d, label: d };
                        })}
                        options={users.map((d) => {
                        return {
                            ...d,
                            value: d.firstName + " " + d.lastName,
                            label: d.firstName + " " + d.lastName,
                        };
                        })}
                        name="users"
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter notes"
                    name="notes"
                    id="notes"
                    defaultValue={client.notes}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="card card-client-primary collapsed-card">
              <div className="card-header">
                <button
                  type="button"
                  className="btn btn-tool p-0"
                  data-card-widget="collapse"
                >
                  <h3 className="card-title text-white">
                    <i className="fas fa-angle-down"></i> 2. Edit Client Additional
                    Information
                  </h3>
                </button>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <Select2
                    label="Type of Organization/Provider"
                    options={typeOfOrganization.map((d) => {
                      return { ...d, value: d.name, label: d.name };
                    })}
                    name="typeOfOrg"
                    selected={client.typeOfOrg}
                  />
                </div>
                <div className="form-group">
                  <Select2
                    label="Populations Served"
                    isMulti
                    options={populationsServed.map((d) => {
                      return { ...d, value: d.name, label: d.name };
                    })}
                    selected={
                      client.populationsServed
                        ? client.populationsServed.map((d) => {
                            return { value: d, label: d };
                          })
                        : ""
                    }
                    name="populationsServed"
                  />
                </div>
                <div className="form-group">
                  <Select2
                    label="Types of Services"
                    isMulti
                    options={typesOfServices.map((d) => {
                      return { ...d, value: d.name, label: d.name };
                    })}
                    selected={
                      client.typesOfServices
                        ? client.typesOfServices.map((d) => {
                            return { value: d, label: d };
                          })
                        : ""
                    }
                    name="typesOfServices"
                  />
                </div>
                <div className="form-group">
                  <Select2
                    label="Specialties"
                    isMulti
                    options={specialties.map((d) => {
                      return { ...d, value: d.name, label: d.name };
                    })}
                    selected={
                      client.specialties
                        ? client.specialties.map((d) => {
                            return { value: d, label: d };
                          })
                        : ""
                    }
                    name="specialties"
                    maximumSelectionLength={5}
                  />
                </div>
                <div className="form-group">
                  <Select2
                    label="Groups Offered"
                    isMulti
                    options={groupsOffered.map((d) => {
                      return { ...d, value: d.name, label: d.name };
                    })}
                    selected={
                      client.groupsOffered
                        ? client.groupsOffered.map((d) => {
                            return { value: d, label: d };
                          })
                        : null
                    }
                    name="groupsOffered"
                    maximumSelectionLength={5}
                  />
                </div>
                <div className="form-group">
                  <Select2
                    label="Insurance Accepted"
                    isMulti
                    options={insuranceAccepted.map((d) => {
                      return {
                        ...d,
                        value: d.name + " (" + d.network + ")",
                        label: d.name + " (" + d.network + ")",
                      };
                    })}
                    selected={
                      client.insuranceAccepted
                        ? client.insuranceAccepted.map((d) => {
                            return { value: d, label: d };
                          })
                        : null
                    }
                    name="insuranceAccepted"
                  />
                </div>
                <div className="form-group">
                <Select2
                    label="Service Delivery Method"
                    options={serviceDeliveryMethod.map((s) => {
                        return { ...s, value: s.name, label: s.name };
                    })}
                    selected={client.serviceDeliveryMethod}
                    name="serviceDeliveryMethod"
                />
                </div>
              </div>
            </div>
            
            <div className="mt-3 mb-3 ml-1 text-right client-edit-btn">
                <input type="hidden" id="isAdmin" name="isAdmin" checked={isAdmin} onChange={() => { return; }} />
                {!client.isVerified && isAdmin ? 
                    <button type="button" onClick={() => {verifyClient(client.id, client.lastUpdatedBy)}} className="btn bg-gradient-warning mr-2">
                        <i className="fas fa-user-check"></i> Verify
                    </button> : null
                }
                {isAdmin && client.clientsDeleteRequest && client.clientsDeleteRequest.length > 0 ? 
                    <button type="button" onClick={() => {rejectDeleteClientRequest(client.clientsDeleteRequest[0])}}  className="btn bg-gradient-warning mr-2">
                        <i className="fas fa-thumbs-down"></i> Reject Delete Request
                    </button>
                : null}
                {!isAdmin && client.clientsDeleteRequest && client.clientsDeleteRequest.length > 0 && client.clientsDeleteRequest[0].owner === userid ? 
                    <button type="button" onClick={() => {cancelDeleteClientRequest(client.clientsDeleteRequest[0])}}  className="btn bg-gradient-warning mr-2">
                        <i className="fas fa-times-circle"></i> Cancel Delete Request
                    </button>
                : null}
              {isAdmin || client.isVerified ? <button type="submit" className="btn bg-gradient-success mr-2">
                <i className="fas fa-save"></i> Update
              </button> : null}
              {isAdmin || client.isVerified ?
              <button type="button" className="btn bg-gradient-danger mr-2"
                    disabled={`${!isAdmin && client.clientsDeleteRequest && client.clientsDeleteRequest.length > 0 ? "disabled" : ""}`}
                    onClick={() => requestDeleteClient(client, isAdmin, userid)}>
                <i className="fas fa-trash"></i> Delete
              </button> : null}
              {/* <Link to="/clients" className="btn bg-gradient-danger">
                <i className="fas fa-times-circle"></i> Cancel
              </Link> */}
            </div>
          </form>
        
        <hr />
        {client.clientContactDetailsSuggestions &&
        client.clientContactDetailsSuggestions.length > 0 ? (
          <div className="card card-cyan">
            <div className="card-header">
              <h3 className="card-title">Client Address Suggestions:</h3>

              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus"></i>
                </button>
              </div>
            </div>
            <ConnectedClientSuggestionList
              clientContactDetailsSuggestions={
                client.clientContactDetailsSuggestions
              }
              userid={userid}
            />
          </div>
        ) : null}
        <div className="card card-client-primary">
          <div className="card-header">
              <button
                type="button"
                className="btn btn-tool p-0"
                data-card-widget="collapse"
              >
                <h3 className="card-title text-white">3. Client Address:</h3>
              </button>

            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
              >
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
          {client.clientContactDetails.length > 0 ? (
            <ConnectedClientsAddressEdit
              clientContactDetails={client.clientContactDetails}
              clientID={client.id}
              isAdmin={isAdmin}
              userid={userid}
            />
          ) : 
            <div className="card-body">
              <span className="badge badge-success">{client.clientAddressOption}</span>
            </div>
          }
        </div>
      </div>
    </div>
  </>
);

const mapStatetoProps = (state, ownProps) => {
  const client = ownProps.client;
  let { clients, users, locations } = state;
  const { id, isAdmin } = state.session;
  const userid = id;
  const isEdit = true;
  const {
    typeOfOrganization,
    populationsServed,
    typesOfServices,
    specialties,
    groupsOffered,
    insuranceAccepted,
    serviceDeliveryMethod
  } = clientDataSets;
  return {
    userid,
    client,
    clients,
    users,
    locations,
    isEdit,
    isAdmin,
    typeOfOrganization,
    populationsServed,
    typesOfServices,
    specialties,
    groupsOffered,
    insuranceAccepted,
    serviceDeliveryMethod
  };
};

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    updateClient(e) {
      e.preventDefault();
      const form = e.target;
      const isAdmin = form[`isAdmin`].checked;
      const isVerified = form[`isAdmin`].checked ? true : false;

      const { id } = ownProps.client;
      const isduplicate = form[`name`].dataset.isduplicate;
      const owner = form[`userid`];
      if (isduplicate === "true") {
        Toast.fire({
          icon: "warning",
          title: "Name is already taken. Please choose another one.",
        });
      } else {
        var assignedLocationsArr = form[`assignedLocations`].value;
        assignedLocationsArr = assignedLocationsArr.split(",");

        var populationsServedArr = form[`populationsServed`].value;
        populationsServedArr =
          populationsServedArr !== "" ? populationsServedArr.split(",") : null;

        var typesOfServicesArr = form[`typesOfServices`].value;
        typesOfServicesArr =
          typesOfServicesArr !== "" ? typesOfServicesArr.split(",") : null;

        var specialtiesArr = form[`specialties`].value;
        specialtiesArr =
          specialtiesArr !== "" ? specialtiesArr.split(",") : null;

        var groupsOfferedArr = form[`groupsOffered`].value;
        groupsOfferedArr =
          groupsOfferedArr !== "" ? groupsOfferedArr.split(",") : null;

        var insuranceAcceptedArr = form[`insuranceAccepted`].value;
        insuranceAcceptedArr =
          insuranceAcceptedArr !== "" ? insuranceAcceptedArr.split(",") : null;

        var serviceDeliveryMethodArr = form[`serviceDeliveryMethod`].value;
        serviceDeliveryMethodArr =
        serviceDeliveryMethodArr !== "" ? serviceDeliveryMethodArr.split(",") : null;

        var usersArr = form[`users`].value;
        usersArr = usersArr.split(",");
        const clientData = {
          id,
          name: form[`name`].value,
          //owner: owner.value,
          email: form[`email`].value,
          contactNumber: form[`contactNumber`].value,
          website: form[`website`].value,
          postNominalLetters: form[`postNominalLetters`].value,
          nameOfOrg: form[`nameOfOrg`].value,
          titleWithOrg: form[`titleWithOrg`].value,
          licenseNumber: form[`licenseNumber`].value,
          licenseExpiryDate: form[`licenseExpiryDate`].value,
          licenseLastVerifiedDate: form[`licenseLastVerifiedDate`].value,
          typeOfOrg: form[`typeOfOrg`].value,
          populationsServed: populationsServedArr,
          typesOfServices: typesOfServicesArr,
          specialties: specialtiesArr,
          groupsOffered: groupsOfferedArr,
          insuranceAccepted: insuranceAcceptedArr,
          serviceDeliveryMethod: serviceDeliveryMethodArr,
          assignedLocations: assignedLocationsArr,
          users: usersArr,
          notes: form[`notes`].value,
          isVerified: isVerified,
          lastUpdatedBy: owner.value,
          lastUpdatedDate: moment(new Date()).format("YYYY-MM-DD hh:mm:ss a")
        };
        console.log(clientData);
        dispatch(updateClient(clientData));
        // if (isAdmin) {
        //   var usersArr = form[`users`].value;
        //   usersArr = usersArr.split(",");
        //   const clientData = {
        //     id,
        //     name: form[`name`].value,
        //     email: form[`email`].value,
        //     website: form[`website`].value,
        //     postNominalLetters: form[`postNominalLetters`].value,
        //     nameOfOrg: form[`nameOfOrg`].value,
        //     titleWithOrg: form[`titleWithOrg`].value,
        //     licenseNumber: form[`licenseNumber`].value,
        //     licenseExpiryDate: form[`licenseExpiryDate`].value,
        //     licenseLastVerifiedDate: form[`licenseLastVerifiedDate`].value,
        //     typeOfOrg: form[`typeOfOrg`].value,
        //     populationsServed: populationsServedArr,
        //     typesOfServices: typesOfServicesArr,
        //     specialties: specialtiesArr,
        //     groupsOffered: groupsOfferedArr,
        //     insuranceAccepted: insuranceAcceptedArr,
        //     assignedLocations: assignedLocationsArr,
        //     users: usersArr,
        //     notes: form[`notes`].value,
        //   };
        //   console.log(clientData);
        //   dispatch(updateClient(clientData));
        // } else {
        //   const userid = form[`userid`].value;
        //   const clientData = {
        //     id,
        //     name: form[`name`].value,
        //     email: form[`email`].value,
        //     website: form[`website`].value,
        //     postNominalLetters: form[`postNominalLetters`].value,
        //     nameOfOrg: form[`nameOfOrg`].value,
        //     titleWithOrg: form[`titleWithOrg`].value,
        //     licenseNumber: form[`licenseNumber`].value,
        //     licenseExpiryDate: form[`licenseExpiryDate`].value,
        //     licenseLastVerifiedDate: form[`licenseLastVerifiedDate`].value,
        //     typeOfOrg: form[`typeOfOrg`].value,
        //     populationsServed: populationsServedArr,
        //     typesOfServices: typesOfServicesArr,
        //     specialties: specialtiesArr,
        //     groupsOffered: groupsOfferedArr,
        //     insuranceAccepted: insuranceAcceptedArr,
        //     assignedLocations: assignedLocationsArr,
        //     notes: form[`notes`].value,
        //     userid,
        //   };
        //   console.log(clientData);
        //   dispatch(suggestEditsToClient(clientData));
        // }
        // if (isAdmin) dispatch(updateClient(clientData));
        // else dispatch(suggestEditsToClient(clientData));
      }
    },
    verifyClient(id, userid) {
        console.log(userid);
        var approvedDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss a");
        var contactMethod = lastContactMethod.suggestClientInfo;
        dispatch(verifyClient(id, userid, approvedDate, contactMethod));
    },    
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
            // const $title = isAdmin ? "Client deleted." : "Client delete request pending Admin approval.";
            // Toast.fire({
            //   icon: "success",
            //   title: $title,
            // });
          }
        });
      },
      rejectDeleteClientRequest(clientsDeleteRequest) {
        Swal_alert.fire({
            title: "Are you sure?",
            html: "<b><i>Client delete request will be rejected.</i></b>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!",
          }).then((result) => {
            if (result.value) {
              dispatch(requestRejectDeleteClientRequest(clientsDeleteRequest));
            }
          });
      },
      cancelDeleteClientRequest(clientsDeleteRequest) {
        Swal_alert.fire({
            title: "Are you sure?",
            html: "<b><i>Client delete request will be cancelled.</i></b>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
          }).then((result) => {
            if (result.value) {
              dispatch(requestCancelDeleteClientRequest(clientsDeleteRequest))
            }
          });
      }
  };
};

export const ConnectedClientsEdit = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsEdit);
