import React    from 'react'
import { Link } from 'react-router-dom'

import {translate, getBaseUrl, langs, getCurrentLang, getSwitchToLangUrl} from '../../utils/translate'

import './Header.css'
import Logo from './logo-wbgs.svg'

class Header extends React.Component {
  render() {
    const currentLang = getCurrentLang();
    return (
      <header className="Header">
        <Link to={ getBaseUrl() }>
          <div className="Applogo">
            <img alt={ this.props.strings.appTitle } src={Logo} className="logopicture" />
            <h1 className="logoname">{ this.props.strings.appTitle }</h1>
          </div>
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
      </header>
    )
  }
}

export default translate()(Header)
