import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsEn from 'common/translations/translationsEn';
import translationsRu from 'common/translations/translationsRu';

i18n.use(initReactI18next).init({
  resources: {
    EN: { translation: translationsEn },
    RU: { translation: translationsRu },
  },
  lng: 'EN',
  fallbackLng: 'EN',
  interpolation: { escapeValue: false },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
