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
    , nrPages: null
    , records: []
    , facets: []
    , q: q
    , checkedFacets: checkedFacets || []
    , sort: sort
    , page: 1
    , loading: true
    , loadingMore: false
    };
  }

  componentDidMount = () => {
    this.fetchRecords();

    // infinite-scroll
    document.addEventListener('scroll', () => {
      if( (window.scrollY || document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight + 400
        >= Math.max(
            document.body.scrollHeight
          , document.body.offsetHeight
          , document.documentElement.clientHeight
          , document.documentElement.scrollHeight
          , document.documentElement.offsetHeight)
      ){
        this.fetchMoreRecords();
      }
    });
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

    queryRecords(q, checkedFacets, sort, 1).then( json => {
      if (json.timed_out) {
        alert("search timed out");
      } else {
        this.setState({
          nrHits:  json.numberOfHits
        , nrPages: json.numberOfPages
        , records: json.hits
        , facets:  json.header
        , loading: false
        });
      }
    });
    this.setState({loading: true});
  }

  fetchMoreRecords = () => {
    if (!this.state.loadingMore &&
        !this.state.loading &&
        this.state.page < this.state.nrPages) {
      const page = this.state.page + 1
      queryRecords(this.state.q, this.state.checkedFacets, this.state.sort, page)
        .then( json => {
          this.setState({
            records: this.state.records.concat(json.hits)
          , page: page
          , loadingMore: false
          });
        });
      this.setState({loadingMore: true});
    }
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
        { this.state.loadingMore
          ? <h3>{this.props.strings.loading}</h3>
          : null
        }
      </div>
    )
  }
}

export default translate('RecordList')(RecordList)
