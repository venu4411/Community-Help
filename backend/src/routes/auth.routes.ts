import express from 'express';
import {
  loginUser,
  loginHelper,
  updateProfile,
  getHelpersByType,
  payAndBook
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/login/user', loginUser);
router.post('/login/helper', loginHelper);

router.put('/update/:role/:id', updateProfile);

router.get('/helpers/:type', getHelpersByType);

router.post('/pay-and-book', payAndBook);

export default router;
