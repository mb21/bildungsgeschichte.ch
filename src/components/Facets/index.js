import React    from 'react'
import {withRouter}   from 'react-router'
import {getFacets}    from '../../utils'

import './Facets.css'

import Dropdown from './dropdown.svg'
import {getCheckedFacets} from '../../utils'
import {getBaseUrl, getLocalizedProp} from '../../utils/translate'
import SearchField from '../../components/SearchField'

class Facets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      q: this.props.q || ""
    , facets: []  // tree for GUI render
    , checkedFacets: getCheckedFacets() // flattened for submission, of format [{ type: "author", values : ["thomas"] }]
    }
    getFacets().then( f => {
      this.setState({facets: f})
    });
  }

  toggle = e => {
    const valsUl = e.target.nextElementSibling;
    if (valsUl) {
      valsUl.style.display = valsUl.style.display === 'none'
                               ? ''
                               : 'none';
    }
  }

  handleFacetChange = (valName, facetName, e) => {
    const checked = e.target.checked;
    let fs = []
      , foundFacet = false
      ;
    this.state.checkedFacets.forEach(f => {
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
    this.setState({checkedFacets: fs}, this.search);
  }

  search = () => {
    const facets = encodeURIComponent( JSON.stringify(this.state.checkedFacets) )
        , q      = encodeURIComponent( this.state.q )
        ;
    this.props.history.push(getBaseUrl() + "/records/?q=" + q + "&facets=" + facets);
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
                  , checkedF = this.state.checkedFacets.find(cf => cf.type === f.name)
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
                      onChange={ this.handleFacetChange.bind(null, str, f.name) }
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
        <SearchField
          textChangeCb={e => this.setState({q: e.target.value}) }
          searchCb={this.search}
          />
        <ul className="facets">
          { this.state.facets.map(this.renderFacets) }
        </ul>
      </div>
    )
  }
}

export default withRouter(Facets)
