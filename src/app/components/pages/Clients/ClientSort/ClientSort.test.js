import React from 'react';
import ReactDOM from 'react-dom';
import ClientSort from './ClientSort';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientSort />, div);
  ReactDOM.unmountComponentAtNode(div);
});