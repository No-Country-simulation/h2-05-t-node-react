import { Router } from 'express';
import { getAllUsers, getOneUser, createOneUser, deleteOneUser, updateOneUser, login } from '../controllers/user.controller';
import { userValidator } from '../middlewares/user.validator';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/createUser',userValidator, createOneUser);
router.post('/login', login);
router.delete('/:id', deleteOneUser);
router.put('/:id', updateOneUser);

export default router;