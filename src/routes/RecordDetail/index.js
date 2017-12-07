import React from 'react'

import {getRecord}    from '../../utils'
import {translate, getLocalizedProp} from '../../utils/translate'

class RecordDetail extends React.Component {
  constructor(props) {
    super(props)

    const id = props.match.params.id
    this.state = {
      id: id
    , record: null
    };
    getRecord(id)
      .then( d => d.json() )
      .then( json => {
        console.log(json)
        if (!json.found) {
          alert("not found");
        } else {
          this.setState({record: json})
        }
      });
  }

  render() {
    const doc = this.state.record
                ? this.state.record._source.doc.properties
                : null
    return (
      <div className="RecordDetail">
        { doc
          ? <div>
              <h2>{ getLocalizedProp(doc, 'title') }</h2>
              <p>{ this.props.strings.collection + ': ' + getLocalizedProp(doc, 'collection') }</p>
              <p>{ doc.body }</p>
            </div>
          : <p>{ this.props.strings.loading }</p>
        }
      </div>
    )
  }
}

export default translate('RecordDetail')(RecordDetail)