import React from 'react';
import ReactDOM from 'react-dom';
import Clients from './Clients';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Clients />, div);
  ReactDOM.unmountComponentAtNode(div);
});