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


export const MyMeetings = ({ meetings, deleteMeeting }) => (
  <>
    <ConnectedContentHeader pagename={"My Meetings"} />
    <section className="content">
      <div className="card card-solid">
        <div className="card-body table-responsive p-0">
          {meetings.length > 0 ? (
            <table className="table table-striped table-hover text-nowrap">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Created By</th>
                  <th>People attending meeting</th>
                  <th>Location of Meeting</th>
                  <th>Date/Time of Meeting</th>
                  <th>Status</th>
                  <th className="action-btn"></th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting) => (
                  <tr key={meeting.id}>
                    <td>                    
                      <Link
                        className="btn bg-gradient-primary btn-sm mr-1"
                        to={`/client/${meeting.client}`}
                        target="_blank"
                      >
                        <i className="fas fa-user-nurse  mr-0"></i>{" "}
                        <ConnectedClientNameDisplay id={meeting.client} />
                      </Link>
                        
                    </td>
                    <td>
                      <ConnectedUsernameDisplay id={meeting.owner} />
                    </td>
                    <td>
                      {meeting.attendees.map((a, index) => (
                        <span key={a}>
                          {a}
                          {index + 1 === meeting.attendees.length ? null : ", "}
                        </span>
                      ))}
                      {meeting.attendeesMore ? (
                        <>
                          {", "}
                          {meeting.attendeesMore}
                        </>
                      ) : null}
                    </td>
                    <td>{meeting.location} {meeting.otherLocation ? meeting.otherLocation : null}</td>
                    <td>
                      <Moment format="YYYY/MM/DD hh:mm A">
                        {meeting.datetimeOfMeeting}
                      </Moment>
                    </td>
                    <td>{meeting.isVerified ? <span className="badge badge-success">Verified</span> : <span className="badge badge-warning">Not Yet Verified</span>}</td>
                    <td className="project-actions text-right">
                      <button
                        className="btn bg-gradient-danger btn-sm mr-1"
                        onClick={() => deleteMeeting(meeting.id)}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete"
                      >
                        <i className="fas fa-trash  mr-0"></i>
                      </button>
                      <Link
                        to={`/meeting/${meeting.id}`}
                        id={meeting.id}
                        className="btn bg-gradient-primary btn-sm"
                      >
                        <i className="fa fa-calendar-alt"></i>
                        Meeting Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  const meetings = mymeetings.map((meeting) => {
    return {
      ...meeting,
      datetimeOfMeeting: meeting.dateOfMeeting + " " + meeting.timeOfMeeting,
    };
  });
  return {
    meetings,
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
