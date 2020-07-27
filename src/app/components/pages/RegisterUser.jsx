import React from "react";
import { connect } from "react-redux";
import * as mutations from "../../store/mutations";
import "../../styles/style.css";
import logo from "../../images/crm_app_logo.png";
import { Link } from "react-router-dom";
// import "../admin-lte/plugins/select2/js/select2";

export const RegisterUser = ({ authenticated }) => (
  <div className="sign-in">
    <div className="register-box">
      <div className="register-logo">
        <img src={logo} alt="CRM App" />
      </div>

      <div className="card">
        <div className="card-body register-card-body">
          <p className="login-box-msg">Register a new account.</p>

          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${
                  authenticated === mutations.NAME_RESERVED
                    ? "is-invalid"
                    : null
                }`}
                placeholder="First name"
                name="firstname"
                defaultValue=""
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${
                  authenticated === mutations.NAME_RESERVED
                    ? "is-invalid"
                    : null
                }`}
                placeholder="Last name"
                name="lastname"
                defaultValue=""
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>
            {/* <div className="form-group">
              <label>Location</label>
              <div className="select2-purple">
                <select
                  className="select2"
                  multiple="multiple"
                  data-placeholder="Select a State"
                  data-dropdown-css-className="select2-purple"
                >
                  <option>North</option>
                  <option>South</option>
                  <option>East</option>
                  <option>West</option>
                </select>
              </div>
            </div> */}
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${
                  authenticated === mutations.USERNAME_RESERVED
                    ? "is-invalid"
                    : null
                }`}
                placeholder="Username"
                name="username"
                defaultValue=""
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className={`form-control ${
                  authenticated === mutations.PASSWORD_MISMATCH
                    ? "is-invalid"
                    : null
                }`}
                placeholder="Password"
                name="password"
                defaultValue=""
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className={`form-control ${
                  authenticated === mutations.PASSWORD_MISMATCH
                    ? "is-invalid"
                    : null
                }`}
                placeholder="Retype password"
                name="confirmPasword"
                defaultValue=""
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
              {authenticated === mutations.PASSWORD_MISMATCH ? (
                <span
                  id="exampleInputEmail1-error"
                  className="error invalid-feedback"
                >
                  Password mismatch. Please type again.
                </span>
              ) : null}
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </div>
            </div>
          </form>
          <p className="mt-2">
            <Link to="/" className="text-center">
              I already have an account.
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
const mapStateToProps = ({ session }) => {
  const authenticated = session.authenticated;
  return {
    authenticated,
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => ({
  requestCreateUserAccount(e) {
    e.preventDefault();
    let form = e.target;
    let name = form[`name`].value;
    let username = form[`username`].value;
    let password = form[`password`].value;
    let confirmPasword = form[`confirmPasword`].value;
    // dispatch(
    //   mutations.requestCreateUserAccount(
    //     name,
    //     username,
    //     password,
    //     confirmPasword
    //   )
    // );
  },
});

export const ConnectedRegisterUser = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(RegisterUser);
