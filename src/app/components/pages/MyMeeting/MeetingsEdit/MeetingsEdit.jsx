import React from "react";
import styles from "./MeetingsEdit.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ConnectedContentHeader } from "../../../template/contentholders/ContentHeader";
import { ConnectedInputForm } from "../../../../scripts/inputForm";
import Select2 from "../../../../scripts/select2";
import { toastjs } from "../../../../scripts/toastr";
import { ConnectedAddMoreAttendee } from "../AddMoreAttendee/AddMoreAttendee";
import { processEditMeeting, processVerifyMeeting, onDeleteMeeting } from "../../../../store/mutations";
import { ConnectedOtherLocation } from "../OtherLocation/OtherLocation";
import moment from 'moment';
import { Toast, Swal_alert } from "../../../../scripts/sweetalert";

const MeetingsEdit = ({
    mymeeting,
    name,
    clientLocations,
    users,
    processEditMeeting,
    verifyMeeting,
    deleteMeeting,
    isAdmin
}) => (
    <>
        <ConnectedContentHeader pagename={"Meeting"} />
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card card-info">
                            <div className="card-header">
                                <h3 className="card-title">Edit Meeting for {name} {mymeeting.isVerified ? <small className="badge badge-success">Verified</small> : <small className="badge badge-warning">Not Yet Verified</small>}</h3>
                            </div>
                            <form className="form-horizontal" onSubmit={processEditMeeting}>
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <input
                                                type="hidden"
                                                name="owner"
                                                id="owner"
                                                defaultValue={mymeeting.owner}
                                            />
                                            <input
                                                type="hidden"
                                                name="client"
                                                id="client"
                                                defaultValue={mymeeting.client}
                                            />
                                            <Select2
                                                label="People attending meeting"
                                                defaultValue={mymeeting.attendees}
                                                options={users}
                                                selected={mymeeting.attendees}
                                                name="attendees"
                                                isMulti={true}
                                                required
                                                isDisabled={isAdmin ? false : true}
                                            />
                                            <ConnectedAddMoreAttendee
                                                defaultValue={mymeeting.attendeesMore}
                                                isDisabled={isAdmin ? false : true}
                                                isAdmin={isAdmin}
                                            />
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
                                                options={clientLocations}
                                                selected={mymeeting.location}
                                                name="location"
                                                required
                                                isDisabled={isAdmin ? false : true}
                                            />
                                            <ConnectedOtherLocation defaultValue={mymeeting.otherLocation} isAdmin={isAdmin} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <ConnectedInputForm
                                                label="Date of Meeting"
                                                type="date"
                                                nameid="dateOfMeeting"
                                                defaultValue={mymeeting.dateOfMeeting}
                                                isDisabled={isAdmin ? false : true}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <ConnectedInputForm
                                                label="Time of Meeting"
                                                type="time"
                                                nameid="timeOfMeeting"
                                                defaultValue={mymeeting.timeOfMeeting}
                                                isDisabled={isAdmin ? false : true}
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
                                                defaultValue={mymeeting.preMeetingNotes}
                                                disabled={isAdmin ? false : true}
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
                                                defaultValue={mymeeting.duringAfterMeetingNotes}
                                                disabled={isAdmin ? false : true}
                                            ></textarea>
                                        </div>
                                    </div>
                                    {isAdmin ? <div className="form-row d-none">
                                        <div className="form-group col-md-12">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="isVerified"
                                                    name="isVerified"
                                                    value="option1"
                                                    defaultChecked={mymeeting.isVerified}
                                                />
                                                <label
                                                    htmlFor="isVerified"
                                                    className="custom-control-label"
                                                >
                                                    Verified
                                                </label>
                                            </div>
                                        </div>
                                    </div> : null}
                                </div>
                                <div className="card-footer text-right">
                                    {isAdmin && !mymeeting.isVerified ? <button
                                        type="button"
                                        className="btn bg-gradient-warning mr-2"
                                        onClick={() => verifyMeeting(mymeeting.id)}
                                    >
                                        <i className="fas fa-thumbs-up"></i> Verify
                                    </button> : null}
                                    {isAdmin ? <><button
                                        type="submit"
                                        className="btn bg-gradient-success mr-2"
                                    >
                                        <i className="fas fa-save"></i> Save
                                    </button>
                                    <button
                                        type="button"
                                        className="btn bg-gradient-danger mr-2"
                                        onClick={() => deleteMeeting(mymeeting.id)}>
                                        <i className="fas fa-trash"></i> Delete
                                    </button></> : null}

                                    <Link to="/my-meetings" className="btn bg-gradient-secondary">
                                        <i className="fas fa-angle-double-left"></i> Back to My Meetings
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
    const isAdmin = state.session.isAdmin;
    const id = ownProps.match.params.id;
    var mymeeting = null;
    //if (isAdmin) {
    mymeeting = JSON.parse(
        JSON.stringify(state.mymeetings.find((meeting) => meeting.id === id))
    );
    if (mymeeting.attendees) {
        mymeeting.attendees = mymeeting.attendees.map((m) => {
            const { firstName, lastName } = state.users.find(
                (user) => m === user.id
            );
            const name = firstName + " " + lastName;
            return { value: m, label: name };
        });
    }
    // mymeeting.location = mymeeting.location.map((loc) => {
    //   return { value: loc, label: loc };
    // });
    //}
    const users = state.users.map((user) => {
        var fullname = user.firstName + " " + user.lastName;
        return { value: user.id, label: fullname };
    });
    const { name, clientContactDetails } = state.clients.find(
        (client) => client.id === mymeeting.client
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
        };
    });
    return {
        name,
        mymeeting,
        clientLocations,
        users,
        isAdmin
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const meetingid = ownProps.match.params.id;
    return {
        processEditMeeting(e) {
            e.preventDefault();
            const form = e.target;

            const attendees = form[`attendees`];
            const attendeesMore = form[`attendeesMore`]
                ? form[`attendeesMore`]
                : null;
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

            if (attendeesMore) {
                if (attendeesMore.value === "") {
                    var err = attendeesMore.placeholder + " is required.";
                    error_msg.push(err);
                }
            }
            if (!attendeesMore) {
                if (attendees.required && attendees.value === "") {
                    var err = attendees.placeholder + " is required.";
                    error_msg.push(err);
                }
            }

            if (otherLocation) {
                if (otherLocation.value === "") {
                    var err = otherLocation.placeholder + " is required.";
                    error_msg.push(err);
                }
            }

            if (!otherLocation) {
                if (location.required && location.value === "") {
                    var err = location.placeholder + " is required.";
                    error_msg.push(err);
                }
            }

            if (error_msg.length > 0) {
                error_msg.forEach(function (e) {
                    toastjs.error(e);
                });
            } else {
                var locationArr = otherLocation && otherLocation.value ? null : location.value;
                //locationArr = otherLocation.value ? null : locationArr.split(",");
                var otherLoc = otherLocation ? otherLocation.value : null;

                var attendeesArr = attendees && attendees.value ? attendees.value : null;//attendeesMore && attendeesMore.value ? null : attendees.value;
                attendeesArr = attendeesArr ? attendeesArr.split(",") : null;
                var attendeesMoreVal = attendeesMore ? attendeesMore.value : null;

                let dateModified = new Date();
                const meetingData = {
                    id: meetingid,
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
                    dateModified,
                };
                dispatch(processEditMeeting(meetingData));
            }
        },
        verifyMeeting(id) {
            const dateVerified = moment(new Date()).format('YYYY-MM-DD hh:mm A');
            dispatch(processVerifyMeeting(id, dateVerified));
        },
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
export const ConnectedMeetingsEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(MeetingsEdit);
