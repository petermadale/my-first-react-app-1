import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import "../styles/style.css";

export const Login = ({ authenticateUser, authenticated }) => (
  <div className="container-fluid mt-5">
    <div className="row justify-content-center">
      <div className="col-4">
        <div className="text-center">
          <form onSubmit={authenticateUser} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              className="form-control mb-2"
              type="text"
              name="username"
              id="username"
              placeholder="username"
              defaultValue="Admin"
              required
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              className="form-control mb-2"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              defaultValue=""
              required
            />

            {authenticated === mutations.NOT_AUTHENTICATED ? (
              <div className="alert alert-warning" role="alert">
                Login Incorrect
              </div>
            ) : null}

            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
          </form>
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
