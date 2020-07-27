import React from 'react';
import ReactDOM from 'react-dom';
import ClientsNew from './ClientsNew';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientsNew />, div);
  ReactDOM.unmountComponentAtNode(div);
});