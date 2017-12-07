import React    from 'react'
import { Link } from 'react-router-dom'

import {translate, getBaseUrl, langs, getCurrentLang, getSwitchToLangUrl} from '../../utils/translate'

import './Header.css'

class Header extends React.Component {
  render() {
    const currentLang = getCurrentLang();
    return (
      <header className="Header">
        <Link to={ getBaseUrl() }>
          { this.props.strings.appTitle }
        </Link>
        <ul className="langs">
          { langs.map( l =>
              <li key={l}>
                <a className={l === currentLang ? 'active' : ''}
                   href={ getSwitchToLangUrl(l) }
                   >
                   { l.toUpperCase() }
                </a>
              </li>
            )}
        </ul>
      </header>
    )
  }
}

export default translate()(Header)
