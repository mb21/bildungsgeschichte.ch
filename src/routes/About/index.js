import React from 'react'
import {translate} from '../../utils/translate'

const About = (props) =>
  <div dangerouslySetInnerHTML={{__html: props.strings.aboutus}}>
  </div>

export default translate('About')(About)
