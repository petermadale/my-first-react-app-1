import React from "react";
import Select2 from "../../../scripts/select2";
import Checkbox from "../../../scripts/checkbox";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "uuid";
import { createNewClient } from "../../../store/mutations";
import { ConnectedClientNameInput } from "./clientfunctions/ClientNameInput";
import { Toast } from "../../../scripts/sweetalert";
import { toastjs } from "../../../scripts/toastr";
import NumberFormat from "react-number-format";
import { clientDataSets } from "../../../../server/clientDataSets";
import { ConnectedInputForm } from "../../../scripts/inputForm";

export const ClientsNew = ({
  id,
  users,
  locations,
  createNewClient,
  typeOfOrganization,
  populationsServed,
  typesOfServices,
  specialties,
  groupsOffered,
  insuranceAccepted,
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <form onSubmit={createNewClient} id="newClient">
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Client Information</h3>
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
                <div className="card-body">
                  <p className="text-right">
                    <i>
                      <b>Required</b>
                    </i>{" "}
                    <span className="text-danger">*</span>
                  </p>
                  {/* <input type="hidden" name="owner" value={id} /> */}
                  <ConnectedClientNameInput />
                  <div className="form-row mb-3">
                    <div className="col-sm-6 col-12">
                      <ConnectedInputForm
                        label="Email"
                        required
                        type="email"
                        placeholder="email@web.com"
                        nameid="email"
                      />
                    </div>
                    <div className="col-sm-6 col-12">
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
                    {/* <Checkbox
                      label="Assign Location(s):"
                      checkboxItems={locations.map((loc) => {
                        return { ...loc, name: loc.location };
                      })}
                      name="assignedLocations"
                    /> */}
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
                    {/* <Checkbox
                      label="Assign Users:"
                      checkboxItems={users.map((g) => {
                        return {
                          ...g,
                          name: g.firstName + " " + g.lastName,
                        };
                      })}
                      name="users"
                    /> */}
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
                  {/* <button
        type="submit"
        className={`btn btn-success mr-2 ${isDuplicate ? "disabled" : ""}`}
        disabled={`${isDuplicate ? "disabled" : ""}`}
      > */}
                </div>
              </div>

              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Client Additional Information</h3>
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
                    {/* <select
                      name="typeOfOrg"
                      id="typeOfOrg"
                      className="form-control"
                      defaultValue=""
                      onChange={(event) => {
                        return;
                      }}
                    >
                      <option value="">Select Type of Organization</option>
                      {typeOfOrganization.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name}
                        </option>
                      ))}
                    </select> */}
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
                    {/* <Checkbox
                      label="Populations Served:"
                      checkboxItems={populationsServed}
                      name="populationsServed"
                    /> */}
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
                    {/* <Checkbox
                      label="Types of Services:"
                      checkboxItems={typesOfServices}
                      name="typesOfServices"
                    /> */}
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
                    />
                    {/* <Checkbox
                      label="Specialties:"
                      checkboxItems={specialties}
                      name="specialties"
                    /> */}
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
                    />
                    {/* <Checkbox
                      label="Groups Offered:"
                      checkboxItems={groupsOffered}
                      name="groupsOffered"
                    /> */}
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
                    {/* <Checkbox
                      label="Insurance Accepted:"
                      checkboxItems={insuranceAccepted.map((ins) => {
                        return {
                          ...ins,
                          name: ins.name + " (" + ins.network + ")",
                        };
                      })}
                      name="insuranceAccepted"
                    /> */}
                  </div>
                </div>
              </div>

              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Client Address</h3>
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
                <div className="card-body">
                  <div className="form-group">
                    <ConnectedInputForm
                      label="Address 1"
                      type="text"
                      nameid="address1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <ConnectedInputForm
                      label="Address 2"
                      type="text"
                      nameid="address2"
                    />
                  </div>
                  <div className="form-row mb-3">
                    <div className="col-sm-6 col-12">
                      <ConnectedInputForm
                        label="Work Email"
                        type="email"
                        nameid="workEmail"
                        placeholder="email@gmail.com"
                      />
                    </div>
                    <div className="col-sm-6 col-12">
                      <ConnectedInputForm
                        label="Aleternate Email"
                        type="email"
                        nameid="alternateEmail"
                        placeholder="email@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="form-row mb-3">
                    <div className="col-sm-6 col-12">
                      <ConnectedInputForm
                        label="City"
                        type="text"
                        nameid="city"
                      />
                    </div>
                    <div className="col-sm-3 col-12">
                      <ConnectedInputForm
                        label="State"
                        type="text"
                        nameid="state"
                      />
                    </div>
                    <div className="col-sm-3 col-12">
                      <ConnectedInputForm
                        label="Zip"
                        type="text"
                        nameid="zip"
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
                        defaultValue=""
                      />
                    </div>
                    <div className="col-sm-6 col-12">
                      <ConnectedInputForm
                        label="Extension Number"
                        type="number"
                        nameid="officePhoneNumberExt"
                      />
                    </div>
                  </div>

                  <div className="form-row mb-3">
                    <div className="col-sm-4 col-12">
                      <label htmlFor="cellPhoneNumber">Cell Phone Number</label>
                      <NumberFormat
                        format="###-###-####"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        mask="_"
                        placeholder="555-555-5555"
                        title="e.g. 555-555-5555"
                        name="cellPhoneNumber"
                        id="cellPhoneNumber"
                        className="form-control"
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 mb-3 ml-1 text-right">
                <button type="submit" className="btn bg-gradient-success mr-2">
                  <i className="fas fa-save"></i> Save
                </button>
                <Link to="/clients" className="btn bg-gradient-danger">
                  <i className="fas fa-times-circle"></i> Cancel
                </Link>
              </div>
            </form>
          </div>
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
  };
};

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    createNewClient(e) {
      e.preventDefault();
      const form = e.target;
      const name = form[`name`];
      const email = form[`email`];
      const assignedLocations = form[`assignedLocations`];
      const users = form[`users`];
      var error_msg = [];

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
        populationsServedArr = populationsServedArr.split(",");

        var typesOfServicesArr = form[`typesOfServices`].value;
        typesOfServicesArr = typesOfServicesArr.split(",");

        var specialtiesArr = form[`specialties`].value;
        specialtiesArr = specialtiesArr.split(",");

        var groupsOfferedArr = form[`groupsOffered`].value;
        groupsOfferedArr = groupsOfferedArr.split(",");

        var insuranceAcceptedArr = form[`insuranceAccepted`].value;
        insuranceAcceptedArr = insuranceAcceptedArr.split(",");

        const clientData = {
          id: clientID,
          name: name.value,
          email: email.value,
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
          assignedLocations: assignedLocationsArr,
          users: usersArr,
          notes: form[`notes`].value,
        };
        // console.log(clientData);
        const clientContactID = uuid();
        const clientContactData = {
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
        // console.log(clientContactData);
        dispatch(createNewClient(clientData, clientContactData));
      }
    },
  };
};

export const ConnectedClientsNew = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsNew);
