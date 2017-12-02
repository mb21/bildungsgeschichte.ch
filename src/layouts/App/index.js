import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header        from '../../components/Header'

import Home          from '../../routes/Home'
import RecordDetail  from '../../routes/RecordDetail'
import Records       from '../../routes/Records'

import './App.css'
import '../../styles/scaffolds.css'

export const App = () => (
  <Router>
    <div className="App">
      <Header />
      <div className="container">
        <main>
          <Route exact path="/"                           component={Home} />
          <Route exact path="/records/:id"                component={RecordDetail} />
          <Route exact path="/records"                    component={Records} />
        </main>
      </div>
    </div>
  </Router>
)

export default App;
