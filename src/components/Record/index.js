import React       from 'react'
import { Link }    from 'react-router-dom'
import {translate, translateFacet} from '../../utils/translate'

import './Record.css'
import textIcon       from './text.svg'
import pictureIcon    from './picture_dk.svg'
import multimediaIcon from './multimedia.svg'
import chartIcon      from './chart.svg'

const truncate = (str, length) =>
  str.length > length ? str.substr(0, length) + "…" : str
const renderHighlights = (hs, key) => {
  if(hs.length > 0) {
    const h = hs.join(" […] ");
    return <p className="highlights" dangerouslySetInnerHTML={{__html: h}} key={key}></p>
  }
}
const renderArray = arr => arr.join(", ")

const renderIcon = kind => {
  if (kind) {
    let img;
    switch (kind) {
      case "text":
        img = textIcon;
        break;
      case "picture_dk":
        img = pictureIcon;
        break;
      case "multimedia":
        img = multimediaIcon;
        break;
      case "chart":
        img = chartIcon;
        break;
      default:
    }
    return <img src={img} className="fileicon" alt={ translateFacet(kind) } />
  }
}

const renderProperty = (doc, facetName, translateVals) => {
  let val = doc[facetName]
  if (val instanceof Array) {
    if (translateVals) {
      val = val.map(translateFacet)
    }
    val = renderArray(val);
  }
  if (val) {
    return (
      <li key={facetName}>
        <span className="label">{ translateFacet(facetName) }</span>
        <span className="value">{ val }</span>
      </li>
    );
  }
}

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  toggle = () => {
    this.setState({open: !this.state.open});
  }
  render() {
    const rec = this.props.record
        , doc = rec.content
        , highlights = rec.highlights ? (rec.highlights.body || []) : []
    return (
      <div className="Record">
        <h3>
          <Link to={rec.id}>
            { doc.title }
          </Link>
        </h3>

        { renderIcon(doc.documentkind) }

        { this.state.open ? null : renderHighlights(highlights.slice(0, 1)) }

        { this.state.open
          ? null
          : <button className="toggle" onClick={this.toggle}>+ { this.props.strings.more }</button>
        }

        { this.state.open ? renderHighlights(highlights) : null }

        <ul className="properties">
          <li>
            <span className="label">{ translateFacet('author') }</span>
            <span className="value">
              { truncate(renderArray(doc.author), this.state.open ? undefined : 30) }
            </span>
          </li>
          <li>
            <span className="label">{this.props.strings.referencePeriod}</span>
            <span className="value">
              { doc.timebegin }
              { doc.timebegin !== doc.timeend
                ? "–" + doc.timeend
                : null
              }
            </span>
          </li>
          { this.state.open
            ? [
                renderProperty(doc, 'actors', true)
              , renderProperty(doc, 'canton')
              , renderProperty(doc, 'description')
              , renderProperty(doc, 'editor')
              , renderProperty(doc, 'educationsystem', true)
              , renderProperty(doc, 'language', true)
              , renderProperty(doc, 'mediatype', true)
              , renderProperty(doc, 'municipality')
              , renderProperty(doc, 'nation')
              , renderProperty(doc, 'people')
              , renderProperty(doc, 'project', true)
              , renderProperty(doc, 'publicationdate')
              , renderProperty(doc, 'publicationplace')
              , renderProperty(doc, 'publicationreference')
              , renderProperty(doc, 'rights')
              , renderProperty(doc, 'subject', true)
              , renderProperty(doc, 'texttype', true)
              , renderProperty(doc, 'transcript')
              , renderProperty(doc, 'version')
              ]
            : null
          }
        </ul>

        { this.state.open
          ? <div>
              <div className="fileinformation" >
                { doc.filetype }, {doc.filesize}
              </div>
              <div className="actionoptions" >
                <a className="actionlink" href={doc.source} target="_blank">{ this.props.strings.open }</a>
                <a className="actionlink" href={doc.source} download>Download</a>
              </div>
            </div>
          : null
        }

      </div>
    )
  }

}

export default translate('Record')(Record)
