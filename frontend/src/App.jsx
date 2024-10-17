import './index.css'
import LoadingScreen from './components/layout/LoadingScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import MatchesPage from './pages/MatchesPage';
import NotFoundPage from './pages/NotFoundPage';
import PredictionsPage from './pages/PredictionsPage';
import MatchesCompletedPage from './pages/MatchesCompletedPage';
import DetailsPage from './pages/DetailsPage';
import CompletedPredictionsPage from './pages/CompletedPredictionsPage';
import ClassificationPage from './pages/ClassificationPage';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<LoadingScreen />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/matches" element={<MatchesPage />} />

            <Route path="/matches-completed" element={<MatchesCompletedPage />}>
              <Route index element={<CompletedPredictionsPage />} />
              <Route path='predictions' element={<CompletedPredictionsPage />} />
              <Route path='details' element={<DetailsPage />} />
              <Route path='classification' element={<ClassificationPage />} />
            </Route>

            <Route path="/predictions" element={<PredictionsPage />} />
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </div>

      </div>
    </Router>

  )
}

export default App