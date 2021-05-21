import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { ConnectedInputForm } from '../../../../scripts/inputForm';
import styles from './ClientsAddressCreate.module.css';

class ClientsAddressCreate extends Component {
  constructor(props) {
    super();

    this.state = {
      selectedAddressOption: "Has Address"
    };

    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedAddressOption: event.target.value
    })
  }

  render () {
    return (
      <>
        <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="hasAddress" name="clientAddressOption" className="custom-control-input" value="Has Address" defaultChecked onChange={this.onValueChange} />
          <label className="custom-control-label" htmlFor="hasAddress">Create Address</label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="teletherapy" name="clientAddressOption" className="custom-control-input" value="Teletherapy" onChange={this.onValueChange} />
          <label className="custom-control-label" htmlFor="teletherapy">Teletherapy</label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="noPhysicalAddress" name="clientAddressOption" className="custom-control-input" value="No Physical Address" onChange={this.onValueChange} />
          <label className="custom-control-label" htmlFor="noPhysicalAddress">No Physical Address</label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input type="radio" id="dontListAddress" name="clientAddressOption" className="custom-control-input" value="Don't List Address" onChange={this.onValueChange} />
          <label className="custom-control-label" htmlFor="dontListAddress">Don't List Address</label>
        </div>
        {this.state.selectedAddressOption === 'Has Address' ? 
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
