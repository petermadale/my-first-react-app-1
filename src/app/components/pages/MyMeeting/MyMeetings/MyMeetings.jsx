import React from "react";
import { connect } from "react-redux";
import { ConnectedContentHeader } from "../../../template/contentholders/ContentHeader/ContentHeader";
import { Toast, Swal_alert } from "../../../../scripts/sweetalert";
import { onDeleteMeeting } from "../../../../store/mutations";
import moment from "moment";
import { ConnectedMeeting } from "../Meeting/Meeting";
import AlertComponent from "../../../reusableComponents/AlertComponent/AlertComponent";

export const MyMeetings = ({ meetings, deleteMeeting, isAdmin }) => (
  <>
    <ConnectedContentHeader pagename={"My Meetings"} />
    <section className="content">
      <div className="card card-solid">
        <div className="card-body table-responsive p-0">
          {meetings.length > 0 ? (
            <ConnectedMeeting
              meetings={meetings}
              isAdmin={isAdmin}
              deleteMeeting={deleteMeeting}
            />
          ) : (
            <AlertComponent type="warning" text="meetings" />
          )}
        </div>
      </div>
    </section>
  </>
);

const mapStateToProps = (state) => {
  const { mymeetings } = state;
  const { isAdmin } = state.session;
  var dtoday = new Date();
  dtoday = moment(dtoday).format("YYYY-MM-DD");
  const meetings = mymeetings.map((meeting) => {
    return {
      ...meeting,
      datetimeOfMeeting: meeting.dateOfMeeting + " " + meeting.timeOfMeeting,
    };
  });
  return {
    meetings,
    dtoday,
    isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMeeting(id) {
      Swal_alert.fire({
        title: "Are you sure?",
        html: "<b><i>All meeting details will be removed from the database.</i></b>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          dispatch(onDeleteMeeting(id));
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
