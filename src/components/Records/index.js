import React       from 'react'
import {translate} from '../../utils/translate'
import Record      from '../../components/Record'

import './Records.css'

class Records extends React.Component {

  render() {
    return (
      <div className="Records">
        <div className="status">
          { this.props.loading
            ? <p>{ this.props.strings.loading }</p>
            : typeof this.props.nrHits === "number"
              ? <p>{ this.props.nrHits + ' ' + this.props.strings.foundDocs }</p>
              : null
          }
        </div>
        { this.props.records.map(r => <Record record={r} key={r.id} />) }
      </div>
    )
  }
}

export default translate('Records')(Records)
