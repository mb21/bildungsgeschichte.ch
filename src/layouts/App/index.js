import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header        from '../../components/Header'

import Home          from '../../routes/Home'

import './App.css'
import '../../styles/scaffolds.css'

export const App = () => (
  <Router>
    <div className="App">
      <Header />
      <div className="container">
        <main>
          <Route exact path="/"                           component={Home} />
        </main>
      </div>
    </div>
  </Router>
)

export default App;
