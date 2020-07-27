import React from 'react';
import ReactDOM from 'react-dom';
import ClientNameInput from './ClientNameInput';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientNameInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});