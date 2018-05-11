import React        from 'react'
import { Link }     from 'react-router-dom'

import {translate}  from '../../utils/translate'

import './Footer.css'

class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <Link className="link" to="about/">{ this.props.strings.theProject }</Link>
        <a className="link" target="_blank">{ this.props.strings.disclaimer }</a>
        <p className="copyright">{ this.props.strings.copyright }</p>
      </footer>
    )
  }
}

export default translate()(Footer)
