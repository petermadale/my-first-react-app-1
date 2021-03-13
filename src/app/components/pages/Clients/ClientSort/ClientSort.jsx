import React, {Component} from 'react';
import { connect } from "react-redux";

class ClientSort extends Component {
    constructor(props) {
        super();

        this.state = {
            clients: props.clients,
            locations: props.locations,
            selectedLocation: "",
            sortedClients: props.clients
        }
    }
    
  handleChange = (event) => {
      const {value} = event.target;
      const {clients} = this.state;
      let newSortedClients = [];
    this.setState({selectedLocation: value})
    clients.map((client) => {
        client.assignedLocations.map((loc) => {
            if(loc === value) newSortedClients.push(client)
        });
    })
    this.setState({sortedClients: value === "" ? clients : newSortedClients})
  };
    render() {
        const {locations, selectedLocation, sortedClients} = this.state;

        return (
            <>
            <div className="col-auto">   
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-location-arrow"></i></span>
                  </div>       
                <select className="form-control" value={selectedLocation} onChange={this.handleChange}>
                    <option value=""> Sort by Location</option>
                    {locations.map((loc) => 
                    <option value={loc.name} key={loc.id}>{loc.name}</option>
                    )}
                </select>
                </div>      
            </div>
            {sortedClients.map((client) => client.name)}
            </>
        )
    }
}
  
const mapStateToProps = (state, ownProps) => {
  return {ownProps};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ownProps;
};
export const ConnectedClientSort = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientSort);
