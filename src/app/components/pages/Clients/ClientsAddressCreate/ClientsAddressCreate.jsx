import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { ConnectedInputForm } from '../../../../scripts/inputForm';
import styles from './ClientsAddressCreate.module.css';


class ClientsAddressCreate extends Component {
  constructor(props) {
    super();

    this.state = {
      selectedAddressOption: props.selectedAddressOption ? props.selectedAddressOption : "Has Address",
      isNew: props.isNew
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedAddressOption: event.target.value
    })
  }

  render () {
    const { selectedAddressOption, isNew } = this.state;
    const clientAddressOption = [
      {id: "hasAddress", label: "Create Address", value: "Has Address", display: isNew},
      {id: "teletherapy", label: "Teletherapy", value: "Teletherapy", display: true},
      {id: "noPhysicalAddress", label: "No Physical Address", value: "No Physical Address", display: true},
      {id: "dontListAddress", label: "Don't List Address", value: "Don't List Address", display: true},
    ];
    return (
      <>
      <div className="form-group">
        <label>Client Address Option:</label>
        <div>
        {clientAddressOption.map(option => (
          <div className={`custom-control custom-radio custom-control-inline ${!option.display ? "d-none" : ""}`} key={option.id}>
            <input type="radio" id={option.id} name="clientAddressOption" className="custom-control-input" value={option.value} defaultChecked={selectedAddressOption === option.value} onChange={this.onValueChange} />
            <label className="custom-control-label" htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
        </div>
      </div>
        {/* <div className="btn-group btn-group-toggle" data-toggle="buttons">
        {clientAddressOption.map(option => (
          <label className={`btn btn-secondary ${!option.display ? "d-none" : ""}`} key={option.id}>
            <input type="radio" id={option.id} name="clientAddressOption" value={option.value} defaultChecked={selectedAddressOption === option.value} onChange={this.onValueChange}/> {option.label}
          </label>

        ))}
        </div> */}
        {selectedAddressOption === 'Has Address' && isNew ? 
          <>
          <div className="form-group">
            <ConnectedInputForm
              label="Address 1"
              type="text"
              nameid="address1"
              required
            />
          </div>
          <div className="form-group">
            <ConnectedInputForm
              label="Address 2"
              type="text"
              nameid="address2"
            />
          </div>
          <div className="form-row mb-3">
            <div className="col-sm-6 col-12">
              <ConnectedInputForm
                label="Work Email"
                type="email"
                nameid="workEmail"
                placeholder="email@gmail.com"
              />
            </div>
            <div className="col-sm-6 col-12">
              <ConnectedInputForm
                label="Aleternate Email"
                type="email"
                nameid="alternateEmail"
                placeholder="email@gmail.com"
              />
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col-sm-6 col-12">
              <ConnectedInputForm
                label="City"
                type="text"
                nameid="city"
              />
            </div>
            <div className="col-sm-3 col-12">
              <ConnectedInputForm
                label="State"
                type="text"
                nameid="state"
              />
            </div>
            <div className="col-sm-3 col-12">
              <ConnectedInputForm
                label="Zip"
                type="text"
                nameid="zip"
              />
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col-sm-6 col-12">
              <label htmlFor="officePhoneNumber">
                Office Phone Number
              </label>
              <NumberFormat
                format="###-###-####"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                mask="_"
                placeholder="555-555-5555"
                title="e.g. 555-555-5555"
                name="officePhoneNumber"
                id="officePhoneNumber"
                className="form-control"
                defaultValue=""
              />
            </div>
            <div className="col-sm-6 col-12">
              <ConnectedInputForm
                label="Extension Number"
                type="number"
                nameid="officePhoneNumberExt"
              />
            </div>
          </div>
  
          <div className="form-row mb-3">
            <div className="col-sm-4 col-12">
              <label htmlFor="cellPhoneNumber">
                Cell Phone Number
              </label>
              <NumberFormat
                format="###-###-####"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                mask="_"
                placeholder="555-555-5555"
                title="e.g. 555-555-5555"
                name="cellPhoneNumber"
                id="cellPhoneNumber"
                className="form-control"
                defaultValue=""
              />
            </div>
            <div className="col-sm-4 col-12">
              <label htmlFor="alternativePhoneNumber">
                Alternative Phone Number
              </label>
              <NumberFormat
                format="###-###-####"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                mask="_"
                placeholder="555-555-5555"
                title="e.g. 555-555-5555"
                name="alternativePhoneNumber"
                id="alternativePhoneNumber"
                className="form-control"
                defaultValue=""
              />
            </div>
            <div className="col-sm-4 col-12">
              <label htmlFor="faxNumber">Fax Number</label>
  
              <NumberFormat
                format="###-###-####"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                mask="_"
                placeholder="555-555-5555"
                title="e.g. 555-555-5555"
                name="faxNumber"
                id="faxNumber"
                className="form-control"
                defaultValue=""
              />
            </div>
          </div>
          </>
        : null}
      </>
    )
  }
}

const mapStatetoProps = (state, ownProps) => {
  return state;
}

export const ConnectedClientsAddressCreate = connect(mapStatetoProps)(ClientsAddressCreate);
