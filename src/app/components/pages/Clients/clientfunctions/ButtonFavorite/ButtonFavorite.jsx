import styles from "./ButtonFavorite.module.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addToMyFavorites,
  removeFromMyFavorites,
} from "../../../../../store/mutations";
import uuid from "uuid";

class ButtonFavorite extends Component {
  constructor(props) {
    super();

    this.state = {
      client: props.client,
      clientContactDetails: props.client.clientContactDetails,
      ownerID: props.ownerID,
      addRemoveToMyFavorites: props.addRemoveToMyFavorites,
      selectedAddress: null,
      floatRight: props.floatRight === undefined ? true : props.floatRight,
    };
  }

  addRemoveToMyFavorites = (
    id,
    myfave,
    ownerID,
    isFavorite,
    clientContactDetailsID
  ) => {
    this.props.addRemoveToMyFavorites(
      id,
      myfave,
      ownerID,
      isFavorite,
      clientContactDetailsID
    );
  };

  selectAddress = () => {
    this.setState({
      selectedAddress: this.state.selectedAddress,
    });
    const selectedClientContactDetailsID = this.state.selectedAddress.id;
    //if (this.state.selectedAddress.isFavorite) { //if true remove, if false add
    const isFavorite = (this.state.selectedAddress.isFavorite =
      !this.state.selectedAddress.isFavorite);
    const { id, myfave } = this.state.client;
    //const clientContactDetailsID = myfave.length > 0 ? myfave.find((fave) => {return fave.clientContactDetailsID === selectedClientContactDetailsID}) : this.state.selectedAddress.id;
    const ownerID = this.state.ownerID;
    //}
    const clientContactDetailsID = this.state.selectedAddress.id;
    this.props.addRemoveToMyFavorites(
      id,
      myfave,
      ownerID,
      isFavorite,
      clientContactDetailsID
    );
  };

  onSelectAddress = (contact) => {
    this.setState({
      clientContactDetails: this.state.clientContactDetails.map((c) => {
        return contact.id === c.id
          ? { ...c, isSelected: true }
          : { ...c, isSelected: false };
      }),
      selectedAddress: contact,
    });
  };

  render() {
    const {
      client,
      ownerID,
      addRemoveToMyFavorites,
      clientContactDetails,
      selectedAddress,
      floatRight,
    } = this.state;

    return (
      <>
        {clientContactDetails.length > 1 ? (
          <>
            <button
              className={`btn btn-link p-0${floatRight && " float-right"}`}
              data-toggle="modal"
              data-target="#modal-select-address"
            >
              <i
                data-toggle="tooltip"
                title={`${
                  client.isFavorite
                    ? "Remove from My Favorites."
                    : "Add to My Favorites"
                }`}
                className={`fas fa-heart ${
                  client.isFavorite ? "text-danger" : "text-muted"
                }`}
              ></i>
            </button>
            <div className="modal fade" id="modal-select-address">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header card-client-primary card-outline card-client">
                    <h4 className="modal-title">{client.name} - Address</h4>
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
                              onClick={() => this.onSelectAddress(contact)}
                              className={`${
                                contact.isSelected ? "table-success" : ""
                              }`}
                            >
                              <td>
                                <i
                                  data-toggle="tooltip"
                                  title={`${
                                    contact.isFavorite
                                      ? "Remove from My Favorites."
                                      : "Add to My Favorites"
                                  }`}
                                  className={`fas fa-heart ${
                                    contact.isFavorite
                                      ? "text-danger"
                                      : "text-muted"
                                  }`}
                                ></i>{" "}
                                {index + 1}.
                              </td>
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
                    {selectedAddress ? (
                      selectedAddress.isFavorite ? (
                        <button
                          type="button"
                          className="btn bg-gradient-danger"
                          data-dismiss="modal"
                          onClick={this.selectAddress}
                        >
                          <i className="fas fa-trash"></i> Remove from My
                          Favorites
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn bg-gradient-success"
                          data-dismiss="modal"
                          onClick={this.selectAddress}
                        >
                          <i className="fas fa-plus-circle"></i> Add to My
                          Favorites
                        </button>
                      )
                    ) : null}
                    {/* // <button
                        //     type="button"
                        //     className="btn bg-gradient-success"
                        //     data-dismiss="modal"
                        //     onClick={this.selectAddress}
                        // >
                        //     <i className="fas fa-mouse-pointer"></i> Select
                        // </button> */}
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
          </>
        ) : (
          <button
            className={`btn btn-link p-0${floatRight && " float-right"}`}
            onClick={() =>
              this.addRemoveToMyFavorites(
                client.id,
                client.myfave,
                ownerID,
                (client.isFavorite = !client.isFavorite),
                clientContactDetails[0].id
              )
            }
            data-toggle="tooltip"
            title={`${
              client.isFavorite
                ? "Remove from My Favorites."
                : "Add to My Favorites"
            }`}
          >
            <i
              className={`fas fa-heart ${
                client.isFavorite ? "text-danger" : "text-muted"
              }`}
            ></i>
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const client = ownProps.client;
  const ownerID = state.session.id;
  return {
    client,
    ownerID,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addRemoveToMyFavorites(
      clientID,
      myfave,
      ownerID,
      isFavorite,
      clientContactDetailsID
    ) {
      const myfaveID = isFavorite ? uuid() : null; //move myfaveid uuid to server
      const fave =
        myfave.length > 0
          ? myfave.find(
              (fave) => fave.clientContactDetailsID === clientContactDetailsID
            )
          : null;
      if (fave && fave.id)
        dispatch(
          removeFromMyFavorites(fave.id, clientContactDetailsID, clientID)
        );
      else
        dispatch(
          addToMyFavorites(
            myfaveID,
            clientID,
            ownerID,
            isFavorite,
            clientContactDetailsID
          )
        );
    },
  };
};
export const ConnectedButtonFavorite = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonFavorite);
