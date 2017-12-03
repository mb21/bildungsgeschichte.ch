import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import {langs}       from '../../utils/translate'
import Header        from '../../components/Header'

import Home          from '../../routes/Home'
import RecordDetail  from '../../routes/RecordDetail'
import Records       from '../../routes/Records'

import './App.css'
import '../../styles/scaffolds.css'

let routes = [];
[ { path: "/",            component: Home }
, { path: "/records/:id", component: RecordDetail }
, { path: "/records",     component: Records }
].forEach(r => {
  langs.forEach( lang => {
    routes.push({
      path: "/" + lang + r.path
    , component: r.component
    });
  });
});

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <main>
            {routes.map( (r, i) =>
              <Route key={r.path} exact path={r.path} component={r.component} />
            )}
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
