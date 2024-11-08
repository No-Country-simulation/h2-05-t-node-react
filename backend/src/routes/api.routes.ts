import { Router } from 'express';
import { getAllstandings, getEdedMatch, getNewFixture, getNewLeagues, getNewMatchEnded, getNewOdds, getNewTeams } from '../controllers/api.controller';


const router = Router();

router.get('/api_standings', getAllstandings);
router.get('/api_fixture', getNewFixture);
router.get('/api_odds', getNewOdds);
router.get('/api_NewTeam', getNewTeams);
router.get('/api_NewLeague', getNewLeagues);
router.get('/api_NewMatchEndad', getNewMatchEnded);
router.get('/api_endedMatch', getEdedMatch);

export default router;