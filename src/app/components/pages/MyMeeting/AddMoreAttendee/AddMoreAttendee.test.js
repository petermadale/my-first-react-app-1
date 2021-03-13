import React from 'react';
import ReactDOM from 'react-dom';
import AddMoreAttendee from './AddMoreAttendee';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddMoreAttendee />, div);
  ReactDOM.unmountComponentAtNode(div);
});