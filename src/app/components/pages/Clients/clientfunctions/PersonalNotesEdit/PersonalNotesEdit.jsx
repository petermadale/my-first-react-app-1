import styles from "./PersonalNotesEdit.module.css";
import React from "react";
import { connect } from "react-redux";
import {
  toggleEditClick,
  editPersonalNote,
} from "../../../../../store/mutations";
import { ConnectedUsernameDisplay } from "../../../../UsernameDisplay";

const PersonalNotesEdit = ({
  note,
  isAdmin,
  onToggleEdit,
  editPersonalNote,
}) => (
  <>
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
      </div>
      <form onSubmit={editPersonalNote}>
        <input type="hidden" value={isAdmin} name="isAdmin" />
        <div className="form-group row">
          <label htmlFor="note" className="col-sm-2 col-form-label">
            Note
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter ..."
              name="note"
              defaultValue={note.note}
              required
            ></textarea>
          </div>
        </div>
        {/* <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <div className="custom-control custom-switch mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="isVerified"
                name="isVerified"
                onChange={() => this}
                disabled={`${isAdmin ? "" : "disabled"}`}
                defaultChecked={note.isVerified}
              />
              <label className="custom-control-label" htmlFor="isVerified">
                {isAdmin ? (
                  <span>Unverified/Verified</span>
                ) : (
                  <span>Unverified</span>
                )}
              </label>
            </div>
          </div>
        </div> */}
        <p>
          <button
            className="btn btn-link link-black text-sm mr-2"
            type="submit"
          >
            <i className="fas fa-save mr-1"></i> Save
          </button>
          <button
            className="btn btn-link link-black text-sm"
            onClick={() =>
              onToggleEdit(note.id, (note.toggleEdit = !note.toggleEdit))
            }
          >
            <i className="fas fa-times-circle mr-1"></i> Cancel
          </button>
        </p>
      </form>
    </div>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const note = ownProps.note;
  const isAdmin = state.session.isAdmin;
  return {
    note: note,
    isAdmin,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleEdit(id, toggleEdit) {
      dispatch(toggleEditClick(id, toggleEdit));
    },
    editPersonalNote(e) {
      e.preventDefault();
      const { id, client, owner } = ownProps.note;
      const form = e.target;
      const datetimeupdated = new Date();
      //   const isVerified = form[`isVerified`].checked;
      const data = {
        id,
        client,
        note: form[`note`].value,
        datetimeupdated: datetimeupdated.toLocaleString(),
        owner,
        isVerified: form[`isAdmin`].value == "true" ? true : false,
      };
      console.log(data);
      dispatch(editPersonalNote(data));
    },
  };
};

export const ConnectedPersonalNotesEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalNotesEdit);
