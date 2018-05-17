import React from 'react'

import {translate, getBaseUrl} from '../../utils/translate'
import SearchField             from '../../components/SearchField'

import './Home.css'

class Home extends React.Component {

  handleSubmit = q => {
    this.props.history.push(getBaseUrl() + "/records/?q=" + encodeURIComponent(q));
  }

  render() {
    return (
    <div className="Home">
      <h2 className="introduction" >{ this.props.strings.quickInfo }</h2>
      <div className="search">
        <SearchField home={true} onSubmit={ this.handleSubmit } />
        <button>{ this.props.strings.tippsButton }</button>
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
