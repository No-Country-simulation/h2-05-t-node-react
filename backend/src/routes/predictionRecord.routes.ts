import { Router } from 'express';
import { getPredictionHistoryByUser } from '../controllers/predictionRecord.controller';

const router = Router();

router.get('/predictionHistory',  getPredictionHistoryByUser);



export default router;