import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Checkbox from "../../../scripts/checkbox";
import Select2 from "../../../scripts/select2";
import { updateClient } from "../../../store/mutations";
import { ConnectedClientNameInput } from "./clientfunctions/ClientNameInput";
import { Toast } from "../../../scripts/sweetalert";
import { toastjs } from "../../../scripts/toastr";
import { ConnectedClientContactDetails } from "./clientcontactdetails/ClientContactDetails";
import { clientDataSets } from "../../../../server/clientDataSets";
import { ConnectedInputForm } from "../../../scripts/inputForm";

export const ClientsEdit = ({
  client,
  clients,
  users,
  locations,
  updateClient,
  isEdit,
  typeOfOrganization,
  populationsServed,
  typesOfServices,
  specialties,
  groupsOffered,
  insuranceAccepted,
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
                  <i className="fas fa-angle-down"></i> Edit {client.name}
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
              <ConnectedClientNameInput
                name={client.name}
                id={client.id}
                isEdit={isEdit}
                postNominalLetters={client.postNominalLetters}
              />
              <div className="form-row mb-3">
                <div className="col-sm-6 col-12">
                  <ConnectedInputForm
                    label="Email"
                    required
                    type="email"
                    placeholder="email@web.com"
                    nameid="email"
                    defaultValue={client.email}
                  />
                </div>
                <div className="col-sm-6 col-12">
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
              {/* <div className="form-group">
                <Checkbox
                  label="Assign Location(s):"
                  checkboxItems={locations.map((loc) => {
                    return {
                      ...loc,
                      name: loc.location,
                      checked: client.assignedLocations.some((c) => {
                        return c === loc.location ? true : null;
                      }),
                    };
                  })}
                  defaultValue={client.assignedLocations}
                  name="assignedLocations"
                />
              </div>

              <div className="form-group">
                <Checkbox
                  label="Assign Users:"
                  checkboxItems={users.map((u) => {
                    return {
                      ...u,
                      name: u.firstName + " " + u.lastName,
                      checked: client.users
                        ? client.users.some((c) => {
                            return c === u.firstName + " " + u.lastName
                              ? true
                              : null;
                          })
                        : null,
                    };
                  })}
                  defaultValue={client.users}
                  name="users"
                />
              </div> */}
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
                  <i className="fas fa-angle-down"></i> Edit Client Additional
                  Information
                </h3>
              </button>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  DELETE_CLIENT_CONTACT_DETAILS
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
                  selected={client.populationsServed.map((d) => {
                    return { value: d, label: d };
                  })}
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
                  selected={client.typesOfServices.map((d) => {
                    return { value: d, label: d };
                  })}
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
                  selected={client.specialties.map((d) => {
                    return { value: d, label: d };
                  })}
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
                  options={groupsOffered.map((d) => {
                    return { ...d, value: d.name, label: d.name };
                  })}
                  selected={client.groupsOffered.map((d) => {
                    return { value: d, label: d };
                  })}
                  name="groupsOffered"
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
                  selected={client.insuranceAccepted.map((d) => {
                    return { value: d, label: d };
                  })}
                  name="insuranceAccepted"
                />
              </div>
            </div>
          </div>
          <div className="mt-3 mb-3 ml-1 text-right">
            <button type="submit" className="btn bg-gradient-success mr-2">
              <i className="fas fa-save"></i> Update
            </button>
            <Link to="/clients" className="btn bg-gradient-danger">
              <i className="fas fa-times-circle"></i> Cancel
            </Link>
          </div>
        </form>
        <div className="card card-client-primary">
          <div className="card-header">
            <h3 className="card-title">Client Address:</h3>

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
            <ConnectedClientContactDetails
              clientID={client.id}
              clientContactDetails={client.clientContactDetails}
            />
          ) : null}
        </div>
      </div>
    </div>
  </>
);

const mapStatetoProps = (state, ownProps) => {
  //   const { email, id, name, owner } = ownProps.client;
  //   const clientContactDetails = ownProps.client.clientContactDetails.map(
  //     (contact) => {
  //       return { ...contact, toggleEdit: false };
  //     }
  //   );
  //   const client = {
  //     id,
  //     email,
  //     name,
  //     owner,
  //     clientContactDetails,
  //   };
  const client = ownProps.client;
  let { clients, users, locations } = state;
  const isEdit = true;
  const {
    typeOfOrganization,
    populationsServed,
    typesOfServices,
    specialties,
    groupsOffered,
    insuranceAccepted,
  } = clientDataSets;
  return {
    client,
    clients,
    users,
    locations,
    isEdit,
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
        var assignedLocationsArr = form[`assignedLocations`].value;
        assignedLocationsArr = assignedLocationsArr.split(",");

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

        var usersArr = form[`users`].value;
        usersArr = usersArr.split(",");
        const clientData = {
          id,
          name: form[`name`].value,
          email: form[`email`].value,
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
        console.log(clientData);
        dispatch(updateClient(clientData));
      }
    },
  };
};

export const ConnectedClientsEdit = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ClientsEdit);
