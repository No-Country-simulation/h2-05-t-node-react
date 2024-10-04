import { Router } from 'express';
import { getApi, getRecord } from '../controllers/api.controller';

const router = Router();

router.get('/api_match', getApi)
router.get('/api_record', getRecord)

export default router;