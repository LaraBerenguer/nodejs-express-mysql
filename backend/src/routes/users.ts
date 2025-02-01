import {Router} from 'express';
import { createUser, deleteUser, getUser, getUsers } from '../controllers/users';

const router = Router();

router.get('/', getUsers)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.post('/', createUser)

export default router;