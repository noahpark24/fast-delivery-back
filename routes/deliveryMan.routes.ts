import express from 'express';
const router = express();
import {
  get_taked_packages,
  mark_pacakge_as_delivered,
  take_package,
  untake_package,
  get_all_deliverymans,
} from '../controllers/deliveryMan.controller';
import validateUser from '../middlewares/auth';

router.get('/taked-packages', validateUser, get_taked_packages);
router.get('/all', validateUser, get_all_deliverymans);
router.post('/take-package/:packageId', validateUser, take_package);
router.post(
  '/mark-delivered-package/:packageId',
  validateUser,
  mark_pacakge_as_delivered
);
router.delete('/untake-package/:packageId', validateUser, untake_package);

export default router;
