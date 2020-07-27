import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SearchClients.module.css";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";

const getSuggestions = (value, clients) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : clients.filter(
        (client) =>
          client.name.toLowerCase().slice(0, inputLength) === inputValue ||
          client.name
            .toLowerCase()
            .slice(
              client.name.indexOf(" ") + 1,
              client.name.indexOf(" ") + inputLength + 1
            ) === inputValue
      );
};

const getSuggestionValue = (suggestion) => suggestion.name;

const renderSuggestion = (suggestion) => (
  <Link to={`/client/${suggestion.id}`} key={suggestion.id} id={suggestion.id}>
    {suggestion.name}
    <br />
    <small>
      <i className="fa fa-map-marker-alt"></i>
      <i>
        {suggestion.clientContactDetails[0].address1}{" "}
        {suggestion.clientContactDetails[0].address1}{" "}
        {suggestion.clientContactDetails[0].city}{" "}
        {suggestion.clientContactDetails[0].state}{" "}
        {suggestion.clientContactDetails[0].zip}
      </i>
    </small>
  </Link>
);

class SearchInput extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.clients),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Search Clients",
      value,
      onChange: this.onChange,
      className: "form-control",
    };

    return (
      <div className="search-client">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  clients: state.clients,
});
export const ConnectedSearchInput = connect(mapStateToProps)(SearchInput);
