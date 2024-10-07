import { Router } from 'express';
import { getAllUsers, getOneUser, createOneUser, deleteOneUser, updateOneUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.post('/createUser', createOneUser);
router.delete('/:id', deleteOneUser);
router.put('/:id', updateOneUser);

export default router;