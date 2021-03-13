import React, { Component } from "react";
import { connect } from "react-redux";

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue ? props.defaultValue : "",
      placeholder: props.placeholder ? props.placeholder : props.label,
      isEmpty: true,
      isPristine: true,
      required: props.required ? true : false,
      label: props.label,
      nameid: props.nameid,
      type: props.type,
      pattern: props.pattern ? props.pattern : null,
      isDisabled: props.isDisabled ? true : false,
    };
  }

  onBlur = (event) => {
    this.state.required
      ? this.setState({
          isEmpty: event.target.value === "" ? true : false,
          isPristine: false,
        })
      : null;
  };

  render() {
    const {
      defaultValue,
      isEmpty,
      isPristine,
      required,
      label,
      nameid,
      type,
      placeholder,
      pattern,
      isDisabled,
    } = this.state;
    return (
      <>
        <label htmlFor={nameid}>
          {label} {required ? <span className="text-danger">*</span> : null}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          name={nameid}
          id={nameid}
          className={`form-control${
            isEmpty && !isPristine ? " is-invalid" : ""
          }`}
          onBlur={this.onBlur}
          defaultValue={defaultValue}
          required={required}
          pattern={pattern}
          disabled={isDisabled}
        />
        {isEmpty && !isPristine ? (
          <p className="text-danger text-bold mb-0">
            <i>{label} is required.</i>
          </p>
        ) : null}
      </>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  return ownProps;
};

export const ConnectedInputForm = connect(mapStatetoProps)(InputForm);
