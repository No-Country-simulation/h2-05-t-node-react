import { Router } from 'express';
import { getMatchApi, getCountriesApi, getRecord, getLeagueApi, getTeamApi, getPlayerApi, getOnePlayerApi, getAllMatchesApi } from '../controllers/api.controller';

const router = Router();

router.get('/api_match', getMatchApi);
router.get('/api_AllMatch', getAllMatchesApi);
router.get('/api_record', getRecord);
router.get('/api_country', getCountriesApi);
router.get('/api_league', getLeagueApi);
router.get('/api_team', getTeamApi);
router.get('/api_players', getPlayerApi);
router.get('/api_Oneplayers', getOnePlayerApi);

export default router;