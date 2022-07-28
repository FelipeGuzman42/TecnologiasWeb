import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import SmartHome from './components/SmartHome';
import { IntlProvider } from "react-intl";

import localeEsMessages from "./locale/es.json";
import localeEnMessages from "./locale/en.json";

let i18nConfig = {
  locale: 'en',
  messages: localeEnMessages
};

function getBrowserLanguage(){
  let lang = (navigator.language || navigator.userLanguage).substring(0,2);
  switch (lang) {
      case 'es': i18nConfig.messages = localeEsMessages; break;
      case 'en': i18nConfig.messages = localeEnMessages; break;
      default: i18nConfig.messages = localeEnMessages; break;
  }
  i18nConfig.locale = lang;
  return i18nConfig;
}

ReactDOM.render(
  <IntlProvider locale={getBrowserLanguage().locale} messages={getBrowserLanguage().messages}>
    <React.StrictMode>
      <SmartHome />
    </React.StrictMode>
  </IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
