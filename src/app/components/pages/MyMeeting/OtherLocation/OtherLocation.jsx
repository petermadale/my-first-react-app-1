import React, {Component} from "react";
import { connect } from "react-redux";


class OtherLocation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showOtherLoc: props.defaultValue ? true : false,
        defaultValue: props.defaultValue ? props.defaultValue : "",
      };
    }
  
    handleClick = (event) => {
      console.log("clicked");
      this.setState({
        showOtherLoc: !this.state.showOtherLoc,
      });
    };
  
    render() {
      const { showOtherLoc, defaultValue } = this.state;
      return (
        <>
          {showOtherLoc ? (
            <>
              <div className="other-location">
              <input
                    type="text"
                    placeholder="If other location, indicate here"
                    name="otherLocation"
                    id="otherLocation"
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
              <i className="fa fa-plus-circle"></i> Other Location
            </button>
          )}
        </>
      );
    }
  }

const mapStateToProps = (state, ownProps) => {
    const {defaultValue} = ownProps;
  return {defaultValue};
};
export const ConnectedOtherLocation = connect(mapStateToProps)(OtherLocation);
