import React from 'react';
import ReactDOM from 'react-dom';
import ClientsAddress from './ClientsAddress';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientsAddress />, div);
  ReactDOM.unmountComponentAtNode(div);
});