import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { ToastProvider, withToastManager } from 'react-toast-notifications';
import App from './components/App';

const ToastyApp = withToastManager(App);

export default function Root() {
  return (
    <CookiesProvider>
      <ToastProvider autoDismissTimeout={2000}>
        <ToastyApp />
      </ToastProvider>
    </CookiesProvider>
  );
}
