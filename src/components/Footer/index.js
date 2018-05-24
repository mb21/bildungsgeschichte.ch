import React        from 'react'
import { Link }     from 'react-router-dom'

import {translate, getCurrentLang}  from '../../utils/translate'

import './Footer.css'

class Footer extends React.Component {
  render() {
    const prefix = '/' + getCurrentLang() + '/';
    return (
      <footer className="Footer">
        <Link className="link" to={ prefix + 'about'}>{ this.props.strings.about }</Link>
        <Link className="link" to={ prefix + 'projects'}>{ this.props.strings.projects }</Link>
        <Link className="link" to={ prefix + 'tips'}>{ this.props.strings.tipsTricks }</Link>
        <Link className="link" to={ prefix + 'rights'}>{ this.props.strings.rights }</Link>
        <p className="copyright">{ this.props.strings.copyright }</p>
      </footer>
    )
  }
}

export default translate('Footer')(Footer)
