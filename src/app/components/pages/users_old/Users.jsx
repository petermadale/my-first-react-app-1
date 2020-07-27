import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Toast, Swal_alert } from "../../../scripts/sweetalert";

export const Users = ({ users, isAdmin, deleteUser }) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Users</h1>
          </div>
          <div className="col-sm-6">
            {isAdmin ? (
              <Link
                to="/add-user"
                className="btn bg-gradient-success float-right"
              >
                <i className="fas fa-file-alt"></i>
                Create New User
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="card card-solid">
        <div className="card-body pb-0">
          <div className="row d-flex align-items-stretch">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Location</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>
                      {user.location.map((loc, index) => (
                        <span key={loc}>
                          {loc}
                          {index + 1 === user.location.length ? null : ", "}
                        </span>
                      ))}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td className="project-actions text-right">
                      {/* <Link
                        to={`/user/${user.id}/true`}
                        id={user.id}
                        className="btn bg-gradient-info btn-sm mr-1"
                      >
                        <i className="fas fa-pencil-alt"></i>
                        Edit
                      </Link> */}

                      <button
                        className="btn bg-gradient-danger btn-sm mr-1"
                        onClick={() => deleteUser(user.id)}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete"
                      >
                        <i className="fas fa-trash  mr-0"></i>
                      </button>
                      <Link
                        to={`/user/${user.id}/true`}
                        id={user.id}
                        className="btn bg-gradient-primary btn-sm"
                      >
                        <i className="fas fa-folder"></i>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const users = state.users;
  const isAdmin = state.session.isAdmin;
  return { users, isAdmin };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteUser(id) {
      Swal_alert.fire({
        title: "Are you sure?",
        html:
          "<b><i>All user's favorite list will also be removed from the database.</i></b>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          //dispatch(deleteClient(id));
          Toast.fire({
            icon: "success",
            title: "Client deleted.",
          });
        }
      });
    },
  };
};
export const ConnectedUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
