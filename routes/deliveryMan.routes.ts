import express from 'express';
const router = express();
import {
  get_taked_packages,
  take_package,
  untake_package,
} from '../controllers/deliveryMan.controller';
import validateUser from '../middlewares/auth';

router.post('/take-package/:packageId', validateUser, take_package);
router.get('/taked-packages', validateUser, get_taked_packages);
router.delete('/untake-package/:packageId', validateUser, untake_package);

export default router;
