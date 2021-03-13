import React from 'react';
import ReactDOM from 'react-dom';
import PersonalNotesEdit from './PersonalNotesEdit';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PersonalNotesEdit />, div);
  ReactDOM.unmountComponentAtNode(div);
});