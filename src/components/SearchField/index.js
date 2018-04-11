import React    from 'react'

import './SearchField.css'
import Lupe from './lupe.svg'

class SearchField extends React.Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit( this.searchInputRef.current.value )
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={'SearchField ' + (this.props.home ? '-home' : '')}
        >
        <input
          type="text"
          ref={this.searchInputRef}
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
