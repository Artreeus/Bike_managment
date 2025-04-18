import express from 'express';
import {
  createBike,
  getBikes,
  getBikeById
} from '../controllers/bikeController';

const router = express.Router();

router.post('/', createBike);
router.get('/', getBikes);
router.get('/:id', getBikeById);

export default router;