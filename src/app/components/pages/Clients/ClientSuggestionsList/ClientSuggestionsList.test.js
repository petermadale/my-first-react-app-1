import React from 'react';
import ReactDOM from 'react-dom';
import ClientSuggestionsList from './ClientSuggestionsList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientSuggestionsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});