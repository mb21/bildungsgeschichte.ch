import React    from 'react'

import './Facets.css'

import Dropdown from './dropdown.svg'
import {getLocalizedProp} from '../../utils/translate'
import SearchField from '../../components/SearchField'

class Facets extends React.Component {

  toggle = e => {
    const valsUl = e.target.nextElementSibling;
    if (valsUl) {
      valsUl.style.display = valsUl.style.display === 'none'
                               ? ''
                               : 'none';
    }
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

  renderFacets = f => {
    return (
      <li key={f.name}>
        <span className="label" onClick={this.toggle}>
          { getLocalizedProp(f, 'label') }
          <img alt="" src={Dropdown} className="dropdown" />
        </span>
        <ul>
        { f.values && f.values.length > 0
          ? f.values.map(v => {
              const str = v.name
                  , checkedF = this.props.checkedFacets.find(cf => cf.type === f.name)
                  , checked  = checkedF && checkedF.values
                                        && checkedF.values.indexOf(v.name) > -1
                  ;
              return (
                v.freq > 0
                ?
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
                : null
              )
            })
          : null
        }
        </ul>
      </li>
    )
  }
  render() {
    return (
      <div className="Facets">
        <SearchField defaultValue={this.props.q} onSubmit={this.props.onChangeQ} />
        <ul className="facets">
          { this.props.facets.map(this.renderFacets) }
        </ul>
      </div>
    )
  }
}

export default Facets
