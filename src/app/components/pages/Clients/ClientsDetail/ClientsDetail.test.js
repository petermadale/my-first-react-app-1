import React from 'react';
import ReactDOM from 'react-dom';
import ClientsDetail from './ClientsDetail';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientsDetail />, div);
  ReactDOM.unmountComponentAtNode(div);
});