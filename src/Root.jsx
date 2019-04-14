import React from 'react';
import { CookiesProvider } from 'react-cookie';
import App from './components/App';

export default function Root() {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}
