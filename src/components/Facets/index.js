import React    from 'react'
import {getFacets}    from '../../utils'

import './Facets.css'

import Dropdown from './dropdown.svg'
import {getLocalizedProp} from '../../utils/translate'

const toggle = (e) => {
  const valsUl = e.target.nextElementSibling;
  if (valsUl) {
    valsUl.style.display = valsUl.style.display === 'none'
                             ? ''
                             : 'none';
  }
}


const renderFacets = f => {
  return (
    <li key={f.name}>
      <span className="label" onClick={toggle}>
        { getLocalizedProp(f, 'label') }
        <img alt="" src={Dropdown} className="dropdown" />
      </span>
      <ul style={ {display: 'none'} }>
      { f.values && f.values.length > 0
        ? f.values.map(v => {
            const str = v.name
            return (
              <li key={str}>
                <input type="checkbox" id={str} />
                <label htmlFor={str}>{ getLocalizedProp(v, 'label') }</label>
              </li>
            )
          })
        : null
      }
      </ul>
    </li>
  )
}

class Facets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      facets: []
    }
    getFacets().then( f => {
      this.setState({facets: f})
    });
  }
  render() {
    return (
      <div className="Facets">
        <ul className="facets">
          { this.state.facets.map(renderFacets) }
        </ul>
      </div>
    )
  }
}

export default Facets
