import React from 'react';
import ReactDOM from 'react-dom';
import ContentHeader from './ContentHeader';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});