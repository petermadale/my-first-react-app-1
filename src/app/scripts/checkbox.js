import React, { Component } from "react";

class Checkbox extends Component {
  constructor(props) {
    super();

    this.state = {
      checkedItems: props.defaultValue ? props.defaultValue : [],
      defaultValue: props.defaultValue ? props.defaultValue : [],
    };
  }

  handleChange = (e) => {
    const { value, checked } = e.target;
    const { checkedItems } = this.state;
    checkedItems.length == 0
      ? this.setState({
          checkedItems: [value],
        })
      : checkedItems.map((item) => {
          item !== value && checked
            ? this.setState({
                checkedItems: [...checkedItems, value],
              })
            : this.setState({
                checkedItems: checkedItems.filter((item) => {
                  return item !== value;
                }),
              });
        });
  };

  render() {
    const { label, checkboxItems, name } = this.props;
    return (
      <>
        <label htmlFor="">{label}</label>
        {checkboxItems.map((pop) => (
          <div className="custom-control custom-checkbox" key={pop.id}>
            <input
              className="custom-control-input"
              type="checkbox"
              onChange={this.handleChange}
              id={pop.id}
              value={pop.name}
              defaultChecked={pop.checked}
            />
            <label htmlFor={pop.id} className="custom-control-label">
              {pop.name}
            </label>
          </div>
        ))}
        <input
          type="hidden"
          name={name}
          id={name}
          defaultValue={this.state.checkedItems}
        />
      </>
    );
  }
}

export default Checkbox;
