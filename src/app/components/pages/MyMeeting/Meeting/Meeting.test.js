import React from 'react';
import ReactDOM from 'react-dom';
import Meeting from './Meeting';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Meeting />, div);
  ReactDOM.unmountComponentAtNode(div);
});