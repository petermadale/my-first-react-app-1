import React from 'react';
import ReactDOM from 'react-dom';
import MyFavorites from './MyFavorites';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyFavorites />, div);
  ReactDOM.unmountComponentAtNode(div);
});