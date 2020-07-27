import React from 'react';
import ReactDOM from 'react-dom';
import ClientsDetailLeft from './ClientsDetailLeft';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientsDetailLeft />, div);
  ReactDOM.unmountComponentAtNode(div);
});