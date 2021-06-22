import React from 'react';
import styles from './Meeting.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ConnectedClientNameDisplay } from '../../../ClientNameDisplay';
import { ConnectedUsernameDisplay } from '../../../UsernameDisplay';
import moment from "moment";
import Moment from "react-moment";

export const Meeting = ({ meetings, dtoday, isAdmin, deleteMeeting }) => (
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
                        {meeting.attendees ? meeting.attendees.map((a, index) => (
                            <span key={a}>
                                <ConnectedUsernameDisplay id={a} />
                                {index + 1 === meeting.attendees.length ? null : ", "}
                            </span>
                        )) : null}
                        {meeting.attendeesMore ? (
                            <>
                                {meeting.attendees ? ", " : null}
                                {meeting.attendeesMore}
                            </>
                        ) : null}
                    </td>
                    <td>{meeting.location} {meeting.otherLocation ? meeting.otherLocation : null}</td>
                    <td>
                        {dtoday == moment(meeting.dateOfMeeting).format('YYYY-MM-DD') ? <i className="fa fa-user-clock"></i> : null}
                        <Moment format="MMM DD, YYYY hh:mm A" className={`${dtoday == moment(meeting.dateOfMeeting).format('YYYY-MM-DD') ? "badge badge-danger" : null
                            }`}>
                            {meeting.datetimeOfMeeting}
                        </Moment>
                    </td>
                    <td>
                        {meeting.isVerified ? <span className="badge badge-success mr-1">Verified</span> : <span className="badge badge-warning">Not Yet Verified</span>}
                        {dtoday == moment(meeting.dateOfMeeting).format('YYYY-MM-DD') ? <span className="badge badge-danger">24-hour Remainder</span> : null}
                    </td>
                    <td className="project-actions text-right">
                        {isAdmin ?
                            <button
                                className="btn bg-gradient-danger btn-sm mr-1"
                                onClick={() => deleteMeeting(meeting.id)}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                            >
                                <i className="fas fa-trash  mr-0"></i>
                            </button> : null}
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
);

const mapStateToProps = (state, ownProps) => {
    const { meetings, isAdmin, deleteMeeting } = ownProps;
    var dtoday = new Date();
    dtoday = moment(dtoday).format('YYYY-MM-DD');
    return {
        meetings,
        dtoday,
        isAdmin,
        deleteMeeting
    };
}

export const ConnectedMeeting = connect(mapStateToProps)(Meeting);
