import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import uuid from "uuid";
import { Redirect } from "react-router";

import { createNewClient } from "../../../../store/mutations";
import { ConnectedClientNameInput } from "../ClientNameInput/ClientNameInput";
import { toastjs } from "../../../../scripts/toastr";
import Select2 from "../../../../scripts/select2";
import { clientDataSets } from "../../../../../server/clientDataSets";
import { ConnectedInputForm } from "../../../../scripts/inputForm";
import { ConnectedNoAccess } from "../../NoAccess/NoAccess";
import { ConnectedClientsAddressCreate } from "../ClientsAddressCreate/ClientsAddressCreate";

export const ClientsNew = ({
  id,
  isAdmin,
  users,
  locations,
  createNewClient,
  typeOfOrganization,
  populationsServed,
  typesOfServices,
  specialties,
  groupsOffered,
  insuranceAccepted,
  serviceDeliveryMethod
}) => (
    <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Create New Client</h1>
          </div>
          <div className="col-sm-6">
            <Link
              to="/clients"
              className="btn bg-gradient-secondary float-right"
            >
              <i className="fa fa-angle-double-left"></i> Back to Clients
            </Link>
          </div>
        </div>
      </div>
    </section>
    <section className="content">
        <div className="row">
          <div className="col-12">
            <form onSubmit={createNewClient} id="newClient">
              <div className="card card-info card-client-info collapsed-card">
                <div className="card-header">
                    <button
                      type="button"
                      className="btn btn-tool p-0"
                      data-card-widget="collapse"
                    >
                      <h3 className="card-title">
                        <i className="fas fa-angle-down"></i> 1. Client Information
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
                  <p className="text-right">
                    <i>
                      <b>Required</b>
                    </i>{" "}
                    <span className="text-danger">*</span>
                  </p>
                  <ConnectedClientNameInput />
                  <div className="form-row mb-3">
                    <div className="col-sm-4 col-12">
                      <ConnectedInputForm
                        label="Email"
                        required
                        type="email"
                        placeholder="email@web.com"
                        nameid="email"
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
                        defaultValue=""
                      />
                    </div>
                    <div className="col-sm-4 col-12">
                      <ConnectedInputForm
                        label="Website"
                        type="url"
                        placeholder="https://example.com"
                        nameid="website"
                        pattern="https://.*"
                      />
                    </div>
                  </div>

                  <div className="form-row mb-3">
                    <div className="col-sm-6 col-12">
                      <ConnectedInputForm
                        label="Name of Organization"
                        type="text"
                        nameid="nameOfOrg"
                      />
                    </div>
                    <div className="col-sm-6 col-12">
                      <ConnectedInputForm
                        label="Title (Position with organization)"
                        type="text"
                        placeholder="Title"
                        nameid="titleWithOrg"
                      />
                    </div>
                  </div>

                  <div className="form-row mb-3">
                    <div className="col-sm-4 col-12">
                      <ConnectedInputForm
                        label="License Number"
                        type="text"
                        nameid="licenseNumber"
                      />
                    </div>
                    <div className="col-sm-4 col-12">
                      <ConnectedInputForm
                        label="License Expiry Date"
                        type="date"
                        nameid="licenseExpiryDate"
                      />
                    </div>
                    <div className="col-sm-4 col-12">
                      <ConnectedInputForm
                        label="Date the License was last verified"
                        type="date"
                        nameid="licenseLastVerifiedDate"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Select2
                      label="Assign Location(s)"
                      required
                      isMulti
                      defaultValue=""
                      options={locations.map((d) => {
                        return {
                          ...d,
                          value: d.location,
                          label: d.location,
                        };
                      })}
                      selected=""
                      name="assignedLocations"
                    />
                  </div>

                  <div className="form-group">
                    <Select2
                      label="Assign User(s)"
                      required
                      isMulti
                      defaultValue=""
                      options={users.map((d) => {
                        return {
                          ...d,
                          value: d.firstName + " " + d.lastName,
                          label: d.firstName + " " + d.lastName,
                        };
                      })}
                      selected=""
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
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="card card-info card-additional-client-info collapsed-card">
                <div className="card-header">
                    <button
                      type="button"
                      className="btn btn-tool p-0"
                      data-card-widget="collapse"
                    >
                      <h3 className="card-title">
                      <i className="fas fa-angle-down"></i> 2. Client Additional Information
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
                      defaultValue=""
                      options={typeOfOrganization.map((d) => {
                        return { ...d, value: d.name, label: d.name };
                      })}
                      selected=""
                      name="typeOfOrg"
                    />
                  </div>
                  <div className="form-group">
                    <Select2
                      label="Populations Served"
                      isMulti
                      defaultValue=""
                      options={populationsServed.map((d) => {
                        return { ...d, value: d.name, label: d.name };
                      })}
                      selected=""
                      name="populationsServed"
                    />
                  </div>
                  <div className="form-group">
                    <Select2
                      label="Types of Services"
                      isMulti
                      defaultValue=""
                      options={typesOfServices.map((d) => {
                        return { ...d, value: d.name, label: d.name };
                      })}
                      selected=""
                      name="typesOfServices"
                    />
                  </div>
                  <div className="form-group">
                    <Select2
                      label="Specialties"
                      isMulti
                      defaultValue=""
                      options={specialties.map((d) => {
                        return { ...d, value: d.name, label: d.name };
                      })}
                      selected=""
                      name="specialties"
                      maximumSelectionLength={5}
                    />
                  </div>
                  <div className="form-group">
                    <Select2
                      label="Groups Offered"
                      isMulti
                      defaultValue=""
                      options={groupsOffered.map((d) => {
                        return { ...d, value: d.name, label: d.name };
                      })}
                      selected=""
                      name="groupsOffered"
                      maximumSelectionLength={5}
                    />
                  </div>
                  <div className="form-group">
                    <Select2
                      label="Insurance Accepted"
                      isMulti
                      defaultValue=""
                      options={insuranceAccepted.map((d) => {
                        return {
                          ...d,
                          value: d.name + " (" + d.network + ")",
                          label: d.name + " (" + d.network + ")",
                        };
                      })}
                      selected=""
                      name="insuranceAccepted"
                    />
                  </div>
                  <div className="form-group">
                    <Select2
                      label="Service Delivery Method"
                      defaultValue=""
                      options={serviceDeliveryMethod.map((s) => {
                        return { ...s, value: s.name, label: s.name };
                      })}
                      selected=""
                      name="serviceDeliveryMethod"
                    />
                  </div>
                </div>
              </div>

              <div className="card card-info card-client-address collapsed-card">
                <div className="card-header">
                    <button
                      type="button"
                      className="btn btn-tool p-0"
                      data-card-widget="collapse"
                    >
                      <h3 className="card-title">
                      <i className="fas fa-angle-down"></i> 3. Client Address
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
                  <ConnectedClientsAddressCreate isNew={true}/>
                </div>
              </div>
              
              <div className="mt-3 mb-3 ml-1 text-right client-new-btn">
                  <input type="hidden" id="owner" name="owner" value={id} />
                  <input type="hidden" id="isAdmin" name="isAdmin" checked={isAdmin} onChange={() => { return; }} />
                <button
                  type="submit"
                  className="btn bg-gradient-success mr-2"
                >
                  <i className="fas fa-save"></i> Save
                </button>
                <Link to="/clients" className="btn bg-gradient-danger">
                  <i className="fas fa-times-circle"></i> Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
    </section>
  </>
);

