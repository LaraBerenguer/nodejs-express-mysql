import {Router} from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user';

const router = Router();

router.get('/', getUsers as RequestHandler);
router.get('/:id', getUser as RequestHandler);
router.delete('/:id', deleteUser as RequestHandler);
router.post('/', createUser as RequestHandler);
router.put('/:id', updateUser as RequestHandler);

export default router;