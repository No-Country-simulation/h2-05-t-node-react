import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import MatchesPage from './pages/MatchesPage';
import NotFoundPage from './pages/NotFoundPage';
import MatchesCompletedPage from './pages/MatchesCompletedPage';
import DetailsPage from './pages/DetailsPage';
import ClassificationPage from './pages/ClassificationPage';
import HomePage from './pages/HomePage';
import Predictions from './components/completedMatches/Predictions';
import MyPredictionsPage from './pages/MyPredictionsPage';
import DivisionsPage from './pages/DivisionsPage';
import ScoutPlayersPage from './pages/ScoutPlayersPage';
import Quests from './pages/divisions/Quests';
import Rewards from './pages/divisions/Rewards';
import Ranking from './pages/divisions/Ranking';
import MonthlyPrizes from './pages/divisions/MonthlyPrizes';
import RankingSP from './pages/scoutPlayers/RankingSP';
import Market from './pages/scoutPlayers/Market';
import Statistics from './pages/scoutPlayers/Statistics';
import Players from './pages/scoutPlayers/PlayersPage';
import PlayersPage from './pages/scoutPlayers/PlayersPage';
import PlayerDetails from './pages/scoutPlayers/players/PlayerDetails';
import PlayerToken from './pages/scoutPlayers/players/PlayerToken';

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="content flex-grow">
          <Routes>
            {/* <Route path="/" element={<LoadingScreen />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            {/* <Route path="/divisions" element={<DivisionsPage />} /> */}
            {/* <Route path="/scout-players" element={<ScoutPlayersPage />} /> */}

            <Route path="/matches-completed" element={<MatchesCompletedPage />}>
              <Route index element={<Predictions />} />
              <Route path='predictions' element={<Predictions />} />
              <Route path='details' element={<DetailsPage />} />
              <Route path='classification' element={<ClassificationPage />} />
            </Route>

            <Route path="/divisions" element={<DivisionsPage />}>
              <Route index element={<Ranking />} />
              <Route path='ranking' element={<Ranking />} />
              <Route path='rewards' element={<Rewards />} />
              <Route path='quests' element={<Quests />} />
            </Route>
            <Route path="/divisions/rewards/prizes" element={<MonthlyPrizes />} />

            <Route path="/scout-players" element={<ScoutPlayersPage />}>
              <Route index element={<RankingSP />} />
              <Route path='ranking' element={<RankingSP />} />
              <Route path='market' element={<Market />} />
              <Route path='statistics' element={<Statistics />} />
            </Route>

            <Route path="/scout-players/ranking/players/:id" element={<PlayersPage />}>
              <Route index element={<PlayerDetails />} />
              <Route path="details" element={<PlayerDetails />} />
              <Route path="token" element={<PlayerToken />} />
            </Route>

            <Route path="/me/predictions" element={<MyPredictionsPage />} />
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </div>

        {/* <Footer /> */}
      </div>
    </Router>

  )
}

export default App