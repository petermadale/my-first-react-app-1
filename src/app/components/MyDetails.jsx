import React from "react";
import { connect } from "react-redux";
import { updateUserDetails } from "../store/mutations";
import { Link } from "react-router-dom";

export const MyDetails = ({ id, name, updateUserDetails }) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>My Details</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Update My Details</h3>
              </div>
              <form className="form-horizontal" onSubmit={updateUserDetails}>
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="username"
                      className="col-sm-2 col-form-label"
                    >
                      Username
                    </label>
                    <div className="col-sm-10">
                      <input type="hidden" name="id" value={id} />
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Username"
                        defaultValue={name}
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
                      />
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-info">
                    Update
                  </button>
                  <Link to="/dashboard" className="btn btn-default float-right">
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
  const { id, name } = state.session;
  return {
    id,
    name,
  };
};

const mapDispatchToprops = (dispatch, ownProps) => {
  return {
    updateUserDetails(e) {
      const form = e.target;
      const id = form[`id`].value;
      const username = form[`username`].value;
      const password = form[`password`].value;

      dispatch(updateUserDetails(id, username, password));
    },
  };
};
export const ConnectedMyDetails = connect(
  mapStateToProps,
  mapDispatchToprops
)(MyDetails);
