import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { ConnectedClientSuggestionList } from "../Clients/ClientSuggestionsList/ClientSuggestionsList";
import { ConnectedClientNameDisplay } from "../../ClientNameDisplay";
import { ConnectedUsernameDisplay } from "../../UsernameDisplay";
import moment from "moment";
import Moment from "react-moment";
import { ConnectedMeeting } from "../MyMeeting/Meeting/Meeting";

export const Dashboard = ({
  isAdmin,
  personalnotes,
  clientContactDetailsSuggestions,
  clientSuggestions,
  _24hourReminder
}) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      {_24hourReminder.length > 0 ? 
        
      <div className="card card-danger mb-3">
      <div className="card-header">
        <h3 className="card-title">
          24-hour Meeting Reminders
        </h3>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus"></i>
          </button>
        </div>
      </div>

         <div className="card-body table-responsive p-0">
           <ConnectedMeeting meetings={_24hourReminder} isAdmin={isAdmin} />
       </div>
    </div> : null
      }

      <div className="card card-warning mb-3">
        <div className="card-header">
          <h3 className="card-title">
            {!isAdmin ? <>Your</> : null} Client Suggestion(s)
          </h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>

        {clientSuggestions && clientSuggestions.length > 0 ? (
           <div className="card-body table-responsive p-0">
           <table className="table table table-hover text-nowrap">
             <thead>
               <tr>
                 <th style={{ width: "2%" }}></th>
                 <th>Client</th>
                 <th>Email</th>
                 <th>Suggested By</th>
                 <th>Status</th>
                 <th>&nbsp;</th>
               </tr>
             </thead>
             <tbody>
               {clientSuggestions.map((client, index) => (
                 <tr key={client.id}>
                   <td>{index + 1}.</td>
                   <td>{client.name}</td>
                   <td>{client.email}</td>             
                    <td>
                    <ConnectedUsernameDisplay id={client.lastUpdatedBy} />
                    </td>
                    <td>
                      {!client.isVerified ? <><span className="badge badge-warning">Not Yet Verified</span><br/></> : null}
                      {client.isDeleteRequest ? <span className="badge badge-warning">Delete Request Pending</span> : null}</td>
                    <td>
                    <Link
                        className="btn bg-gradient-warning btn-sm mr-1"
                        to={`/client/${client.id}/true`}
                        target="_blank"
                      >
                        <i className="fas fa-user-nurse mr-0"></i>{" "}
                        View
                      </Link>
                    </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
        ) : (
          <div className="card-body">
            <p>No suggestions found.</p>
          </div>
        )}
      </div>

      <div className="card card-cyan mb-3">
        <div className="card-header">
          <h3 className="card-title">
            {!isAdmin ? <>Your</> : null} Client Address Suggestion(s)
          </h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>

        {clientContactDetailsSuggestions.length > 0 ? (
          <ConnectedClientSuggestionList
            clientContactDetailsSuggestions={clientContactDetailsSuggestions}
          />
        ) : (
          <div className="card-body">
            <p>No suggestions found.</p>
          </div>
        )}
      </div>

      {isAdmin && personalnotes.length > 0 ? (
        <div className="card card-olive mb-3">
          <div className="card-header">
            <h3 className="card-title">Personal Notes</h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
              >
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <div className="card-body table-responsive p-0">
            <table className="table table table-hover text-nowrap">
              <thead>
                <tr>
                  <th style={{ width: "2%" }}></th>
                    <th>Client</th>
                  <th style={{ width: "20%" }}>Notes</th>
                  <th>Date/Time Created</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {personalnotes.map((note, index) => (
                  <tr key={note.id}>
                    <td>{index + 1}.</td>
                    <td><ConnectedClientNameDisplay id={note.client} /></td>
                    <td>
                      
                      {note.note}
                    </td>
                    <td>
                      <Moment format="MMM DD, YYYY hh:mm A">
                        {note.datetimecreated}
                      </Moment>
                    </td>
                    <td>
                      <ConnectedUsernameDisplay id={note.owner} />
                    </td>
                    <td>{note.isVerified ? (
                        <small className="badge badge-success">Verified</small>
                      ) : (
                        <small className="badge badge-warning">Not Yet Verified</small>
                      )}</td>
                    <td>
                      <Link
                        className="btn bg-gradient-olive btn-sm mr-1"
                        to={`/client/${note.client}`}
                        target="_blank"
                      >
                        <i className="fas fa-clipboard mr-0"></i>{" "}
                        View Note
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  </>
);

const mapStateToProps = (state) => {
  const {clientContactDetailsSuggestions, clientSuggestions, personalnotes} = state;
  let { isAdmin } = state.session;
  var dtoday = new Date();
  dtoday = moment(dtoday).format('YYYY-MM-DD');
  var _24hourReminder = state.mymeetings.filter((m) => m.dateOfMeeting == dtoday);
  return {
    isAdmin,
    personalnotes,
    clientContactDetailsSuggestions,
    clientSuggestions,
    _24hourReminder
  };
};

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
