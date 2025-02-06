import {Router} from 'express';
import { getLocations, getLocation, createLocation } from '../controllers/location';

const router = Router();

router.get('/', getLocations)
router.get('/:id', getLocation)
router.post('/', createLocation)

export default router;