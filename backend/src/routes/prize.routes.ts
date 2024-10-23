import { Router } from "express";
import { createOnePrize, deleteOnePrize, getAllPrize, getOnePrize, updateOnePrize } from "../controllers/prize.controller";

const router = Router();

router.get('', getAllPrize);
router.get('/:id', getOnePrize);
router.post('/createPrize', createOnePrize);
router.delete('/:id', deleteOnePrize);
router.put('/:id', updateOnePrize);

export default router;