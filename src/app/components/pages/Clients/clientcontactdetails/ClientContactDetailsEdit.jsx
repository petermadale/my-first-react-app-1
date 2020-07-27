import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  clientContactToggleEditClick,
  updateClientContactDetails,
} from "../../../../store/mutations";
import NumberFormat from "react-number-format";

export const ClientContactDetailsEdit = ({
  clientcontact,
  onToggleEdit,
  clientID,
  updateClientContactDetails,
}) => (
  <>
    <form onSubmit={updateClientContactDetails}>
      <div className="form-group">
        <label htmlFor="address1">Address</label>
        <input
          type="text"
          placeholder="Address 1"
          name="address1"
          id="address1"
          className="form-control"
          defaultValue={clientcontact.address1}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address2">Address 2</label>
        <input
          type="text"
          placeholder="Address 2"
          name="address2"
          id="address2"
          className="form-control"
          defaultValue={clientcontact.address2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          placeholder="City"
          name="city"
          id="city"
          className="form-control"
          defaultValue={clientcontact.city}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input
          type="text"
          placeholder="State"
          name="state"
          id="state"
          className="form-control"
          defaultValue={clientcontact.state}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="zip">Zip</label>
        <input
          type="text"
          placeholder="Zip"
          name="zip"
          id="zip"
          className="form-control"
          defaultValue={clientcontact.zip}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Office Phone Number</label>
        <NumberFormat
          format="###-###-####"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          mask="_"
          placeholder="555-555-5555"
          title="e.g. 555-555-5555"
          name="officePhoneNumber"
          id="officePhoneNumber"
          className="form-control"
          defaultValue={clientcontact.officePhoneNumber}
        />
      </div>
      <div className="form-group">
        <label htmlFor="officePhoneNumberExt">
          Office Phone Extension Number
        </label>
        <input
          type="number"
          name="officePhoneNumberExt"
          id="officePhoneNumberExt"
          className="form-control"
          defaultValue={clientcontact.officePhoneNumberExt}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cellPhoneNumber">Cell Phone Number</label>
        <NumberFormat
          format="###-###-####"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          mask="_"
          placeholder="555-555-5555"
          title="e.g. 555-555-5555"
          name="cellPhoneNumber"
          id="cellPhoneNumber"
          className="form-control"
          defaultValue={clientcontact.cellPhoneNumber}
        />
      </div>
      <div className="form-group">
        <label htmlFor="alternativePhoneNumber">Alternative Phone Number</label>
        <NumberFormat
          format="###-###-####"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          mask="_"
          placeholder="555-555-5555"
          title="e.g. 555-555-5555"
          name="alternativePhoneNumber"
          id="alternativePhoneNumber"
          className="form-control"
          defaultValue={clientcontact.alternativePhoneNumber}
        />
      </div>
      <div className="form-group">
        <label htmlFor="faxNumber">Fax Number</label>

        <NumberFormat
          format="###-###-####"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          mask="_"
          placeholder="555-555-5555"
          title="e.g. 555-555-5555"
          name="faxNumber"
          id="faxNumber"
          className="form-control"
          defaultValue={clientcontact.faxNumber}
        />
      </div>

      <button type="submit" className="btn btn-sm bg-gradient-success mr-2">
        <i className="fas fa-save mr-1"></i> Save
      </button>
      {/* <Link to="/clients" className="btn bg-gradient-danger">
        Cancel
      </Link> */}
      <button
        type="button"
        className="btn btn-sm bg-gradient-danger"
        onClick={() =>
          onToggleEdit(
            clientID,
            clientcontact,
            (clientcontact.toggleEdit = !clientcontact.toggleEdit)
          )
        }
      >
        <i className="fas fa-times-circle mr-1"></i> Cancel
      </button>
    </form>
  </>
);

const mapStateToProps = (state, ownProps) => {
  let { clientID, clientcontact } = ownProps;
  const users = state.users;
  const { name, clientContactDetails } = state.clients.find(
    (client) => client.id === clientID
  );
  //   const clientcontact = clientContactDetails.find(
  //     (contact) => contact.id === id
  //   );
  return {
    clientcontact,
    users,
    name,
    clientID,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
    updateClientContactDetails(e) {
      e.preventDefault();
      const { id, client } = ownProps.clientcontact;
      const form = e.target;
      const clientContact = {
        id,
        client,
        address1: form[`address1`].value,
        address2: form[`address2`].value,
        city: form[`city`].value,
        state: form[`state`].value,
        zip: form[`zip`].value,
        officePhoneNumber: form[`officePhoneNumber`].value,
        officePhoneNumberExt: form[`officePhoneNumberExt`].value,
        cellPhoneNumber: form[`cellPhoneNumber`].value,
        alternativePhoneNumber: form[`alternativePhoneNumber`].value,
        faxNumber: form[`faxNumber`].value,
      };
      console.log(clientContact);
      dispatch(updateClientContactDetails(clientContact));
    },
    onToggleEdit(clientID, clientContactDetails, toggleEdit) {
      dispatch(
        clientContactToggleEditClick(clientID, clientContactDetails, toggleEdit)
      );
    },
  };
};
export const ConnectedClientContactDetailsEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientContactDetailsEdit);
