import React from 'react';
import ReactDOM from 'react-dom';
import MeetingNew from './MeetingsNew';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MeetingNew />, div);
  ReactDOM.unmountComponentAtNode(div);
});