import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import {IntlProvider} from 'react-intl';
import localeEsMessages from './locales/es.json';
import localeEnMessages from './locales/en.json';

const messages = {
    'en': localeEnMessages,
    'es': localeEsMessages
}
  
  const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
    <React.StrictMode>
        <IntlProvider locale={language} messages={messages[language]} >
            <Auth0Provider domain="dev-g6k4h8-b.us.auth0.com" clientId="QC3tzkwNAj8YU9g42U6KAb5wXa5xn1UF" redirectUri={window.location.origin}>
                <App />
            </Auth0Provider>
        </IntlProvider>
    </React.StrictMode>, 
    document.getElementById("root")
);

serviceWorkerRegistration.register();

reportWebVitals();