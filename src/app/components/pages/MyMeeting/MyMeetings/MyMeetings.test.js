import React from 'react';
import ReactDOM from 'react-dom';
import MyMeetings from './MyMeetings';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyMeetings />, div);
  ReactDOM.unmountComponentAtNode(div);
});