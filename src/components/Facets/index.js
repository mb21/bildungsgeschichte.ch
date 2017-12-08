import React    from 'react'

import './Facets.css'
import facets from './facets.json'

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
          ? ' ▾'
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
  render() {
    return (
      <div className="Facets">
        <ul className="facets">
          { facets.children.map(renderFacets) }
        </ul>
      </div>
    )
  }
}

export default Facets
