import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Toast, Swal_alert } from "../../../../scripts/sweetalert";
import { deleteUserAccount } from "../../../../store/mutations";
import { ConnectedNoAccess } from "../../NoAccess/NoAccess";

const sampleConst = "";

export const Users = ({ users, isAdmin, deleteUserAccount }) => (
  <>
    {isAdmin ? (
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
                    to="/user-new"
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
            <div className="card-body table-responsive p-0">
              <table className="table table-striped table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Location</th>
                    <th className="d-none d-xl-block d-lg-none">Email</th>
                    <th>Username</th>
                    <th className="action-btn"></th>
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
                            {loc === "Others" ? user.otherLocation : loc}
                            {index + 1 === user.location.length ? null : ", "}
                          </span>
                        ))}
                      </td>
                      <td className="d-none d-xl-block d-lg-none">
                        {user.email}
                      </td>
                      <td>
                        {user.username === "Admin" && user.id === "User1" ? (
                          <span className="badge badge-success">ADMIN</span>
                        ) : (
                          user.username
                        )}
                      </td>
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
                          onClick={() => deleteUserAccount(user.id)}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          disabled={user.id === "User1" ? "disabled" : ""}
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
        </section>
      </>
    ) : (
      <ConnectedNoAccess />
    )}
  </>
);

const mapStateToProps = (state, ownProps) => {
  const users = state.users;
  const isAdmin = state.session.isAdmin;
  return { users, isAdmin };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteUserAccount(id) {
      Swal_alert.fire({
        title: "Are you sure?",
        html: "<b><i>All user's favorite list will also be removed from the database.</i></b>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          dispatch(deleteUserAccount(id));
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
