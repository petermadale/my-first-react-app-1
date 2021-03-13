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
        : null,
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
    };
  }

  handleChange = (newValue, actionMeta) => {
    if (newValue.length > this.props.maximumSelectionLength) {
      toastjs.error("Can only select up to 5 " + this.props.label + ".");
    } else {
      const selectedValues = this.props.isMulti
        ? newValue
          ? newValue.map((s) => s.value)
          : null
        : newValue.name || newValue.value;
      this.setState({
        selected: newValue,
        selectedValues,
        isEmpty: selectedValues ? false : true,
        isPristine: false,
        allregions: newValue.length < this.props.options.length ? false : true,
      });
    }
  };
  onBlur = (event) => {
    this.state.required
      ? this.setState({
          isEmpty: this.state.selectedValues ? false : true,
          isPristine: false,
        })
      : null;
  };

  onAllRegionsChange = (event) => {
    const checked = event.target.checked;
    checked
      ? this.setState({
          selectedValues: this.props.options.map((prop) => {
            return prop.value;
          }),
          selected: this.props.options.map((prop) => {
            return prop;
          }),
          allregions: true,
        })
      : this.setState({
          selectedValues: null,
          selected: null,
          allregions: false,
        });
  };

  render() {
    const { options, name, isMulti, label, onChange } = this.props;
    const {
      selected,
      selectedValues,
      required,
      isEmpty,
      isPristine,
      allregions,
      isDisabled,
    } = this.state;
    return (
      <>
        {label ? (
          <label htmlFor={name}>
            {label} {required ? <span className="text-danger">*</span> : null}
          </label>
        ) : null}
        <Select
          isMulti={isMulti ? true : null}
          options={options}
          onChange={this.handleChange}
          className={`${isMulti ? "basic-multi-select" : "basic-single"}${
            isEmpty && !isPristine ? " is-invalid" : ""
          }`}
          classNamePrefix="select"
          value={selected}
          required={required}
          onBlur={this.onBlur}
          isDisabled={isDisabled}
          maximumSelectionLength
        />
        {label === "Location" ? (
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
        ) : null}
        <input
          type="hidden"
          id={name}
          name={name}
          defaultValue={selectedValues}
          required={required}
          placeholder={label}
        />
        {isEmpty && !isPristine && required ? (
          <p className="text-danger text-bold mb-0">
            <i>{label} is required.</i>
          </p>
        ) : null}
      </>
    );
  }
}

export default Select2;
