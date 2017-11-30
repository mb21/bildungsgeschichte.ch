import React    from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

export const Header = () => (
  <header className="Header">
    <Link to="/">
      Wissensportal Bildungsgeschichte Schweiz
    </Link>
  </header>
)

export default Header
