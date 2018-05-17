import React from 'react'
import {translate} from '../../utils/translate'

const Projects = props =>
  <div dangerouslySetInnerHTML={{__html: props.strings.text}}>
  </div>

export default translate('Projects')(Projects)
