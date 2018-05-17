import React from 'react'
import {translate} from '../../utils/translate'

const Rights = props =>
  <div dangerouslySetInnerHTML={{__html: props.strings.text}}>
  </div>

export default translate('Rights')(Rights)
