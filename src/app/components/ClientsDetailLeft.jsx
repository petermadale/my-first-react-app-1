import React from "react";
import { connect } from "react-redux";
import { ConnectedButtonFavorite } from "./ButtonFavorite";
import avatar from "../admin-lte/dist/img/avatar5.png";

const ClientsDetailLeft = ({ client }) => (
  <>
    <div className="card card-primary card-outline">
      <div className="card-body box-profile">
        <ConnectedButtonFavorite client={client} />
        <div className="text-center">
          <img
            className="profile-user-img img-fluid img-circle"
            src={avatar}
            alt="User profile picture"
          />
        </div>

        <h3 className="profile-username text-center">{client.name}</h3>

        <ul className="list-group list-group-unbordered mb-3">
          <li className="list-group-item">
            <b>Email</b>{" "}
            <a className="float-right" href={`mailto:${client.email}`}>
              {client.email}
            </a>
          </li>
          {client.phone ? (
            <li className="list-group-item">
              <b>Phone #</b>{" "}
              <a className="float-right" href={`tel:+${client.phone}`}>
                {client.phone}
              </a>
            </li>
          ) : null}
          {client.ext ? (
            <li className="list-group-item">
              <b>Ext #</b> <a className="float-right">{client.ext}</a>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">About Me</h3>
      </div>
      <div className="card-body">
        {client.address ? (
          <>
            <strong>
              <i className="fas fa-map-marker-alt mr-1"></i> Address
            </strong>

            <p className="text-muted">{client.address}</p>

            <hr />
          </>
        ) : null}
        {client.cell ? (
          <>
            <strong>
              <i className="fas fa-mobile mr-1"></i> Cell Phone
            </strong>

            <p className="text-muted">
              <a href={`tel:+${client.cell}`}>{client.cell}</a>
            </p>

            <hr />
          </>
        ) : null}

        {client.fax ? (
          <>
            <strong>
              <i className="fas fa-fax mr-1"></i> Fax
            </strong>

            <p className="text-muted">{client.fax}</p>
          </>
        ) : null}
      </div>
    </div>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const client = ownProps.client;
  return {
    client,
  };
};
export const ConnectedClientsDetailLeft = connect(mapStateToProps)(
  ClientsDetailLeft
);
