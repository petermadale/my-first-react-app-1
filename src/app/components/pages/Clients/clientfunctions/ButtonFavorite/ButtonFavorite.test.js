import React from 'react';
import ReactDOM from 'react-dom';
import ButtonFavorite from './ButtonFavorite';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonFavorite />, div);
  ReactDOM.unmountComponentAtNode(div);
});