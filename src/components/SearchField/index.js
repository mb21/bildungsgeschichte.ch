import React    from 'react'

import './SearchField.css'
import Lupe from './lupe.svg'

class SearchField extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit( this.refs.searchInput.value )
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={'SearchField ' + (this.props.home ? '-home' : '')}
        >
        <input
          type="text"
          ref="searchInput"
          className="searchfield"
          defaultValue={this.props.defaultValue}
          />
        <input
          type="submit"
          className="button"
          style={{backgroundImage: "url(" + Lupe + ")" }}
          />
      </form>
    )
  }
}

export default SearchField
