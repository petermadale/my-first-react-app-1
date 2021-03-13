import React from "react";
import { connect } from "react-redux";
import { ConnectedButtonFavorite } from "./clientfunctions/ButtonFavorite/ButtonFavorite";
import avatar from "../../../admin-lte/dist/img/avatar5.png";
import { Link } from "react-router-dom";
import { ConnectedClientContactDetails } from "./clientcontactdetails/ClientContactDetails";
import { ConnectedClientAddressModal } from "./ClientAddressModal";

const ClientsDetailLeft = ({ client, clientContactDetails }) => (
  <>
    <div className="card card-client-primary card-outline">
      <div className="card-body box-profile">
        {/* <ConnectedButtonFavorite client={client} /> */}
        {/* <div className="text-center">
          <img
            className="profile-user-img img-fluid img-circle"
            src={avatar}
            alt="User profile picture"
          />
        </div> */}

        <h3 className="profile-username text-center">
          {client.name}
          {client.postNominalLetters ? (
            <span className="post-nominal-letters">
              , {client.postNominalLetters}
            </span>
          ) : null}
        </h3>

        <ul className="list-group list-group-unbordered mb-3">
          <li className="list-group-item">
            <b>Email</b>{" "}
            <a className="float-right" href={`mailto:${client.email}`}>
              {client.email}
            </a>
          </li>
          {client.website ? (
            <li className="list-group-item">
              <b>Website</b>{" "}
              <a
                className="float-right"
                href={`${client.website}`}
                target="_blank"
              >
                {client.website}
              </a>
            </li>
          ) : null}
          {client.nameOfOrg ? (
            <li className="list-group-item">
              <b>Name of Organization</b>{" "}
              <span className="float-right">{client.nameOfOrg}</span>
            </li>
          ) : null}
          {client.titleWithOrg ? (
            <li className="list-group-item">
              <b>Title with Organization</b>{" "}
              <span className="float-right">{client.titleWithOrg}</span>
            </li>
          ) : null}
          {client.licenseNumber ? (
            <li className="list-group-item">
              <b>License Number</b>{" "}
              <span className="float-right">{client.licenseNumber}</span>
            </li>
          ) : null}
          {client.licenseExpiryDate ? (
            <li className="list-group-item">
              <b>License Expiry Date</b>{" "}
              <span className="float-right">{client.licenseExpiryDate}</span>
            </li>
          ) : null}
          {client.licenseLastVerifiedDate ? (
            <li className="list-group-item">
              <b>License Last Verified Date</b>{" "}
              <span className="float-right">
                {client.licenseLastVerifiedDate}
              </span>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
    <ConnectedClientAddressModal
      clientContactDetails={client.clientContactDetails}
    />
  </>
);

const mapStateToProps = (state, ownProps) => {
  const client = ownProps.client;
  const clientContactDetails = ownProps.client.clientContactDetails[0];
  return {
    client,
    clientContactDetails,
  };
};
export const ConnectedClientsDetailLeft = connect(mapStateToProps)(
  ClientsDetailLeft
);
