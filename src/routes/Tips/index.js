import React from 'react'
import {translate} from '../../utils/translate'

const Tips = props =>
  <div dangerouslySetInnerHTML={{__html: props.strings.text}}>
  </div>

export default translate('Tips')(Tips)
