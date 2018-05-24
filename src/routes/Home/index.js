import React from 'react'
import { Link } from 'react-router-dom'

import {translate, getBaseUrl, langs, getCurrentLang, getSwitchToLangUrl} from '../../utils/translate'
import SearchField             from '../../components/SearchField'

import './Home.css'

class Home extends React.Component {

  handleSubmit = q => {
    this.props.history.push(getBaseUrl() + "/records/?q=" + encodeURIComponent(q));
  }

  render() {
    const currentLang = getCurrentLang();
    return (
    <div className="Home">

      <h2 className="introduction" >{ this.props.strings.quickInfo }</h2>
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
      <div className="search">
        <SearchField home={true} onSubmit={ this.handleSubmit } />
        <button>{ this.props.strings.tipsButton }</button>
      </div>
      <div className="picturegallery">
        <img src={require("./Gallery/BBF.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/fondo-1.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/fondo-2.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/stapfer_zweisimmen.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/zhschulumfrage.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/e-rara.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/CH-photo-2.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/fondo-3.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/tabelle.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/fondo-5.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/CH-photo-1.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/lehrerin.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/fondo-7.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/CH-photo-3.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/fondo-4.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/fondo-6.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/fondo-8.jpg")} alt="" className="picture" />
        <img src={require("./Gallery/fondo-9.jpg")} alt="" className="picture" />
      </div>
    </div>
    )
  }
}

export default translate('Home')(Home)
