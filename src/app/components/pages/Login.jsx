import React from "react";
import { connect } from "react-redux";
import * as mutations from "../../store/mutations";
import "../../styles/style.css";
import logo from "../../images/crm_app_logo.png";
import { Link } from "react-router-dom";

export const Login = ({ authenticateUser, authenticated }) => (
  <div className="sign-in">
    <div className="login-box">
      <div className="login-logo">
        <img src={logo} alt="CRM App" />
      </div>
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>

          <form onSubmit={authenticateUser}>
            <div className="input-group mb-3">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                defaultValue="Admin"
                required
                className={`form-control ${
                  authenticated === mutations.NOT_AUTHENTICATED
                    ? "is-invalid"
                    : null
                }`}
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
                name="password"
                id="password"
                placeholder="password"
                defaultValue=""
                required
                className={`form-control ${
                  authenticated === mutations.NOT_AUTHENTICATED
                    ? "is-invalid"
                    : null
                }`}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
              {authenticated === mutations.NOT_AUTHENTICATED ? (
                <span
                  id="exampleInputEmail1-error"
                  className="error invalid-feedback"
                >
                  Invalid login details. Please try again.
                </span>
              ) : null}
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  type="submit"
                  className="btn bg-gradient-primary btn-block"
                  //   {...(authenticated === mutations.AUTHENTICATING
                  //     ? "disabled"
                  //     : null)}
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
          {/* <p className="mt-2">
            <Link to="/register" className="text-center">
              Click here to register.
            </Link>
          </p> */}
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
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  },
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(Login);
