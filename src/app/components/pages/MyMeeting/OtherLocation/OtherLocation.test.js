import React from 'react';
import ReactDOM from 'react-dom';
import OtherLocation from './OtherLocation';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OtherLocation />, div);
  ReactDOM.unmountComponentAtNode(div);
});