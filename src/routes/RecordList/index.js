import React           from 'react'
import {translate}     from '../../utils/translate'
import URLSearchParams from 'url-search-params'; //polyfill

import {queryRecords}  from '../../utils'
import Facets          from '../../components/Facets'
import Records         from '../../components/Records'
import SortDropdown    from '../../components/SortDropdown'

class RecordList extends React.Component {
  constructor(props) {
    super(props)

    const params = new URLSearchParams(document.location.search)
        , q = params.get('q')
        , sort = params.get('sort') || "default"
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
    , sort: sort
    , loading: true
    };
  }

  componentDidMount = () => {
    if (this.state.q) {
      this.fetchRecords();
    } else {
      alert("no query found");
    }
  }

  fetchRecords = () => {
    const params = new URLSearchParams()
        , q = this.state.q
        , checkedFacets = this.state.checkedFacets
        , sort = this.state.sort
        ;
    params.append("q", q)
    params.append("facets", JSON.stringify(checkedFacets) )
    params.append("sort", sort)
    this.props.history.push("?" + params.toString() )

    queryRecords(q, checkedFacets, sort).then( json => {
      if (json.timed_out) {
        alert("search timed out");
      } else {
        this.setState({
          nrHits:  json.numberOfHits
        , records: json.hits
        , facets:  json.header
        , loading: false
        });
      }
    });
    this.setState({loading: true});
  }

  handleQChange = q => {
    this.setState({ q: q }, this.fetchRecords);
  }

  handleCheckedFacetsChange = fs => {
    this.setState({ checkedFacets: fs }, this.fetchRecords);
  }

  handleSortChange = s => {
    this.setState({ sort: s }, this.fetchRecords);
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
        <SortDropdown
          value={this.state.sort}
          onChange={this.handleSortChange}
          />
        <Records
          nrHits={this.state.nrHits}
          records={this.state.records}
          loading={this.state.loading}
          />
        { this.state.nrHits === 0 && this.state.checkedFacets.length > 0
          ? <button onClick={this.handleCheckedFacetsChange.bind(null, [])}>
              { this.props.strings.resetFacetSearch }
            </button>
          : null
        }
      </div>
    )
  }
}

export default translate('RecordList')(RecordList)
