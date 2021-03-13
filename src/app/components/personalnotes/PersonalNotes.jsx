import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toggleEditClick, deletePersonalNote } from "../../store/mutations";
import { ConnectedPersonalNotesEdit } from "./PersonalNotesEdit";
import { Toast, Swal_alert } from "../../scripts/sweetalert";
import { ConnectedUsernameDisplay } from "../UsernameDisplay";

const PersonalNotes = ({
  personalnotes,
  onToggleEdit,
  isEdit,
  noteEdit,
  deletePersonalNote,
  isAdmin,
}) => (
  <>
    {isEdit ? (
      <ConnectedPersonalNotesEdit note={noteEdit} />
    ) : (
      <>
        {personalnotes.map((note) => (
          <div className="post" key={note.id}>
            <div className="user-block">
              <span className="username">
                <a href="#">
                  <ConnectedUsernameDisplay id={note.owner} />
                </a>
              </span>
              <span className="description">
                Date/Time Posted - {note.datetimecreated}
              </span>
              {note.datetimeupdated ? (
                <span className="description">
                  Date/Time Updated - {note.datetimeupdated}
                </span>
              ) : null}
              <span className="description">
                {note.isVerified ? (
                  <strong className="text-success">
                    <i>Verified</i>
                  </strong>
                ) : (
                  <strong>
                    <i>Unverified</i>
                  </strong>
                )}
              </span>
            </div>
            <p>{note.note}</p>

            <p>
              {isAdmin ? (
                <button className="btn btn-link link-black text-sm mr-2">
                  <i className="fas fa-thumbs-up mr-1"></i> Verify
                </button>
              ) : null}
              <button
                className="btn btn-link link-black text-sm mr-2"
                onClick={() =>
                  onToggleEdit(note.id, (note.toggleEdit = !note.toggleEdit))
                }
              >
                <i className="fas fa-edit mr-1"></i> Edit
              </button>

              <button
                className="btn btn-link link-black text-sm"
                onClick={() => deletePersonalNote(note.id, note.client)}
              >
                <i className="fas fa-trash mr-1"></i> Delete
              </button>
            </p>
          </div>
        ))}
      </>
    )}
  </>
);

const mapStateToProps = (state, ownProps) => {
  const personalnotes = ownProps.client.personalnotes;
  const isAdmin = state.session.isAdmin;
  const isEdit = personalnotes.some((note) => {
    return note.toggleEdit ? true : false;
  });
  const noteEdit = personalnotes.find((note) => {
    return note.toggleEdit ? { ...note } : null;
  });
  return {
    personalnotes,
    isEdit,
    noteEdit,
    isAdmin,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleEdit(id, toggleEdit) {
      dispatch(toggleEditClick(id, toggleEdit));
    },
    deletePersonalNote(id, client) {
      Swal_alert.fire({
        title: "Are you sure you want to delete this note?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          dispatch(deletePersonalNote(id, client));
          Toast.fire({
            icon: "success",
            title: "Personal note deleted.",
          });
        }
      });
    },
  };
};

export const ConnectedPersonalNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalNotes);
