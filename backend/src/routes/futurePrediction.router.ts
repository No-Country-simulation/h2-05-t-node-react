import express from 'express';
import { createFuturePrediction } from '../controllers/predictionController';
import { userPredictions } from '../controllers/prediction.controller';

const router = express.Router();

router.post('/use-future-prediction', createFuturePrediction); 
router.get('/predictions/:id', userPredictions);
export default router;