import React from 'react'

import {translate, getBaseUrl} from '../../utils/translate'
import SearchField             from '../../components/SearchField'

import './Home.css'

class Home extends React.Component {

  handleSubmit = q => {
    this.props.history.push(getBaseUrl() + "/records/?q=" + q);
  }

  render() {
    return (
    <div className="Home">
      <h2 className="welcome" >{ this.props.strings.welcome }</h2>
      <p className="introduction" >{ this.props.strings.quickInfo }</p>
      <SearchField home={true} searchCb={ this.handleSubmit } />
    </div>
    )
  }
}

export default translate('Home')(Home)
