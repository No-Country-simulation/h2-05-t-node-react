import { Router } from 'express';
import { deleteOnePrediction, getAllPredictions, getOnePrediction, getPredictionRecordByMatch, postCreatePrediction, updateOnePrediction } from '../controllers/prediction.controller';
import { handleUserValidationErrors } from '../middlewares/prediction.validator';

const router = Router();

router.get('', getAllPredictions);
router.get('/:id', getOnePrediction);
//router.post('/createPrediction',predicionValidator, handleUserValidationErrors, postCreatePrediction);
router.post('/createPrediction', handleUserValidationErrors, postCreatePrediction);
router.delete('/:id', deleteOnePrediction);
router.put('/:id', updateOnePrediction);
router.get('/:userId/:matchId', getPredictionRecordByMatch);


export default router;