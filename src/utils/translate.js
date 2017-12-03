import { default as React } from 'react';
import { Redirect }         from 'react-router-dom'

import de from '../i18n/de'
import en from '../i18n/en'
import fr from '../i18n/fr'
import it from '../i18n/it'

const getCurrentLang = () => window.location.pathname.substr(1, 2)
const languages = {
  de
, en
, fr
, it
}

export const langs      = ["de", "fr", "it", "en"]
export const userLang   = (navigator.language || navigator.userLanguage || "de").split("-")[0]
export const getBaseUrl = () => "/" + getCurrentLang()

// Higher Order Component, adapted from https://stackoverflow.com/a/33422278/214446
export const translate = function(key) {
  return Component => {
    return class TranslationComponent extends React.Component {
      render() {
        const currentLang = getCurrentLang()

        if (currentLang === "") {
          return <Redirect to={"/" + userLang} />
        }
        if (languages[currentLang] === undefined) {
          return <div>Language <code>{currentLang}</code> not found.</div>
        }

        document.title = languages[currentLang].Global.appTitle
        document.body.lang = currentLang

        const strings = languages[currentLang][key]
        return <Component {...this.props} {...this.state} strings={strings} />
      }
    }
  };
}
