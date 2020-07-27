import React from 'react';
import ReactDOM from 'react-dom';
import EmailJS from './EmailJS';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmailJS />, div);
  ReactDOM.unmountComponentAtNode(div);
});