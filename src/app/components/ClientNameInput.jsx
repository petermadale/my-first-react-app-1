import React, { Component } from "react";
import { connect } from "react-redux";

class ClientNameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: props.name ? props.name : "",
      isDuplicate: false,
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

  render() {
    const { nameValue, isDuplicate } = this.state;
    return (
      <>
        <div className="form-group">
          <label htmlFor="name">Client Name</label>
          <input
            type="text"
            placeholder="Client Name"
            name="name"
            id="name"
            className={`form-control ${isDuplicate ? "is-warning" : ""}`}
            data-isduplicate={`${isDuplicate ? true : false}`}
            onChange={this.onChange}
            defaultValue={nameValue}
            required
          />
          {isDuplicate ? (
            <p className="text-warning text-bold">
              <i>Name is already taken. Please choose another one.</i>
            </p>
          ) : null}
        </div>
      </>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  let clients = state.clients;
  let { id, name, isEdit } = ownProps;
  return {
    id,
    clients,
    name,
    isEdit,
  };
};

export const ConnectedClientNameInput = connect(mapStatetoProps)(
  ClientNameInput
);
