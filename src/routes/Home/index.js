import React from 'react'

import {translate, getBaseUrl} from '../../utils/translate'

import './Home.css'
import Lupe from './lupe.svg'

class Home extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push(getBaseUrl() + "/records/?q=" + encodeURI(this.refs.searchInput.value) );
  }

  render() {
    return (
    <div className="Home">
      <h2 className="welcome" >{ this.props.strings.welcome }</h2>
      <p className="introduction" >{ this.props.strings.quickInfo }</p>
      <form onSubmit={this.handleSubmit} className="searcharea" >
        <input type="text" ref="searchInput" className="searchfield" />
        <img alt="Search" src={Lupe} className="lupe" />
        <input type="submit" value="" className="button" />
      </form>
    </div>
    )
  }
}

export default translate('Home')(Home)
