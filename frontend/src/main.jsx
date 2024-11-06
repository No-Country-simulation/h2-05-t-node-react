import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
      <App />
  </PrimeReactProvider>
)
