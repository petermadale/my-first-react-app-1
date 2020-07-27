import React from 'react';
import ReactDOM from 'react-dom';
import NoAccess from './NoAccess';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NoAccess />, div);
  ReactDOM.unmountComponentAtNode(div);
});