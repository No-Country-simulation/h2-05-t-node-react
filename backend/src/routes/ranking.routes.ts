import { Router } from 'express';
import { getRankingByDivision, getRankingByUserId } from '../controllers/ranking.controller';


const router = Router();


router.get('/user/:id/division', getRankingByUserId);
router.get('/ranking/division/:division', getRankingByDivision )

export default router;
