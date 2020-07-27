import React from 'react';
import ReactDOM from 'react-dom';
import UsersNew from './UsersNew';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersNew />, div);
  ReactDOM.unmountComponentAtNode(div);
});