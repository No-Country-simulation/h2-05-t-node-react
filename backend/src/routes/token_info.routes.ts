import { Router } from "express";
import { deleteTokenInfo, getAllTokenInfo, TokenByFullName, getTokenInfo, postCreateTokenInfo, putUpdateTokenInfo } from "../controllers/token_info.controller";

const router = Router();


router.get('', getAllTokenInfo);
router.get('/:id', getTokenInfo);
router.get('/tokenByName/name', TokenByFullName);
router.post('/create_Token_Info', postCreateTokenInfo);
router.delete('/:id', deleteTokenInfo);
router.put('/:id', putUpdateTokenInfo);



export default router;