import React from "react";
import { connect, useStore } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { updateUserDetails } from "../../../store/mutations";
import { ConnectedContentHeader } from "../../template/contentholders/ContentHeader";
import Select2 from "../../../scripts/select2";

export const UserEdit = ({ userdetails, locations, updateUserDetails }) => (
  <>
    <ConnectedContentHeader pagename={"Edit User"} />

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
              <form className="form-horizontal" onSubmit={updateUserDetails}>
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
                        defaultValue={userdetails.firstName}
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
                        defaultValue={userdetails.lastName}
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
                        defaultValue={userdetails.email}
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
                        defaultValue={userdetails.location}
                        options={locations}
                        selected={userdetails.location}
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
                        defaultValue={userdetails.officePhoneNumber}
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
                        defaultValue={userdetails.username}
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
                    <i className="fas fa-save"></i> Update
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
  const id = ownProps.match.params.id;
  var userdetails = JSON.parse(
    JSON.stringify(state.users.find((user) => user.id === id))
  );
  userdetails.location = userdetails.location.map((loc) => {
    return { value: loc, label: loc };
  });
  userdetails.selectedlocation = [];
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
    userdetails,
    locations,
  };
};

const mapDispatchToprops = (dispatch, ownProps) => {
  return {
    updateUserDetails(e) {
      e.preventDefault();
      const form = e.target;
      //const sel = form[`react-select-2-input`];
      //   var selectedLocationArr = [].slice
      //     .call(form[`location`].selectedOptions)
      //     .map((a) => a.value);
      //   console.log(selectedLocationArr);
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
      dispatch(updateUserDetails(user));
    },
  };
};
export const ConnectedUserEdit = connect(
  mapStateToProps,
  mapDispatchToprops
)(UserEdit);
