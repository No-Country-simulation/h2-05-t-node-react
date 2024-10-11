import './index.css'
import LoadingScreen from './components/layout/LoadingScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import PredictionsPage from './pages/PredictionsPage';
import RegisterPage from "./pages/RegisterPage"

function App() {

  return (
    <Router>
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={<LoadingScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
     
        </Routes>
      </div>
    
    </div>
  </Router>

  )
}

export default App