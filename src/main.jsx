import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './libs/reactQueryClient.js'
import { HashRouter } from 'react-router-dom';
import "./i18n/i18n";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from 'sonner'

createRoot(document.getElementById('root-sias')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter >
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <Toaster position="top-right" richColors />
      </HashRouter >
    </QueryClientProvider>
  </React.StrictMode>
)
