import React       from 'react'
import { Link }    from 'react-router-dom'
import {translate, translateFacet} from '../../utils/translate'

import './Records.css'

class Records extends React.Component {
  render() {
    return (
      <div className="Records">
        <p className="hits">{ typeof this.props.nrHits === "number"
             ? this.props.nrHits + ' ' + this.props.strings.foundDocs
             : this.props.strings.loading
        }</p>
        { this.props.records.map( rec => {
          const doc = rec.content
          return (
            <div key={rec.id} className="record">
              <h3>
                <Link to={rec.id}>
                  { doc.title }
                </Link>
              </h3>
              <p>{ this.props.strings.collection }</p>
              <p>format: { doc.format }</p>

              <p>{ translateFacet('author') }:</p>
              <ul>{ doc.author.map(a => <li key={a}>{a}</li>) }</ul>

              <p>{ translateFacet('editor') }: { doc.editor }</p>
              <p>{ translateFacet('rights') }: { doc.rights }</p>
              <p>{ translateFacet('project') }: { doc.project }</p>

              <p>{ doc.body ? doc.body.substr(0, 400) + '...' : ''}</p>
            </div>
          )
        }) }
      </div>
    )
  }
}

export default translate('Records')(Records)
