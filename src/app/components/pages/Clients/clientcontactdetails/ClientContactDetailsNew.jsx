import React from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { history } from "../../../../store/history";
import uuid from "uuid";
import { createClientContactDetails } from "../../../../store/mutations";

export const ClientContactDetailsNew = ({
  client,
  history,
  createClientContactDetails,
}) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Client Detail</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Add new Address</h3>
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
            <div className="card-body">
              <form onSubmit={createClientContactDetails}>
                <div className="form-group">
                  <label htmlFor="name">Client Name</label>
                  <input
                    type="text"
                    placeholder="Client Name"
                    name="name"
                    id="name"
                    className="form-control"
                    defaultValue={client.name}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address1">Address</label>
                  <input
                    type="text"
                    placeholder="Address 1"
                    name="address1"
                    id="address1"
                    className="form-control"
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
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="alternativePhoneNumber">
                    Alternative Phone Number
                  </label>
                  <NumberFormat
                    format="###-###-####"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    mask="_"
                    placeholder="555-555-5555"
                    title="e.g. 555-555-5555"
                    name="alternativePhoneNumber"
                    id="alternativePhoneNumber"
                    className="form-control"
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
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-sm bg-gradient-success mr-2"
                >
                  <i className="fas fa-save mr-1"></i> Save
                </button>
                <button
                  type="button"
                  className="btn btn-sm bg-gradient-danger"
                  onClick={history.goBack}
                >
                  <i className="fas fa-times-circle mr-1"></i> Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const clientID = ownProps.match.params.clientID;
  const client = state.clients.find((client) => {
    return client.id === clientID ? client.name : null;
  });
  return {
    client,
    history,
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => {
  return {
    createClientContactDetails(e) {
      e.preventDefault();
      const form = e.target;
      const clientID = ownProps.match.params.clientID;
      const clientContactID = uuid();
      const clientContactData = {
        id: clientContactID,
        client: clientID,
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
      console.log(clientContactData);
      dispatch(createClientContactDetails(clientContactData));
    },
  };
};
export const ConnectedClientContactDetailsNew = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(ClientContactDetailsNew);
