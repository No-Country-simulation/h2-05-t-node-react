import { Router } from 'express';
import { createOnePrediction, deleteOnePrediction, getAllPredictions, getOnePrediction, updateOnePrediction } from '../controllers/prediction.controller';

const router = Router();

router.get('', getAllPredictions);
router.get('/:id', getOnePrediction);
router.post('/createPrediction', createOnePrediction);
router.delete('/:id', deleteOnePrediction);
router.put('/:id', updateOnePrediction);



export default router;