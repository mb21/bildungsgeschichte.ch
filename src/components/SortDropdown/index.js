import React    from 'react'
import Dropdown from './dropdown.svg'

import {translate} from '../../utils/translate'

import './SortDropdown.css'

class SortDropdown extends React.Component {
  render() {
    return (
      <div className="SortDropdown">
        <p className="intro">{ this.props.strings.sortBy }</p>
        <select value={this.props.value}
                onChange={ e => this.props.onChange(e.target.value) }>
          <option value="default">{ this.props.strings.relevance }</option>
          <option value="desc">{ this.props.strings.desc }</option>
          <option value="asc">{ this.props.strings.asc }</option>
        </select>
        <img alt="" src={Dropdown} className="dropdown" />
      </div>
    )
  }
}

export default translate('SortDropdown')(SortDropdown)
