import React from 'react'

import {getRecord} from '../../utils'
import {translate} from '../../utils/translate'
import Record      from '../../components/Record'

class RecordDetail extends React.Component {
  constructor(props) {
    super(props)

    const id = props.match.params.id
    this.state = {
      id: id
    , record: null
    };
    getRecord(id).then(data => {
      this.setState({record: data})
    });
  }

  render() {
    return (
      this.state.record
      ? <Record record={this.state.record} />
      : <p>{ this.props.strings.loading }</p>
    )
  }
}

export default translate('RecordDetail')(RecordDetail)
