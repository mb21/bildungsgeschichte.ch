import React from 'react'

import {translate, getBaseUrl} from '../../utils/translate'

import './Home.css'

class Home extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push(getBaseUrl() + "/records/?q=" + encodeURI(this.refs.searchInput.value) );
  }

  render() {
    return (
    <div className="Home">
      <p>{ this.props.strings.welcome }</p>
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="searchInput" className="searchfield" />
        <input type="submit" value="🔍" />
      </form>
    </div>
    )
  }
}

export default translate('Home')(Home)
