import React        from 'react'
import { Link }     from 'react-router-dom'

import {translate}  from '../../utils/translate'

import './Footer.css'

class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <Link className="link" to="about">{ this.props.strings.about }</Link>
        <Link className="link" to="projects">{ this.props.strings.projects }</Link>
        <Link className="link" to="rights">{ this.props.strings.rights }</Link>
        <p className="copyright">{ this.props.strings.copyright }</p>
      </footer>
    )
  }
}

export default translate('Footer')(Footer)
