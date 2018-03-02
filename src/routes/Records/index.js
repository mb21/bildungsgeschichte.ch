import React    from 'react'
import { Link } from 'react-router-dom'
import URLSearchParams from 'url-search-params'; //polyfill

import {getCheckedFacets, queryRecords} from '../../utils'
import {translate, getLocalizedProp} from '../../utils/translate'

import './Records.css'

class Records extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      records: []
    };
    this.fetchRecords();
    this.unlistenHistoryChange = this.props.history.listen(loc => {
      if (loc.pathname.endsWith("records/")) {
        this.fetchRecords();
      }
    });
  }

  componentWillUnmount() {
    this.unlistenHistoryChange();
  }

  fetchRecords = () => {
    const params = new URLSearchParams(document.location.search);
    queryRecords(params.get('q'), getCheckedFacets()).then( json => {
      if (json.timed_out) {
        alert("search timed out");
      } else {
        this.setState({ nrHits:  json.numberOfHits
                      , records: json.hits
                      });
      }
    });
  }

  render() {
    return (
      <div className="Records">
        <p className="hits">{ typeof this.state.nrHits === "number"
             ? this.state.nrHits + ' ' + this.props.strings.foundDocs
             : this.props.strings.loading
        }</p>
        { this.state.records.map( rec => {
          const doc = rec.content
          return (
            <div key={rec.id} className="record">
              <h3>
                <Link to={rec.id}>
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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith#Polyfill
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }
    return this.substring(this_len - search.length, this_len) === search;
  };
}

export default translate('Records')(Records)
