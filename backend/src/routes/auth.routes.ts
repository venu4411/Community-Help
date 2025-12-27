import express from 'express';
import {
  registerUser,
  registerHelper,
  loginUser,
  loginHelper,
  updateProfile,
  getHelpersByType,
  payAndBook
} from '../controllers/auth.controller';

const router = express.Router();
router.post('/register', registerUser);
router.post('/helper/register', registerHelper);

router.post('/login/user', loginUser);
router.post('/login/helper', loginHelper);

router.put('/update/:role/:id', updateProfile);

router.get('/helpers/:type', getHelpersByType);

router.post('/pay-and-book', payAndBook);

export default router;
