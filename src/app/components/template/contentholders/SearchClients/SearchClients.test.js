import React from 'react';
import ReactDOM from 'react-dom';
import SearchClients from './SearchClients';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchClients />, div);
  ReactDOM.unmountComponentAtNode(div);
});