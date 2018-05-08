import React    from 'react'

import './Facets.css'
import Dropdown from './dropdown.svg'
import Close    from './close.svg'
import Lupe     from './lupe.svg'

import {getLocalizedProp, translate} from '../../utils/translate'
import SearchField from '../../components/SearchField'

class Facets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {closed: true};
  }

  toggleFacet = e => {
    const valsUl = e.target.nextElementSibling
        , dropdownImg = e.target.firstElementChild
        ;
    if (valsUl) {
      if (valsUl.style.display === 'none') {
        valsUl.style.display = '';
        dropdownImg.style.transform = null;
      } else {
        valsUl.style.display = 'none';
        dropdownImg.style.transform = 'rotate(180deg)';
      }
    }
  }

  toggleMenu = e => {
    this.setState({closed: !this.state.closed});
  }

  handleFacetChange = (facetName, valName, e) => {
    const checked = e.target.checked;
    let fs = []
      , foundFacet = false
      ;
    this.props.checkedFacets.forEach(f => {
      if (f.type === facetName) {
        foundFacet = true;
        let vals = f.values || [];
        if (checked) {
          vals.push(valName)
        } else {
          vals = vals.filter(v => v !== valName);
        }
        if (vals.length > 0) {
          fs.push({type: facetName, values : vals})
        }
      } else {
        // unchanged facet
        fs.push(f)
      }
    });
    if (!foundFacet && checked) {
      // new facetName
      fs.push({type: facetName, values : [valName] })
    }
    this.props.onChangeCheckedFacets(fs);
  }

  handleTimeChange = (fromOrTo, e) => {
    if (e.key === 'Enter') {
      const time = parseInt(e.target.value, 10)
          , fs = this.props.checkedFacets.filter(f => f.type !== fromOrTo)
          , [val, f] = time
                       ? [ time, [{type: fromOrTo, values : [time] }] ]
                       : [ "",   [] ]
      e.target.value = val
      this.props.onChangeCheckedFacets( f.concat(fs) );
    }
  }

  renderFacets = f => {
    const vals = f.values.filter(v => v.freq > 0);
    if (vals.length > 0) {
      return (
        <li key={f.name}>
          <span className="label" onClick={this.toggleFacet}>
            { getLocalizedProp(f, 'label') }
            <img alt="" src={Dropdown} className="dropdown" />
          </span>
          <ul>
          { vals.map(v => {
              const str = v.name
                  , checkedF = this.props.checkedFacets.find(cf => cf.type === f.name)
                  , checked  = checkedF && checkedF.values
                                        && checkedF.values.indexOf(v.name) > -1
                  ;
              return (
                <li key={str}>
                  <input type="checkbox"
                    id={str}
                    defaultChecked={checked}
                    onChange={ this.handleFacetChange.bind(null, f.name, str) }
                    />
                  <label htmlFor={str}>
                    { getLocalizedProp(v, 'label') + ' ' }
                    ({ v.freq })
                  </label>
                </li>
              )
            })
          }
          </ul>
        </li>
      )
    }
  }

  render() {
    return (
      <div className={'Facets ' + (this.state.closed ? '-closed' : '')}>
        <button
          className="openMenuBtn"
          style={{backgroundImage: "url(" + Lupe + ")" }}
          onClick={this.toggleMenu}
          >
        </button>
        <button
          className="closeMenuBtn"
          style={{backgroundImage: "url(" + Close + ")" }}
          onClick={this.toggleMenu}
          >
        </button>

        <SearchField defaultValue={this.props.q} onSubmit={this.props.onChangeQ} />

        <ul className="facets">
          <li>
            <span className="label">{ this.props.strings.referencePeriod }</span>
            <div className="timeinput">
              <label htmlFor="timebegin">{ this.props.strings.from }</label>
              <input
                id="timebegin"
                type="number"
                placeholder="YYYY"
                onKeyPress={ this.handleTimeChange.bind(null, "timebegin") }
                />
            </div>
            <div className="timeinput">
              <label htmlFor="timeend">{ this.props.strings.until }</label>
              <input
                id="timeend"
                type="number"
                placeholder="2018"
                onKeyPress={ this.handleTimeChange.bind(null, "timeend") }
                />
            </div>
          </li>
          { this.props.facets.map(this.renderFacets) }
        </ul>
      </div>
    )
  }
}

export default translate('Facets')(Facets)
