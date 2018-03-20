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
      <li>
        <span className="label">{ translateFacet(facetName) }</span>
        { val }
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
        , highlights = rec.highlights.body || []
    return (
      <div className="Record">
        <h3>
          <Link to={rec.id}>
            { doc.title }
          </Link>
        </h3>

        <img src={ doc.documentkind } alt={doc.documentkind} />

        { renderHighlight(highlights[0], 0) }

        { this.state.open
          ? null
          : <button className="toggle" onClick={this.toggle}>open</button>
        }

        { this.state.open
          ? <div>
              { highlights.slice(1, 3).map(renderHighlight) }

              <a href={doc.source} target="_blank">{ this.props.strings.open }</a>
              <a href={doc.source} download>Download</a>
            </div>
          : null
        }

        <ul className="properties">
          <li>
            <span className="label">{ translateFacet('author') }</span>
            { truncate(renderArray(doc.author), 30) }
          </li>
          <li>
            <span className="label">{this.props.strings.referencePeriod}</span>
            { doc.timebegin }
            { doc.timebegin !== doc.timeend
              ? "–" + doc.timeend
              : null
            }
          </li>
          { this.state.open
            ? [
                <li>
                  <span className="label">{this.props.strings.publicationDate}</span>
                  { renderDate(doc.date) }
                </li>
              , renderProperty(doc, 'actors', true)
              , /* renderProperty(doc, 'canton') */
              , renderProperty(doc, 'collection')
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
              , /* renderProperty(doc, 'transcript') */
              , renderProperty(doc, 'version')
              ]
            : null
          }
        </ul>
        { this.state.open
          ? <div>
              { doc.filetype }, {doc.filesize}
            </div>
          : null
        }
      </div>
    )
  }

}

export default translate('Record')(Record)
