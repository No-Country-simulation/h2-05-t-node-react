import { Router } from 'express';
import { getAllUsers, getOneUser, createOneUser, deleteOneUser, updateOneUser, login } from '../controllers/user.controller';
import { handleUserValidationErrors, userValidator } from '../middlewares/user.validator';
import { authenticateToken } from '../middlewares/auth.middeware';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/createUser',userValidator, handleUserValidationErrors, createOneUser);
router.post('/login', login);
router.delete('/:id',authenticateToken ,deleteOneUser);
router.put('/:id',authenticateToken, updateOneUser);

export default router;