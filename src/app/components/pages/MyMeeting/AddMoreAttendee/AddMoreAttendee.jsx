import React, { Component } from "react";
import styles from "./AddMoreAttendee.module.css";
import { connect } from "react-redux";

class AddMoreAttendee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreAttendee: props.defaultValue ? true : false,
      defaultValue: props.defaultValue ? props.defaultValue : null,
    };
  }

  handleClick = (event) => {
    console.log("clicked");
    this.setState({
      showMoreAttendee: !this.state.showMoreAttendee,
    });
  };

  render() {
    const { showMoreAttendee, defaultValue } = this.state;
    return (
      <>
        {showMoreAttendee ? (
          <>
            <div className="more-attendee">
              <input
                type="text"
                placeholder="Enter Name of other People attending here"
                name="attendeesMore"
                id="attendeesMore"
                className="form-control mt-1"
                defaultValue={defaultValue}
              />
            </div>
            <button
              type="button"
              className="btn btn-sm bg-gradient-danger mt-1"
              onClick={() => this.handleClick()}
            >
              <i className="fa fa-trash"></i> Remove
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-sm bg-gradient-primary mt-1"
            onClick={() => this.handleClick()}
          >
            <i className="fa fa-plus-circle"></i> Add More Attendee
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};

export const ConnectedAddMoreAttendee = connect(mapStateToProps)(
  AddMoreAttendee
);
