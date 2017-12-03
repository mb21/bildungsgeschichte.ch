import React    from 'react'
import { Link } from 'react-router-dom'

import {translate, getBaseUrl} from '../../utils/translate'

import './Header.css'

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <Link to={ getBaseUrl() }>
          { this.props.strings.appTitle }
        </Link>
      </header>
    )
  }
}

export default translate('Global')(Header)
