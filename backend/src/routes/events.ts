import {Router} from 'express';
import {RequestHandler} from 'express';
import { createEvent, deleteEvent, getEvent, getEvents, patchEvent, updateEvent } from '../controllers/event';

const router = Router();

router.get('/', getEvents as RequestHandler);
router.get('/:id', getEvent as RequestHandler);
router.delete('/:id', deleteEvent as RequestHandler);
router.post('/', createEvent as RequestHandler);
router.put('/:id', updateEvent as RequestHandler);
router.patch('/:id', patchEvent as RequestHandler);

export default router;