import React    from 'react'
import {getFacets}    from '../../utils'

import './Facets.css'

import Dropdown from './dropdown.svg'

const toggle = (e) => {
  const children = e.target.nextElementSibling;
  if (children) {
    children.style.display = children.style.display === 'none'
                             ? ''
                             : 'none';
  }
}


const renderFacets = f => {
  const hasChildren = f.children && f.children.length > 0
  return (
    <li key={f.label}>
      <span className="label" onClick={toggle}>
        { f.label }
        { hasChildren
          ? <img alt={ f.label } src={Dropdown} className="dropdown" />
          : null
        }
      </span>
      { hasChildren
        ? <ul style={ {display: 'none'} }>
          { typeof f.children[0] === "object"
            ? f.children.map(renderFacets) //non-leaves
            : f.children.map(str =>        //leaves
                <li key={str}>
                  <input type="checkbox" id={str} />
                  <label htmlFor={str}>{str}</label>
                </li>
              )
          }
          </ul>
        : null
      }
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
