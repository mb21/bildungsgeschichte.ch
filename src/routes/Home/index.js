import React from 'react'

import {translate}    from '../../utils/translate'

class Home extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    const lang = ""
    this.props.history.push(lang + "/records?q=" + encodeURI(this.refs.searchInput.value) );
  }

  render() {
    return (
    <div>
      <p>{ this.props.strings.welcome }</p>
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="searchInput" />
        <input type="submit" value="🔍" />
      </form>
    </div>
    )
  }
}

export default translate('Home')(Home)
