import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import { store } from "./store/store.js";
import { App } from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}> 
        <App />
      </Provider>
    </CookiesProvider>
  </StrictMode>,
)
