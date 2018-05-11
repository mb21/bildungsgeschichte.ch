import React from 'react'
import {
  BrowserRouter as Router
, Redirect
, Route
} from 'react-router-dom'

import {langs}       from '../../utils/translate'
import Header        from '../../components/Header'
import Footer        from '../../components/Footer'

import About         from '../../routes/About'
import Home          from '../../routes/Home'
import RecordDetail  from '../../routes/RecordDetail'
import RecordList    from '../../routes/RecordList'

import './App.css'
import '../../styles/scaffolds.css'

let routes = [];
[ { path: "",             component: props => <Redirect to={props.location.pathname + '/'} /> }
, { path: "/",            component: Home }
, { path: "/about/",      component: About }
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

class App extends React.Component {
  componentDidCatch(error, info) {
    document.write("<h1>Sorry, there was an error. Please reload the page.</h1>");
    document.write(error)
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="main">
          {routes.map( (r, i) =>
            <Route key={r.path} exact strict path={r.path} component={r.component} />
          )}
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
