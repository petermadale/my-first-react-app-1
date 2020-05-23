import React from "react";
import { connect } from "react-redux";
import uuid from "uuid";
import { savePersonalNote } from "../store/mutations";

const PersonalNotesNew = ({ client, owner, isAdmin, savePersonalNote }) => (
  <>
    <form className="form-horizontal" onSubmit={savePersonalNote}>
      <input
        type="hidden"
        name="clientID"
        id="clientID"
        defaultValue={client.id}
        className="form-control"
        disabled
        readOnly
      />
      <input
        type="hidden"
        name="owner"
        id="owner"
        defaultValue={owner}
        className="form-control"
        disabled
        readOnly
      />
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
            required
          ></textarea>
        </div>
      </div>

      <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
          <div className="custom-control custom-switch mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id="isVerified"
              name="isVerified"
              onChange={() => this}
              disabled={`${isAdmin ? "" : "disabled"}`}
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
      </div>
      <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
          <button type="submit" className="btn btn-success">
            Save note
          </button>
        </div>
      </div>
    </form>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const client = ownProps.client;
  const owner = state.session.id;
  const isAdmin = state.session.isAdmin;
  return {
    client,
    owner,
    isAdmin,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    savePersonalNote(e) {
      e.preventDefault();
      const form = e.target;
      const id = uuid();
      const datetimecreated = new Date();
      const isVerified = form[`isVerified`].checked;
      const personalnote = {
        id,
        client: form[`clientID`].value,
        note: form[`note`].value,
        datetimecreated: datetimecreated.toLocaleString(),
        owner: form[`owner`].value,
        isVerified,
      };
      console.log(personalnote);
      dispatch(savePersonalNote(personalnote));
    },
  };
};

export const ConnectedPersonalNotesNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalNotesNew);
