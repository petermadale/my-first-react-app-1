import React from "react";
import PropTypes from "prop-types";
import styles from "./UsersEdit.module.css";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { processUpdateUser } from "../../../../store/mutations";
import { ConnectedContentHeader } from "../../../template/contentholders/ContentHeader";
import Select2 from "../../../../scripts/select2";
import { ConnectedInputForm } from "../../../../scripts/inputForm";
import { toastjs } from "../../../../scripts/toastr";
import { ConnectedNoAccess } from "../../NoAccess/NoAccess";

export const UserEdit = ({
  isAdmin,
  userdetails,
  locations,
  updateUserAccount,
}) => (
  <>
    {isAdmin ? (
      <>
        <ConnectedContentHeader pagename={"Users"} />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="card card-client-primary">
                  <div className="card-header">
                    <h3 className="card-title">
                      Edit {userdetails.firstName} {userdetails.lastName}
                    </h3>
                  </div>
                  <form
                    className="form-horizontal"
                    onSubmit={updateUserAccount}
                  >
                    <div className="card-body">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <ConnectedInputForm
                            label="First Name"
                            type="text"
                            nameid="firstName"
                            defaultValue={userdetails.firstName}
                            required
                            isDisabled={
                                userdetails.id === "User1" ? true : false
                            }
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <ConnectedInputForm
                            label="Last Name"
                            type="text"
                            nameid="lastName"
                            defaultValue={userdetails.lastName}
                            required
                            isDisabled={
                                userdetails.id === "User1" ? true : false
                            }
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <Select2
                            label="Location"
                            defaultValue={userdetails.location}
                            options={locations}
                            selected={userdetails.location}
                            name="location"
                            isMulti
                            required
                            isDisabled={
                                userdetails.id === "User1" ? true : false
                            }
                            otherLocation={userdetails.otherLocation}
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label
                            htmlFor="officePhoneNumber"
                            className="col-sm-12 col-form-label"
                          >
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
                            defaultValue={userdetails.officePhoneNumber}
                            
                            disabled={
                                userdetails.id === "User1" ? true : false
                            }
                          />
                        </div>
                        <div className="form-group col-md-3">
                          <label
                            htmlFor="cellPhoneNumber"
                            className="col-sm-12 col-form-label"
                          >
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
                            defaultValue={userdetails.cellPhoneNumber}
                            disabled={
                                userdetails.id === "User1" ? true : false
                            }
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <ConnectedInputForm
                            label="Username"
                            type="text"
                            nameid="username"
                            defaultValue={userdetails.username}
                            required
                            isDisabled={
                                userdetails.id === "User1" ? true : false
                            }
                          />
                        </div>

                        <div className="form-group col-md-6">
                          <ConnectedInputForm
                            label="Email"
                            type="email"
                            nameid="email"
                            defaultValue={userdetails.email}
                            isDisabled={
                                userdetails.id === "User1" ? true : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-right">
                    {
                            userdetails.id === "User1" ? null : 
                            <button
                              type="submit"
                              className="btn bg-gradient-success mr-2"
                            >
                              <i className="fas fa-save"></i> Update
                            </button>
                        }
                      <Link to="/users" className="btn bg-gradient-secondary">
                        <i className="fas fa-angle-double-left"></i> Back to
                        Users
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>{" "}
      </>
    ) : (
      <ConnectedNoAccess />
    )}
  </>
);
const mapStateToProps = (state, ownProps) => {
  const isAdmin = state.session.isAdmin;
  const id = ownProps.match.params.id;
  var userdetails = null;
  if (isAdmin) {
    userdetails = JSON.parse(
      JSON.stringify(state.users.find((user) => user.id === id))
    );
    userdetails.location = userdetails.location.map((loc) => {
      return { value: loc, label: loc };
    });
    userdetails.selectedlocation = [];
  }
  // const userdetails = {
  //   ...state.session,
  //   location: state.session.location.map((loc) => {
  //     return { value: loc, label: loc };
  //   }),
  //   selectedlocation: [],
  // };
  const locations = state.locations.map((loc) => {
    return { ...loc, value: loc.location, label: loc.location };
  });
  return {
    isAdmin,
    userdetails,
    locations,
  };
};

const mapDispatchToprops = (dispatch, ownProps) => {
  const userid = ownProps.match.params.id;
  return {
    updateUserAccount(e) {
      e.preventDefault();
      const form = e.target;
      const firstName = form[`firstName`];
      const lastName = form[`lastName`];
      const location = form[`location`];
      const otherLocation = form[`otherLocation`];
      const username = form[`username`];
      //   const password = form[`password`];
      var error_msg = [];

      if (firstName.required && firstName.value === "") {
        var err = firstName.placeholder + " is required.";
        error_msg.push(err);
      }
      if (lastName.required && lastName.value === "") {
        var err = lastName.placeholder + " is required.";
        error_msg.push(err);
      }
      if (location.required && location.value === "") {
        var err = location.placeholder + " is required.";
        error_msg.push(err);
      }
      if (username.required && username.value === "") {
        var err = username.placeholder + " is required.";
        error_msg.push(err);
      }
      //   if (password.required && password.value === "") {
      //     var err = password.placeholder + " is required.";
      //     error_msg.push(err);
      //   }
      //const sel = form[`react-select-2-input`];
      //   var selectedLocationArr = [].slice
      //     .call(form[`location`].selectedOptions)
      //     .map((a) => a.value);
      //   console.log(selectedLocationArr);
      if (error_msg.length > 0) {
        error_msg.forEach(function (e) {
          toastjs.error(e);
        });
      } else {
        var locationArr = form[`location`].value;
        locationArr = locationArr.split(",");
        const userdata = {
          id: userid,
          firstName: firstName.value,
          lastName: lastName.value,
          location: locationArr,
          otherLocation: otherLocation ? otherLocation.value : null,
          officePhoneNumber: form[`officePhoneNumber`].value,
          cellPhoneNumber: form[`cellPhoneNumber`].value,
          email: form[`email`].value,
          username: username.value,
          //   password: password.value,
        };

        dispatch(processUpdateUser(userdata));
      }
    },
  };
};
export const ConnectedUserEdit = connect(
  mapStateToProps,
  mapDispatchToprops
)(UserEdit);
