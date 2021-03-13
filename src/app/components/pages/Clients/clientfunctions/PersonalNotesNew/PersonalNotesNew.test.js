import React from 'react';
import ReactDOM from 'react-dom';
import PersonalNotesNew from './PersonalNotesNew';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PersonalNotesNew />, div);
  ReactDOM.unmountComponentAtNode(div);
});