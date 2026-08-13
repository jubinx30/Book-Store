import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </BrowserRouter>,
)
