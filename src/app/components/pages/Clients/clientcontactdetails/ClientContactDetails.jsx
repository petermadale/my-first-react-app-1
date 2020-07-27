import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ConnectedClientContactDetailsEdit } from "./ClientContactDetailsEdit";
import { Toast, Swal_alert } from "../../../../scripts/sweetalert";
import { ConnectedClientAddressModalEdit } from "../ClientAddressModalEdit";

export const ClientContactDetails = ({
  clientContactDetails,
  clientcontact,
  clientID,
}) => (
  <>
    <ConnectedClientAddressModalEdit
      clientContactDetails={clientContactDetails}
      clientID={clientID}
    />
    {/* <div className="card-body table-responsive p-0">
      {isEdit ? (
        <ConnectedClientContactDetailsEdit
          clientcontact={clientcontact}
          clientID={clientID}
        />
      ) : (
        <ConnectedClientAddressModalEdit
          clientContactDetails={clientContactDetails}
        />
      )}
    </div>
    <div className="card-footer text-right">
      <Link
        to={`/add-client-contact-details/${clientID}`}
        id={clientID}
        className="btn bg-gradient-info mr-2"
      >
        <i className="fa fa-map-marker-alt"></i> Add Another Address
      </Link>
      <Link to="/clients" className="btn bg-gradient-secondary">
        <i className="fa fa-angle-double-left"></i> Back to Clients
      </Link>
    </div> */}
  </>
);

const mapStateToProps = (state, ownProps) => {
  const { clientID, clientContactDetails } = ownProps;
  const clientcontact = clientContactDetails.find(
    (contact) => contact.client === clientID && contact.toggleEdit
  );
  //const contactdetails = state.clientContactDetails;
  //const isEdit = clientcontact ? true : false;
  return {
    clientContactDetails,
    clientcontact,
    clientID,
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => {
  return {
    ownProps,
  };
};
export const ConnectedClientContactDetails = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(ClientContactDetails);
