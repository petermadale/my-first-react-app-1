import PropTypes from "prop-types";
import styles from "./ClientsAddress.module.css";
import React, { Component } from "react";
import { connect } from "react-redux";

class ClientsAddress extends Component {
  constructor(props) {
    super();

    this.state = {
      clientContactDetails: props.clientContactDetails,
      defaultContactDetails: props.clientContactDetails[0] ? props.clientContactDetails[0] : null,
      selectAddress: props.clientContactDetails[0],
      clientAddressOption: props.clientAddressOption ? props.clientAddressOption : null
    };
  }

  onClick = (contact) => {
    this.setState({
      clientContactDetails: this.state.clientContactDetails.map((c) => {
        return contact.id === c.id
          ? { ...c, isSelected: true }
          : { ...c, isSelected: false };
      }),
      selectAddress: contact,
    });
  };

  selectAddress = () => {
    this.setState({
      defaultContactDetails: this.state.selectAddress,
    });
  };

  render() {
    const { clientContactDetails, defaultContactDetails, clientAddressOption } = this.state;

    return (
      <div className="card card-client-primary">
        <div className="card-header">
          <h3 className="card-title">
            Address
            {clientContactDetails.length > 1 ? (
              <span className="badge badge-light ml-1">
                {clientContactDetails.length}
              </span>
            ) : null}
          </h3>
        </div>
        <div className="card-body">
            {clientAddressOption != "Has Address" ? 
                <p className="mb-0"><span className="badge badge-warning">{clientAddressOption}</span></p> : null}
          {defaultContactDetails ? 
          <ul className="list-group list-group-unbordered mb-3">
            {defaultContactDetails.address1 ? (
              <li className="list-group-item">
                <b>
                  <i className="fas fa-map-marker-alt mr-1"></i> Address
                </b>

                <p className="text-muted">
                  {defaultContactDetails.address1}{" "}
                  {defaultContactDetails.address2} {defaultContactDetails.city}{" "}
                  {defaultContactDetails.state} {defaultContactDetails.zip}
                </p>
              </li>
            ) : null}

            {defaultContactDetails.officePhoneNumber ? (
              <li className="list-group-item">
                <b>Office Phone # - (Ext)</b>{" "}
                <span className="float-right">
                  <a href={`tel:+${defaultContactDetails.officePhoneNumber}`}>
                    {defaultContactDetails.officePhoneNumber}
                  </a>
                  {defaultContactDetails.officePhoneNumberExt ? (
                    <span>
                      {" "}
                      - ({defaultContactDetails.officePhoneNumberExt})
                    </span>
                  ) : null}
                </span>
              </li>
            ) : null}
            {defaultContactDetails.cellPhoneNumber ? (
              <li className="list-group-item">
                <b>Cell Phone #</b>{" "}
                <a
                  className="float-right"
                  href={`tel:+${defaultContactDetails.cellPhoneNumber}`}
                >
                  {defaultContactDetails.cellPhoneNumber}
                </a>
              </li>
            ) : null}
            {defaultContactDetails.alternativePhoneNumber ? (
              <li className="list-group-item">
                <b>Alternative Phone #</b>{" "}
                <a
                  className="float-right"
                  href={`tel:+${defaultContactDetails.alternativePhoneNumber}`}
                >
                  {defaultContactDetails.alternativePhoneNumber}
                </a>
              </li>
            ) : null}
            {defaultContactDetails.faxNumber ? (
              <li className="list-group-item">
                <b>Fax Phone #</b>{" "}
                <a
                  className="float-right"
                  href={`tel:+${defaultContactDetails.faxNumber}`}
                >
                  {defaultContactDetails.faxNumber}
                </a>
              </li>
            ) : null}
          </ul>
          : null}
          {clientContactDetails.length > 1 ? (
            <button
              type="button"
              className="btn bg-gradient-primary"
              data-toggle="modal"
              data-target="#modal-more-address"
            >
              <i className="fa fa-plus-circle"></i> See More
            </button>
          ) : null}

          <div className="modal fade" id="modal-more-address">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header card-client-primary card-outline card-client">
                  <h4 className="modal-title">Address</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="card-body table-responsive p-0">
                    <table className="table table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th style={{ width: "2%" }}>#</th>
                          <th style={{ width: "20%" }}>Address</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Zip</th>
                          <th>Office Phone # (ext)</th>
                          <th>Cell Phone #</th>
                          <th>Alt Phone #</th>
                          <th>Fax #</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientContactDetails.map((contact, index) => (
                          <tr
                            key={contact.id}
                            onClick={() => this.onClick(contact)}
                            className={`${
                              contact.isSelected ? "table-success" : ""
                            }`}
                          >
                            <td>{index + 1}.</td>
                            <td>
                              {contact.address1} {contact.address2}
                            </td>
                            <td>{contact.city}</td>
                            <td>{contact.state}</td>
                            <td>{contact.zip}</td>
                            <td>
                              {contact.officePhoneNumber}{" "}
                              {contact.officePhoneNumberExt ? (
                                <>({contact.officePhoneNumberExt})</>
                              ) : null}
                            </td>
                            <td>{contact.cellPhoneNumber}</td>
                            <td>{contact.alternativePhoneNumber}</td>
                            <td>{contact.faxNumber}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn bg-gradient-success"
                    data-dismiss="modal"
                    onClick={this.selectAddress}
                  >
                    <i className="fas fa-mouse-pointer"></i> Select
                  </button>
                  <button
                    type="button"
                    className="btn bg-gradient-danger"
                    data-dismiss="modal"
                  >
                    <i className="fas fa-times-circle"></i> Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  clients: state.clients,
});
export const ConnectedClientsAddress = connect(mapStateToProps)(ClientsAddress);
