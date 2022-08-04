import React, { Component } from "react";
import Select from "react-select";
import { toastjs } from "../scripts/toastr";

class Select2 extends Component {
  constructor(props) {
    super();

    this.state = {
      selected:
        props.selected && !props.isMulti
          ? { value: props.selected, label: props.selected }
          : props.selected,
      selectedValues: props.selected
        ? props.isMulti
          ? props.selected.map((s) => s.value)
          : props.selected
        : "",
      required: props.required ? true : false,
      label: props.label,
      isEmpty: true,
      isPristine: true,
      isDisabled: props.isDisabled ? true : false,
      allregions: false,
      maximumSelectionLength: props.maximumSelectionLength
        ? props.maximumSelectionLength
        : 0,
      onChange: props.onChange ? props.onChange : this.handleChange,
      otherLocation: props.otherLocation ? props.otherLocation : null,
      showOtherLocation: props.otherLocation ? true : false,
    };
  }

  handleChange = (newValue, actionMeta) => {
    const { maximumSelectionLength, isMulti, options, label } = this.props;

    if (newValue && newValue.length > maximumSelectionLength) {
      toastjs.error("Can only select up to 5 " + label + ".");
    } else {
      const showOtherLocation =
        (isMulti && newValue && newValue.some((v) => v.value === "Others")) ||
        (!isMulti && newValue && newValue.value === "Others")
          ? true
          : false;
      // if (newValue && newValue.length > 0) {
      //   showOtherLocation = newValue.some((v) => v.value === "Others");
      // } else {
      //   if (newValue && newValue.value === "Others") showOtherLocation = true;
      // }
      const selectedValues = isMulti
        ? newValue && newValue.length > 0
          ? newValue.map((s) => s.value)
          : ""
        : newValue.name || newValue.value;

      const allregions =
        newValue && newValue.length < options.length
          ? false
          : !newValue
          ? false
          : true;

      this.setState({
        selected: newValue,
        selectedValues,
        isEmpty: selectedValues === "" ? true : false,
        isPristine: false,
        allregions,
        showOtherLocation,
      });
    }
  };

  onBlur = (event) => {
    this.state.required
      ? this.setState({
          isEmpty: this.state.selectedValues === "" ? true : false,
          isPristine: false,
        })
      : null;
  };

  onAllRegionsChange = (event) => {
    const { checked } = event.target;
    checked
      ? this.setState({
          selectedValues: this.props.options.map((prop) => {
            return prop.value;
          }),
          selected: this.props.options.map((prop) => {
            return prop;
          }),
          allregions: true,
          isPristine: true,
          isEmpty: true,
        })
      : this.setState({
          selectedValues: "",
          selected: null,
          allregions: false,
          isPristine: false,
          isEmpty: false,
        });
  };

  render() {
    const { options, name, isMulti, label } = this.props;
    const {
      selected,
      selectedValues,
      required,
      isEmpty,
      isPristine,
      allregions,
      isDisabled,
      showOtherLocation,
      otherLocation,
      onChange,
    } = this.state;

    const isInvalid =
      required && selectedValues === "" && !isPristine ? true : false;

    var selectClassNames = isMulti ? "basic-multi-select" : "basic-single";
    selectClassNames += isInvalid ? " is-invalid" : "";

    return (
      <>
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <Select
          isMulti={isMulti && true}
          options={options}
          onChange={onChange}
          className={selectClassNames}
          classNamePrefix="select"
          value={selected}
          required={required}
          onBlur={this.onBlur}
          isDisabled={isDisabled}
          maximumSelectionLength
        />
        {label === "Location" && (
          <small className="font-italic">
            <label className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={this.onAllRegionsChange}
                value="allregions"
                checked={allregions}
                disabled={isDisabled}
              />
              All Regions
            </label>
          </small>
        )}
        {showOtherLocation && (
          <>
            <label htmlFor="otherLocation">Other Location</label>
            <input
              type="text"
              placeholder="Other Location"
              name="otherLocation"
              id="otherLocation"
              className="form-control"
              defaultValue={otherLocation}
              disabled={isDisabled}
            />
          </>
        )}
        <input
          type="hidden"
          id={name}
          name={name}
          defaultValue={selectedValues}
          required={required}
          placeholder={label}
        />
        {isInvalid && (
          <p className="text-danger text-bold mb-0">
            <i>{label} is required.</i>
          </p>
        )}
      </>
    );
  }
}

export default Select2;
