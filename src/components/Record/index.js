import React       from 'react'
import { Link }    from 'react-router-dom'
import {translate, translateFacet} from '../../utils/translate'

import './Record.css'

const truncate = (str, length) =>
  str.length > length ? str.substr(0, length) + "…" : str
const renderHighlight = (h, key) => {
  if(h) {
    return <p className="highlight" dangerouslySetInnerHTML={{__html: h}} key={key}></p>
  }
}
const renderDate  = str => (new Date(str)).toLocaleDateString('de-CH')
const renderArray = arr => arr.join(", ")

const renderIcon = kind => {
  if (kind) {
    let img;
    switch (kind) {
      case "text":
        break;
      case "picture_dk":
        break;
      case "multimedia":
        break;
      case "chart":
        break;
      default:
    }
    return <img src={img} alt={ translateFacet(kind) } />
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
        <div className="fileicon">
          <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
              <g id="Art/-Movie-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-50.000000, 0.000000)">
                  <g id="Group" transform="translate(50.000000, 0.000000)">
                      <g id="Button-Copy" fill="#222222">
                          <rect id="Bounds" x="0" y="0" width="50" height="50"></rect>
                      </g>
                      <polygon id="Page-1" fill="#A0A0A0" points="19 17 19 32 34 24.5"></polygon>
                  </g>
              </g>
          </svg>
        </div>

        { renderIcon(doc.documentkind) }

        { renderHighlight(highlights[0], 0) }

        { this.state.open
          ? null
          : <button className="toggle" onClick={this.toggle}>+ { this.props.strings.more }</button>
        }

        { this.state.open
          ? <div>
              { highlights.slice(1, 3).map(renderHighlight) }

            </div>
          : null
        }

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
                <li key="publicationDate">
                  <span className="label">{this.props.strings.publicationDate}</span>
                  <span className="value">{ renderDate(doc.date) }</span>
                </li>
              , renderProperty(doc, 'actors', true)
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
