import React from 'react'
import {
  BrowserRouter as Router
, Redirect
, Route
} from 'react-router-dom'

import {langs}       from '../../utils/translate'
import Header        from '../../components/Header'

import Home          from '../../routes/Home'
import RecordDetail  from '../../routes/RecordDetail'
import RecordList    from '../../routes/RecordList'

import './App.css'
import '../../styles/scaffolds.css'

let routes = [];
[ { path: "",             component: props => <Redirect to={props.location.pathname + '/'} /> }
, { path: "/",            component: Home }
, { path: "/records/:id", component: RecordDetail }
, { path: "/records/",    component: RecordList }
].forEach(r => {
  langs.forEach( lang => {
    routes.push({
      path: "/" + lang + r.path
    , component: r.component
    , render:    r.render
    });
  });
});

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container -flex">
          <main>
            {routes.map( (r, i) =>
              <Route key={r.path} exact strict path={r.path} component={r.component} />
            )}
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
