import express from 'express';
import {
  createService,
  getServices,
  getServiceById,
  completeService,
  getOverdueServices
} from '../controllers/serviceController';

const router = express.Router();

router.post('/', createService);
router.get('/', getServices);
router.get('/status', getOverdueServices);
router.get('/:id', getServiceById);
router.put('/:id/complete', completeService);

export default router;