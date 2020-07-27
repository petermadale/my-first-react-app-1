import React from 'react';
import ReactDOM from 'react-dom';
import UsersEdit from './UsersEdit';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});