import PropTypes from "prop-types";
import styles from "./ClientNameInput.module.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ConnectedInputForm } from "../../../../scripts/inputForm";
import { clientDataSets } from "../../../../../server/clientDataSets";
import Select2 from "../../../../scripts/select2";

class ClientNameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: props.name ? props.name : "",
      isDuplicate: false,
      isEmpty: true,
      isPristine: true,
      postNominalLetters: props.postNominalLetters,
      credentials: props.credentials
    };
  }

  onChange = (event) => {
    const { id, clients, isEdit } = this.props;
    const filterclients = isEdit
      ? clients.filter((client) => {
          return client.id !== id;
        })
      : clients;
    let isDuplicate = filterclients.some((client) => {
      return client.name.toLowerCase() === event.target.value.toLowerCase()
        ? true
        : false;
    });
    this.setState({
      nameValue: event.target.value,
      isDuplicate: isDuplicate,
    });
  };

  onBlur = (event) => {
    console.log(event.target.value);
    this.setState({
      isEmpty: event.target.value === "" ? true : false,
      isPristine: false,
    });
  };

  render() {
    const {
      nameValue,
      isDuplicate,
      isEmpty,
      isPristine,
      postNominalLetters,
    } = this.state;
    return (
      <>
        <div className="form-row mb-3">
          <div className="col-sm-6">
            <label htmlFor="name">
              Client Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="Client Name"
              name="name"
              id="name"
              className={`form-control${isDuplicate ? " is-warning" : ""}${
                isEmpty && !isPristine ? " is-invalid" : ""
              }`}
              data-isduplicate={`${isDuplicate ? true : false}`}
              onChange={this.onChange}
              onBlur={this.onBlur}
              defaultValue={nameValue}
              required
            />
            {isDuplicate ? (
              <p className="text-warning text-bold mb-0">
                <i>Name is already taken. Please choose another one.</i>
              </p>
            ) : null}
            {isEmpty && !isPristine ? (
              <p className="text-danger text-bold mb-0">
                <i>Client Name is required.</i>
              </p>
            ) : null}
          </div>
          {/* <div className="col-sm-3">
            <ConnectedInputForm
              label="Credentials"
              type="text"
              placeholder="e.g. PhD"
              nameid="postNominalLetters"
              defaultValue={postNominalLetters}
            />
          </div> */}
          <div className="col-sm-3">
            <ConnectedInputForm
              label="Post-nominal letters"
              type="text"
              placeholder="e.g. PhD"
              nameid="postNominalLetters"
              defaultValue={postNominalLetters}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  let clients = state.clients;
  let { id, name, isEdit, postNominalLetters } = ownProps;
  const { credentials } = clientDataSets;
  return {
    id,
    clients,
    name,
    isEdit,
    postNominalLetters,
    credentials
  };
};

export const ConnectedClientNameInput = connect(mapStatetoProps)(
  ClientNameInput
);
