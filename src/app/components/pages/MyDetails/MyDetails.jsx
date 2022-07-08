import React from "react";
import { connect } from "react-redux";
import { processUpdateMyDetails } from "../../../store/mutations";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { ConnectedContentHeader } from "../../template/contentholders/ContentHeader";
import Select2 from "../../../scripts/select2";

export const MyDetails = ({ userdetails, locations, updateMyDetails }) => (
  <>
    <ConnectedContentHeader pagename={"My Details"} />

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card card-client-primary">
              <div className="card-header">
                <h3 className="card-title">Update My Details</h3>
              </div>
              <form className="form-horizontal" onSubmit={updateMyDetails}>
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="firstName"
                      className="col-sm-2 col-form-label"
                    >
                      First Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        defaultValue={userdetails.firstName}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="lastName"
                      className="col-sm-2 col-form-label"
                    >
                      Last Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        defaultValue={userdetails.lastName}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="location"
                      className="col-sm-2 col-form-label"
                    >
                      Location
                    </label>
                    <div className="col-sm-10">
                      <Select2
                        defaultValue={userdetails.location}
                        options={locations}
                        selected={userdetails.location}
                        name="location"
                        isMulti
                        isDisabled={userdetails.isAdmin ? false : true}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="officePhoneNumber"
                      className="col-sm-2 col-form-label"
                    >
                      Office Phone Number
                    </label>
                    <div className="col-sm-10">
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
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="cellPhoneNumber"
                      className="col-sm-2 col-form-label"
                    >
                      Cell Phone Number
                    </label>
                    <div className="col-sm-10">
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
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={userdetails.email}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="username"
                      className="col-sm-2 col-form-label"
                    >
                      Username
                    </label>
                    <div className="col-sm-10">
                      <input type="hidden" name="id" value={userdetails.id} />
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Username"
                        defaultValue={userdetails.username}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="password"
                      className="col-sm-2 col-form-label"
                    >
                      Enter password
                    </label>
                    <div className="col-sm-10">
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
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn bg-gradient-success mr-2"
                  >
                    Update
                  </button>
                  <Link to="/dashboard" className="btn bg-gradient-danger">
                    Cancel
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
  const userdetails = {
    ...state.session,
    location: state.session.location.map((loc) => {
      return { value: loc, label: loc };
    }),
    selectedlocation: [],
  };
  const locations = state.locations.map((loc) => {
    return { ...loc, value: loc.location, label: loc.location };
  });
  return {
    userdetails,
    locations,
  };
};

const mapDispatchToprops = (dispatch, ownProps) => {
  return {
    updateMyDetails(e) {
      e.preventDefault();
      const form = e.target;
      var locationArr = form[`location`].value;
      locationArr = locationArr.split(",");
      const user = {
        id: form[`id`].value,
        firstName: form[`firstName`].value,
        lastName: form[`lastName`].value,
        location: locationArr,
        officePhoneNumber: form[`officePhoneNumber`].value,
        cellPhoneNumber: form[`cellPhoneNumber`].value,
        email: form[`email`].value,
        username: form[`username`].value,
        password: form[`password`].value,
      };
      dispatch(processUpdateMyDetails(user));
    },
  };
};
export const ConnectedMyDetails = connect(
  mapStateToProps,
  mapDispatchToprops
)(MyDetails);
