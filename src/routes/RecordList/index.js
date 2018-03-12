import React    from 'react'
import URLSearchParams from 'url-search-params'; //polyfill

import Facets from '../../components/Facets'
import Records from '../../components/Records'
import {queryRecords} from '../../utils'

class RecordList extends React.Component {
  constructor(props) {
    super(props)

    const params = new URLSearchParams(document.location.search)
        , q = params.get('q')
        ;
    let checkedFacets;
    try {
      checkedFacets = JSON.parse( decodeURIComponent( params.get('facets') ) )
    } catch(e) {
      console.error("failed to parse facets URI parameter", e)
    }

    this.state = {
      nrHits: null
    , records: []
    , facets: []
    , q: q
    , checkedFacets: checkedFacets || []
    };

    if (q) {
      this.fetchRecords();
    } else {
      alert("no query found");
    }
  }

  fetchRecords = () => {
    const params = new URLSearchParams()
        , q = this.state.q
        , checkedFacets = this.state.checkedFacets
        ;
    params.append("q", q)
    params.append("facets", JSON.stringify(checkedFacets) )
    this.props.history.push("?" + params.toString() )

    queryRecords(q, checkedFacets).then( json => {
      if (json.timed_out) {
        alert("search timed out");
      } else {
        this.setState({
          nrHits:  json.numberOfHits
        , records: json.hits
        , facets:  json.header
        });
      }
    });
  }

  handleQChange = q => {
    this.setState({ q: q }, this.fetchRecords);
  }

  handleCheckedFacetsChange = fs => {
    this.setState({ checkedFacets: fs }, this.fetchRecords);
  }

  render() {
    return (
      <div>
        <Facets
          facets={this.state.facets}
          q={this.state.q}
          checkedFacets={this.state.checkedFacets}
          onChangeQ={this.handleQChange}
          onChangeCheckedFacets={this.handleCheckedFacetsChange}
          />
        <Records nrHits={this.state.nrHits} records={this.state.records} />
      </div>
    )
  }
}

export default RecordList
