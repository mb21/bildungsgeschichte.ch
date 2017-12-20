import React    from 'react'
import { Link } from 'react-router-dom'
import URLSearchParams from 'url-search-params'; //polyfill

import {queryRecords} from '../../utils'
import {translate, getLocalizedProp} from '../../utils/translate'

import './Records.css'

class Records extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      records: []
    };

    const q = new URLSearchParams(document.location.search).get("q");
    queryRecords(q)
      .then( d => d.json() )
      .then( json => {
        if (json.timed_out) {
          alert("search timed out");
        } else {
          this.setState({ nrHits:  json.hits.total
                        , records: json.hits.hits
                        });
        }
      });
  }

  render() {
    return (
      <div className="Records">
        <p>{ typeof this.state.nrHits === "number"
             ? this.state.nrHits + ' ' + this.props.strings.foundDocs
             : this.props.strings.loading
        }</p>
        { this.state.records.map( rec => {
          const doc = rec._source.doc.properties
          return (
            <div key={rec._id} className="record">
              <h3>
                <Link to={rec._id}>
                  { getLocalizedProp(doc, 'title') }
                </Link>
              </h3>
              <p>{ this.props.strings.collection + ': ' + getLocalizedProp(doc, 'collection') }</p>
              <p>{ doc.source }</p>
              <p>{ doc.body.substr(0, 400) + '...' }</p>
            </div>
          )
        }) }
      </div>
    )
  }
}

export default translate('Records')(Records)
