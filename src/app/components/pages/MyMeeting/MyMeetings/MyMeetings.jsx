import styles from "./MyMeetings.module.css";

import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { ConnectedContentHeader } from "../../../template/contentholders/ContentHeader/ContentHeader";
import { ConnectedUsernameDisplay } from "../../../UsernameDisplay";
import { ConnectedClientNameDisplay } from "../../../ClientNameDisplay";
import { Toast, Swal_alert } from "../../../../scripts/sweetalert";
import { deleteMeeting } from "../../../../store/mutations";
import moment from "moment";
import { ConnectedMeeting } from "../Meeting/Meeting";


export const MyMeetings = ({ meetings, deleteMeeting, dtoday, isAdmin }) => (
  <>
    <ConnectedContentHeader pagename={"My Meetings"} />
    <section className="content">
      <div className="card card-solid">
        <div className="card-body table-responsive p-0">
          {meetings.length > 0 ? (
            <ConnectedMeeting meetings={meetings} isAdmin={isAdmin} />
          ) : (
            <div className="alert alert-warning mb-0">
              <h5>
                <i className="icon fas fa-exclamation-triangle"></i>
                No meetings found.
              </h5>
            </div>
          )}
        </div>
      </div>
    </section>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const { mymeetings } = state;
  const { isAdmin } = state.session;
  var dtoday = new Date();
  dtoday = moment(dtoday).format('YYYY-MM-DD');
  const meetings = mymeetings.map((meeting) => {
    return {
      ...meeting,
      datetimeOfMeeting: meeting.dateOfMeeting + " " + meeting.timeOfMeeting,
    };
  });
  return {
    meetings,
    dtoday,
    isAdmin
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteMeeting(id) {
      Swal_alert.fire({
        title: "Are you sure?",
        html:
          "<b><i>All meeting details will be removed from the database.</i></b>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          dispatch(deleteMeeting(id));
          Toast.fire({
            icon: "success",
            title: "Meeting deleted.",
          });
        }
      });
    },
  };
};
export const ConnectedMyMeetings = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMeetings);
