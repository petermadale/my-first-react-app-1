import React from 'react';
import ReactDOM from 'react-dom';
import MeetingsEdit from './MeetingsEdit';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MeetingsEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});