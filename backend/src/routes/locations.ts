import {Router} from 'express';
import {RequestHandler} from 'express';
import { getLocations, getLocation, createLocation } from '../controllers/location';

const router = Router();

router.get('/', getLocations as RequestHandler);
router.get('/:id', getLocation as RequestHandler);
router.post('/', createLocation as RequestHandler);

export default router;