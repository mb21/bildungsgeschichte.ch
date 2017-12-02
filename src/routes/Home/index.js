import React from 'react'

export default class Home extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push("/records?q=" + encodeURI(this.refs.searchInput.value) );
  }

  render() {
    return (
    <div>
      <p>Willkommen beim Wissensportal Bildungsgeschichte Schweiz</p>
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="searchInput" placeholder="Suche" />
        <input type="submit" value="🔍" />
      </form>
    </div>
    )
  }
}
