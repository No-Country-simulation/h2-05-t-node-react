import { Router } from 'express';
import { createMatch, deleteMatch, getAllMatches, getOneMatch, updateMatch } from '../controllers/match.controller';

const router = Router();

router.get('', getAllMatches);
router.get('/:id', getOneMatch);
router.post('/createMatch', createMatch);
router.delete('/:id', deleteMatch);
router.put('/:id', updateMatch);

export default router;