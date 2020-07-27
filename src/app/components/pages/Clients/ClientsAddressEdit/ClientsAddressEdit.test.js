import React from 'react';
import ReactDOM from 'react-dom';
import ClientsAddressEdit from './ClientsAddressEdit';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientsAddressEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});