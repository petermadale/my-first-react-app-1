import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import "../styles/style.css";

export const Login = ({ authenticateUser, authenticated }) => (
  <div className="sign-in">
    <div className="login-box">
      <div className="login-logo">
        <a href="#">
          <img src="src/app/images/crm_app_logo.png" alt="CRM App" />
        </a>
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
                className="form-control"
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
                className="form-control"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {authenticated === mutations.NOT_AUTHENTICATED ? (
                  <span
                    id="exampleInputEmail1-error"
                    className="error invalid-feedback"
                  >
                    Please enter a email address
                  </span>
                ) : null}
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
            </div>
          </form>
          <p className="mb-0">
            <a href="register.html" className="text-center">
              Register a new membership
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);
const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});

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
