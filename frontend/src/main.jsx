import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SnackbarProvider>
    <App />
  </SnackbarProvider>
  </BrowserRouter>,
)
