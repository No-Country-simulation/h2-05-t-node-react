import express from 'express';
import { getPredictionQuotaByDate } from '../controllers/predictionQuota.controller';

const router = express.Router();


router.get('/predictionQuota', getPredictionQuotaByDate);
export default router;