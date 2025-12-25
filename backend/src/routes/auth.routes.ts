import express from 'express';
import { loginUser, loginHelper, updateProfile } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login/user', loginUser);
router.post('/login/helper', loginHelper);
router.put('/update/:role/:id', updateProfile);

export default router;
