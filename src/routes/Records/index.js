import React from 'react'

import {queryRecords} from '../../utils'

export default class Records extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      records: []
    };

    const q = new URLSearchParams(document.location.search).get("q");
    queryRecords(q).then( data => {
      console.log(data);
      this.setState({records: data});
    });
  }

  render() {
    return (
      <div>
        <h2>Records</h2>
      </div>
    )
  }
}
