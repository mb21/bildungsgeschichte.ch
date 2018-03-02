import React    from 'react'

import Lupe from './lupe.svg'

class SearchField extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.searchCb( this.refs.searchInput.value )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="searcharea" >
        <input type="text" ref="searchInput" className="searchfield" onChange={this.props.textChangeCb} />
        <img alt="Search" src={Lupe} className="lupe" />
        <input type="submit" value="" className="button" />
      </form>
    )
  }
}

export default SearchField
