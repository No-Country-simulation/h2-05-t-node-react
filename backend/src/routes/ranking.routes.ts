import { Router } from 'express';
import { getRankingByDivision, getRankingByUserId } from '../controllers/ranking.controller';
import { populateRankingForExistingUsers } from '../services/user.service';

const router = Router();


router.get('/:id/division', getRankingByUserId);
router.get('/division/:division', getRankingByDivision )

//ruta creada para pruebas luego no tendra utilidad
router.post('/assignDivision', populateRankingForExistingUsers )

export default router;
