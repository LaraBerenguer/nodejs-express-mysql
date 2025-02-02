import {Router} from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user';

const router = Router();

router.get('/', getUsers)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.post('/', createUser)
router.put('/:id', updateUser)

export default router;