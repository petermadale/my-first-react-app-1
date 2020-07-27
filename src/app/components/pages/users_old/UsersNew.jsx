import React from "react";
import { connect } from "react-redux";
import { createUserAccount } from "../../../store/mutations";
import { Link } from "react-router-dom";
import { ConnectedContentHeader } from "../../template/contentholders/ContentHeader";
import Select2 from "../../../scripts/select2";
import NumberFormat from "react-number-format";
import uuid from "uuid";

export const UsersNew = ({ locations, createUserAccount }) => (
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
              <form className="form-horizontal" onSubmit={createUserAccount}>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label
                        htmlFor="firstName"
                        className="col-sm-12 col-form-label"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        defaultValue=""
                        required
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label
                        htmlFor="lastName"
                        className="col-sm-12 col-form-label"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        defaultValue=""
                        required
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label
                        htmlFor="email"
                        className="col-sm-12 col-form-label"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label
                        htmlFor="location"
                        className="col-sm-12 col-form-label"
                      >
                        Location
                      </label>
                      <Select2
                        defaultValue=""
                        options={locations}
                        selected=""
                        name="location"
                        isMulti
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
                        defaultValue=""
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
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label
                        htmlFor="username"
                        className="col-sm-12 col-form-label"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Username"
                        defaultValue=""
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        htmlFor="password"
                        className="col-sm-12 col-form-label"
                      >
                        Enter password
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
    </section>
  </>
);
const mapStateToProps = (state, ownProps) => {
  const locations = state.locations.map((loc) => {
    return { ...loc, value: loc.location, label: loc.location };
  });
  return { locations };
};

const mapDispatchStateToProps = (dispatch, ownProps) => ({
  createUserAccount(e) {
    e.preventDefault();
    let form = e.target;
    var locationArr = form[`location`].value;
    locationArr = locationArr.split(",");
    const userdata = {
      firstName: form[`firstName`].value,
      lastName: form[`lastName`].value,
      location: locationArr,
      officePhoneNumber: form[`officePhoneNumber`].value,
      cellPhoneNumber: form[`cellPhoneNumber`].value,
      email: form[`email`].value,
      username: form[`username`].value,
      password: form[`password`].value,
    };
    dispatch(createUserAccount(userdata));
  },
});

export const ConnectedUsersNew = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(UsersNew);
