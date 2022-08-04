import React from "react";
import PropTypes from "prop-types";
import styles from "./UsersNew.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import uuid from "uuid";

import { processCreateUser } from "../../../../store/mutations";
import { ConnectedContentHeader } from "../../../template/contentholders/ContentHeader";
import Select2 from "../../../../scripts/select2";
import { ConnectedInputForm } from "../../../../scripts/inputForm";
import { toastjs } from "../../../../scripts/toastr";
import { ConnectedNoAccess } from "../../NoAccess/NoAccess";

export const UsersNew = ({ isAdmin, locations, createUserAccount }) => (
  <>
    {isAdmin ? (
      <>
        <ConnectedContentHeader pagename={"Users"} />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="card card-info">
                  <div className="card-header">
                    <h3 className="card-title">Create New User</h3>
                  </div>
                  <form
                    className="form-horizontal"
                    onSubmit={createUserAccount}
                  >
                    <div className="card-body">
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <ConnectedInputForm
                            label="First Name"
                            type="text"
                            nameid="firstName"
                            required
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <ConnectedInputForm
                            label="Last Name"
                            type="text"
                            nameid="lastName"
                            required
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <ConnectedInputForm
                            label="Email"
                            type="email"
                            nameid="email"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <Select2
                            label="Location"
                            defaultValue=""
                            options={locations}
                            selected=""
                            name="location"
                            isMulti
                            required
                          />
                        </div>
                        <div className="form-group col-md-3">
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
                        <div className="form-group col-md-3">
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
                            defaultValue=""
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <ConnectedInputForm
                            label="Username"
                            type="text"
                            nameid="username"
                            required
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="password">
                            Enter password{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                            defaultValue=""
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-right">
                      <button
                        type="submit"
                        className="btn bg-gradient-success mr-2"
                      >
                        <i className="fas fa-save"></i> Save
                      </button>
                      <Link to="/users" className="btn bg-gradient-danger">
                        <i className="fas fa-times-circle"></i> Cancel
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
  const locations = state.locations.map((loc) => {
    return { ...loc, value: loc.location, label: loc.location };
  });
  return { isAdmin, locations };
};

const mapDispatchStateToProps = (dispatch, ownProps) => ({
  createUserAccount(e) {
    e.preventDefault();
    let form = e.target;
    const firstName = form[`firstName`];
    const lastName = form[`lastName`];
    const location = form[`location`];
    const otherLocation = form[`otherLocation`];
    const username = form[`username`];
    const password = form[`password`];
    var error_msg = [];

    for (let inputField = 0; inputField < form.length; inputField++) {
      const element = form[inputField];
      var err = validateInput(element);
      if (err) error_msg.push(err);
    }

    if (error_msg.length > 0) {
      error_msg.forEach(function (e) {
        toastjs.error(e);
      });
    } else {
      var locationArr = form[`location`].value;
      locationArr = locationArr.split(",");

      let userID = uuid();
      const userdata = {
        id: userID,
        firstName: firstName.value,
        lastName: lastName.value,
        location: locationArr,
        otherLocation: otherLocation ? otherLocation.value : null,
        officePhoneNumber: form[`officePhoneNumber`].value,
        cellPhoneNumber: form[`cellPhoneNumber`].value,
        email: form[`email`].value,
        username: username.value,
        password: password.value,
      };
      dispatch(processCreateUser(userdata));
    }

    function validateInput(element) {
      if (element.required && element.value === "") {
        var err = element.placeholder + " is required.";
      }
      return err;
    }
  },
});

export const ConnectedUsersNew = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(UsersNew);
