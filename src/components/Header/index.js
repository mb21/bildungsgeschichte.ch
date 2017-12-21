import React    from 'react'
import { Link } from 'react-router-dom'

import {translate, getBaseUrl, langs, getCurrentLang, getSwitchToLangUrl} from '../../utils/translate'

import './Header.css'
import Logo from './logo-wbgs.svg'
import Lupe from './lupe.svg'

class Header extends React.Component {
  render() {
    const currentLang = getCurrentLang();
    return (
      <header className="Header">
        <div className="container">
          <Link to={ getBaseUrl() }>
            <img alt={ this.props.strings.appTitle } src={Logo} className="logo" />
          </Link>
          <ul className="langs">
            { langs.map( l =>
                <li key={l}>
                  <Link
                    to={ getSwitchToLangUrl(l) }
                    className={l === currentLang ? 'active' : ''}
                    >
                    { l.toUpperCase() }
                  </Link>
                </li>
              )}
          </ul>
          <form onSubmit={this.handleSubmit} className="searcharea" >
            <img alt="Search" src={Lupe} className="lupe" />
            <input type="submit" value="" className="button" />
          </form>
        </div>
      </header>
    )
  }
}

export default translate()(Header)
