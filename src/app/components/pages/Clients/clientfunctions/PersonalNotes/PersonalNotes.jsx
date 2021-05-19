import styles from "./PersonalNotes.module.css";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  toggleEditClick,
  deletePersonalNote,
  checkNoteID,
  verifyPersonalNote,
} from "../../../../../store/mutations";
import { ConnectedPersonalNotesEdit } from "../PersonalNotesEdit/PersonalNotesEdit"; //"./PersonalNotesEdit";
import { Toast, Swal_alert } from "../../../../../scripts/sweetalert";
import { ConnectedUsernameDisplay } from "../../../../UsernameDisplay";
import moment from "moment";
import { lastContactMethod } from "../../../../../scripts/lastContactMethod";

const PersonalNotes = ({
  personalnotes,
  onToggleEdit,
  isEdit,
  noteEdit,
  deletePersonalNote,
  verifyPersonalNote,
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
                Created by: <ConnectedUsernameDisplay id={note.owner} />
              </span>
              <span className="description">
                Date/Time Posted: {note.datetimecreated}
              </span>
              {note.datetimeupdated ? (
                <span className="description">
                  Date/Time Updated - {note.datetimeupdated}
                </span>
              ) : null}
              <span className="description">
                {note.isVerified ? (
                  <i
                    className="fa fa-thumbs-up text-success"
                    data-toggle="tooltip"
                    title="Verified"
                  ></i>
                ) : (
                  <i
                    className="fa fa-thumbs-down text-danger"
                    data-toggle="tooltip"
                    title="Unverified"
                  ></i>
                )}{" "}
              </span>
            </div>
            <p>{note.note}</p>

            <p>
              {isAdmin && !note.isVerified ? (
                <button
                  className="btn btn-link link-black text-sm mr-2"
                  onClick={() =>
                    verifyPersonalNote(note.id, note.isVerified, note.client, note.owner)
                  }
                >
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
  const isEdit = personalnotes ? personalnotes.some((note) => {
    return note.toggleEdit ? true : false;
  }) : false;
  const noteEdit = personalnotes? personalnotes.find((note) => {
    return note.toggleEdit ? { ...note } : null;
  }) : null;
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
          //dispatch(deletePersonalNote(id, client));
          dispatch(checkNoteID(id));
          //   Toast.fire({
          //     icon: "success",
          //     title: "Personal note deleted.",
          //   });
        }
      });
    },
    verifyPersonalNote(id, isVerified, client, owner) {
      const title = isVerified
        ? "Unverify personal note?"
        : "Verify personal note?";
      Swal_alert.fire({
        title: title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.value) {
          isVerified = !isVerified;
          const notedata = { 
            id: id, 
            isVerified: isVerified, 
            owner: owner,
            client: client,  
            approvedDate: moment(new Date()).format("YYYY-MM-DD hh:mm:ss a"),
            lastContactMethod: lastContactMethod.personalNote
          };
          dispatch(verifyPersonalNote(notedata));
        }
      });
    },
  };
};

export const ConnectedPersonalNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalNotes);
