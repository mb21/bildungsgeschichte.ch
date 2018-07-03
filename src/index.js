import ArrayFind from 'array.prototype.find'
import React    from 'react'
import App      from './layouts/App'
import { hydrate, render } from 'react-dom';

ArrayFind.shim();

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
