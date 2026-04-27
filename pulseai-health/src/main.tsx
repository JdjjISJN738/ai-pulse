import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app/globals.css';
import './styles/overrides.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Replace with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "820177939334-nm8ovnn8q4dmnannbaeqnjngk9oei2mu.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);


