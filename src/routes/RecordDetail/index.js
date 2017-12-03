import React from 'react'

import {getRecord}    from '../../utils'
import {translate}    from '../../utils/translate'

class RecordDetail extends React.Component {
  constructor(props) {
    super(props)

    const id = props.match.params.id
    this.state = {
      id: id
    , record: null
    };
    getRecord(id).then( data => {
      this.setState({record: data})
    });
  }

  render() {
    const ps = this.state.record._source.doc.properties;
    return (
      <div>
        <h2>{ ps.title_de }</h2>
        <p>{ ps.body }</p>
        <p>{ ps.collection_de }</p>
      </div>
    )
  }
}

export default translate('RecordDetail')(RecordDetail)
