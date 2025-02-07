import {Router} from 'express';
import { createEvent, deleteEvent, getEvent, getEvents, patchEvent, updateEvent } from '../controllers/event';

const router = Router();

router.get('/', getEvents)
router.get('/:id', getEvent)
router.delete('/:id', deleteEvent)
router.post('/', createEvent)
router.put('/:id', updateEvent)
router.patch('/:id', patchEvent)

export default router;