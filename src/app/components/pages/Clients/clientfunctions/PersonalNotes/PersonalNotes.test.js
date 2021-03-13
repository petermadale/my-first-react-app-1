import React from 'react';
import ReactDOM from 'react-dom';
import PersonalNotes from './PersonalNotes';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PersonalNotes />, div);
  ReactDOM.unmountComponentAtNode(div);
});