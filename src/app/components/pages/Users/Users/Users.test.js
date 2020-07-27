import React from 'react';
import ReactDOM from 'react-dom';
import Users from './Users';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Users />, div);
  ReactDOM.unmountComponentAtNode(div);
});