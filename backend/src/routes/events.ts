import {Router} from 'express';
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from '../controllers/event';

const router = Router();

router.get('/', getEvents)
router.get('/:id', getEvent)
router.delete('/:id', deleteEvent)
router.post('/', createEvent)
router.put('/:id', updateEvent)

export default router;