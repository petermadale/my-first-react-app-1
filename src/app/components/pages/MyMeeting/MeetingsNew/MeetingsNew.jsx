import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ConnectedContentHeader } from "../../../template/contentholders/ContentHeader";
import { ConnectedInputForm } from "../../../../scripts/inputForm";
import Select2 from "../../../../scripts/select2";
import { ConnectedAddMoreAttendee } from "../AddMoreAttendee/AddMoreAttendee";
import { ConnectedOtherLocation } from "../OtherLocation/OtherLocation";

import { toastjs } from "../../../../scripts/toastr";
import uuid from "uuid";
import { saveMeeting } from "../../../../store/mutations";

export const MeetingsNew = ({
  clientid,
  id,
  isAdmin,
  name,
  clientLocations,
  users,
  saveMeeting,
}) => (
  <>
    <ConnectedContentHeader pagename={"Meeting"} />
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">Add New Meeting for {name}</h3>
              </div>
              <form className="form-horizontal" onSubmit={saveMeeting}>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        type="hidden"
                        name="owner"
                        id="owner"
                        defaultValue={id}
                      />
                      <input
                        type="hidden"
                        name="client"
                        id="client"
                        defaultValue={clientid}
                      />
                      <Select2
                        label="People attending meeting"
                        defaultValue=""
                        options={users}
                        selected=""
                        name="attendees"
                        isMulti={true}
                        required
                      />
                      {isAdmin ? <ConnectedAddMoreAttendee /> : null}
                      {/* <ConnectedInputForm
                        label="People attending meeting"
                        type="text"
                        nameid="attendees"
                        required
                      /> */}
                    </div>
                    <div className="form-group col-md-6">
                      <Select2
                        label="Location of Meeting"
                        defaultValue=""
                        options={clientLocations}
                        selected=""
                        name="location"
                        isMulti={false}
                        required={clientLocations.length > 0 ? true : false}
                        isDisabled={clientLocations.length > 0 ? false : true}
                      />
                      <ConnectedOtherLocation />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <ConnectedInputForm
                        label="Date of Meeting"
                        type="date"
                        nameid="dateOfMeeting"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <ConnectedInputForm
                        label="Time of Meeting"
                        type="time"
                        nameid="timeOfMeeting"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="preMeetingNotes">Pre-meeting Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Pre-meeting Notes"
                        name="preMeetingNotes"
                      ></textarea>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="duringAfterMeetingNotes">
                        During/After Meeting Notes
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="During/After Meeting Notes"
                        name="duringAfterMeetingNotes"
                      ></textarea>
                    </div>
                  </div>
                  {isAdmin ? (
                    <div className="form-row d-none">
                      <div className="form-group col-md-12">
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            id="isVerified"
                            name="isVerified"
                            defaultChecked={isAdmin ? "Checked" : null}
                          />
                          <label
                            htmlFor="isVerified"
                            className="custom-control-label"
                          >
                            Verified
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="card-footer text-right">
                  <button
                    type="submit"
                    className="btn bg-gradient-success mr-2"
                  >
                    <i className="fas fa-save"></i> Save
                  </button>
                  <Link to="/clients" className="btn bg-gradient-danger">
                    <i className="fas fa-times-circle"></i> Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const clientid = ownProps.match.params.id;
  const { id, isAdmin } = state.session;
  const users = state.users.map((user) => {
    var fullname = user.firstName + " " + user.lastName;
    return { value: user.id, label: fullname };
  });
  const { name, clientContactDetails } = state.clients.find(
    (client) => client.id === clientid
  );
  const clientLocations = clientContactDetails.map((c) => {
    var label = c.address1 !== "" ? c.address1 : " ";
    label += c.address2 !== "" ? c.address2 + " " : " ";
    label += c.city !== "" ? c.city + " " : " ";
    label += c.state !== "" ? c.state + " " : " ";
    label += c.zip !== "" ? c.zip + " " : " ";
    return {
      value: label,
      label: label,
      name: label,
    };
  });
  return {
    clientid,
    id,
    isAdmin,
    name,
    clientLocations,
    users,
  };
};
const mapDispatchStateToProps = (dispatch, ownProps) => ({
  saveMeeting(e) {
    e.preventDefault();
    let form = e.target;
    const attendees = form[`attendees`];
    const attendeesMore = form[`attendeesMore`] ? form[`attendeesMore`] : null;
    const location = form[`location`];
    const otherLocation = form[`otherLocation`] ? form[`otherLocation`] : null;
    const dateOfMeeting = form[`dateOfMeeting`];
    const timeOfMeeting = form[`timeOfMeeting`];
    const preMeetingNotes = form[`preMeetingNotes`];
    const duringAfterMeetingNotes = form[`duringAfterMeetingNotes`];
    const isVerified = form[`isVerified`] ? form[`isVerified`] : false;
    const owner = form[`owner`];
    const client = form[`client`];
    var error_msg = [];

    if (attendees.required && attendees.value === "") {
      var err = attendees.placeholder + " is required.";
      error_msg.push(err);
    }
    if ((location.required && location.value === "") || (otherLocation && otherLocation.value === "")) {
      var err = location.placeholder + " is required.";
      error_msg.push(err);
    }

    if (error_msg.length > 0) {
      error_msg.forEach(function (e) {
        toastjs.error(e);
      });
    } else {
      var attendeesArr = attendees.value;
      attendeesArr = attendeesArr.split(",");
      var locationArr = otherLocation && otherLocation.value ? null : location.value;
      //locationArr = otherLocation.value ? null : locationArr.split(",");
      var otherLoc = otherLocation ? otherLocation.value : null;

      var attendeesMoreVal = attendeesMore ? attendeesMore.value : null;

      let meetingId = uuid();
      let dateCreated = new Date();
      const meetingData = {
        id: meetingId,
        owner: owner.value,
        client: client.value,
        attendees: attendeesArr,
        attendeesMore: attendeesMoreVal,
        location: locationArr,
        otherLocation: otherLoc,
        dateOfMeeting: dateOfMeeting.value,
        timeOfMeeting: timeOfMeeting.value,
        preMeetingNotes: preMeetingNotes.value,
        duringAfterMeetingNotes: duringAfterMeetingNotes.value,
        isVerified: isVerified.checked,
        dateCreated,
      };
      dispatch(saveMeeting(meetingData));
    }
  },
});
export const ConnectedMeetingsNew = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(MeetingsNew);
