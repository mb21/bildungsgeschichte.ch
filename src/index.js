import ArrayFind from 'array.prototype.find'
import React    from 'react'
import ReactDOM from 'react-dom'
import App      from './layouts/App'

ArrayFind.shim();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
