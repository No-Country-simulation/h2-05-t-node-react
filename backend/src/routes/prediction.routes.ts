import { Router } from 'express';
import { createOnePrediction, deleteOnePrediction, getAllPredictions, getOnePrediction, updateOnePrediction } from '../controllers/prediction.controller';
import { handleUserValidationErrors, predicionValidator } from '../middlewares/prediction.validator';

const router = Router();

router.get('', getAllPredictions);
router.get('/:id', getOnePrediction);
router.post('/createPrediction',predicionValidator, handleUserValidationErrors, createOnePrediction);
router.delete('/:id', deleteOnePrediction);
router.put('/:id', updateOnePrediction);



export default router;