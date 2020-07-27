import React from 'react';
import ReactDOM from 'react-dom';
import ClientsEdit from './ClientsEdit';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientsEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});