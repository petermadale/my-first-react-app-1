import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import "../styles/style.css";
import logo from "../images/crm_app_logo.png";
import { Link } from "react-router-dom";

export const RegisterUser = ({ requestCreateUserAccount, authenticated }) => (
  <div className="sign-in">
    <div className="register-box">
      <div className="register-logo">
        <img src={logo} alt="CRM App" />
      </div>

      <div className="card">
        <div className="card-body register-card-body">
          <p className="login-box-msg">Register a new account.</p>

          <form onSubmit={requestCreateUserAccount}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                name="name"
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
                className="form-control"
                placeholder="Username"
                name="username"
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

const mapDispatchStateToProps = (dispatch) => ({
  requestCreateUserAccount(e) {
    e.preventDefault();
    let form = e.target;
    let name = form[`name`].value;
    let username = form[`username`].value;
    let password = form[`password`].value;
    let confirmPasword = form[`confirmPasword`].value;
    dispatch(
      mutations.requestCreateUserAccount(
        name,
        username,
        password,
        confirmPasword
      )
    );
  },
});

export const ConnectedRegisterUser = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(RegisterUser);
