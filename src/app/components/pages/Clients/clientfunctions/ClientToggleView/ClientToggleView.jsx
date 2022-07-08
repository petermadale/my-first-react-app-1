import React, { Component } from "react";

class ClientToggleView extends Component {
  constructor(props) {
    super();
    const { handleToggleView } = props;
    this.state = {
      handleToggleView,
      toggleView: "detail",
    };
  }

  handleToggle = (e) => {
    this.setState({ toggleView: e.currentTarget.value });
    this.state.handleToggleView(e.currentTarget.value);
  };

  render() {
    const { toggleView } = this.state;
    return (
      <>
        <div className="col-sm-auto">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={`btn btn-outline-dark ${
                toggleView === "detail" ? "active" : ""
              }`}
              value="detail"
              onClick={this.handleToggle}
            >
              <i className="fa fa-table mr-0"></i>
            </button>
            <button
              type="button"
              className={`btn btn-outline-dark ${
                toggleView === "list" ? "active" : ""
              }`}
              value="list"
              onClick={this.handleToggle}
            >
              <i className="fa fa-bars mr-0"></i>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ClientToggleView;
