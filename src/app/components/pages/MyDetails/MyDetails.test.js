import React from 'react';
import ReactDOM from 'react-dom';
import MyDetails from './MyDetails';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});