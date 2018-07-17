import React    from 'react'
import { Link } from 'react-router-dom'

import {translate, getBaseUrl} from '../../utils/translate'

import './Header.css'
import Logo from './logo-wbgs.svg'

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <Link to={ getBaseUrl() + '/' }>
          <div className="Applogo">
            <img alt="" src={Logo} className="logopicture" />
            <h1 className="logoname">{ this.props.strings.appTitle }</h1>
          </div>
        </Link>
      </header>
    )
  }
}

export default translate()(Header)
