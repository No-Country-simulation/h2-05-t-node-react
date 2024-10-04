import { Router } from 'express';
import { getApi } from '../controllers/api.controller';

const router = Router();

router.get('/api_football', getApi)

export default router;