const mapStatetoProps = (state, ownProps) => {
  let { id, isAdmin } = state.session;
  let { clients, users, locations } = state;
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
    id,
    isAdmin,
    clients,
    users,
    locations,
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
    createNewClient(e) {
      e.preventDefault();
      const form = e.target;
      const name = form[`name`];
      const email = form[`email`];
      const contactNumber = form[`contactNumber`];
      const owner = form[`owner`];
      const assignedLocations = form[`assignedLocations`];
      const otherLocation = form[`otherLocation`];
      const users = form[`users`];
      var error_msg = [];
      const isAdmin = form[`isAdmin`].checked;
      const clientAddressOption = form[`clientAddressOption`];
      const isVerified = isAdmin;

      if (name.required && name.value === "") {
        var err = name.placeholder + " is required.";
        error_msg.push(err);
      }
      if (email.required && email.value === "") {
        var err = email.placeholder + " is required.";
        error_msg.push(err);
      }
      if (assignedLocations.required && assignedLocations.value === "") {
        var err = assignedLocations.placeholder + " is required.";
        error_msg.push(err);
      }
      if (users.required && users.value === "") {
        var err = users.placeholder + " is required.";
        error_msg.push(err);
      }

      const isduplicate = name.dataset.isduplicate;
      if (error_msg.length > 0) {
        error_msg.forEach(function (e) {
          toastjs.error(e);
        });
      } else if (isduplicate === "true") {
        toastjs.warning("Name is already taken. Please choose another one.");
        // Toast.fire({
        //   icon: "warning",
        //   title: "Name is already taken. Please choose another one.",
        // });
      } else {
        const clientID = uuid();
        var assignedLocationsArr = assignedLocations.value;
        assignedLocationsArr = assignedLocationsArr.split(",");

        var usersArr = users.value;
        usersArr = usersArr.split(",");

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

        const clientData = {
          id: clientID,
          name: name.value,
          owner: owner.value,
          email: email.value,
          contactNumber: contactNumber.value,
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
          otherLocation: otherLocation ? otherLocation.value : null,
          users: usersArr,
          notes: form[`notes`].value,
          isVerified: isVerified,
          clientAddressOption: clientAddressOption.value
        };
        // console.log(clientData);
        var clientContactData = null;
        if (clientAddressOption.value === 'Has Address') {
          const clientContactID = uuid();
          clientContactData = {
            id: clientContactID,
            client: clientID,
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
        }
        console.log(clientContactData);
        dispatch(createNewClient(clientData, clientContactData, isAdmin));
      }
    },
  };
};

export const ConnectedClientsNew = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsNew);
