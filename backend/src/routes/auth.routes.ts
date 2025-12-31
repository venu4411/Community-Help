import express from 'express';
import {
  registerUser,
  registerHelper,
  loginUser,
  loginHelper,
  updateProfile,
  getHelpersByType,
  payAndBook,

  
  getTasksByUser,
  getTasksByHelper,
  completeTask,
  rateHelper,

  adminLogin,

} from '../controllers/auth.controller';

const router = express.Router();
router.post('/register', registerUser);
router.post('/helper/register', registerHelper);

router.post('/login/user', loginUser);
router.post('/login/helper', loginHelper);

router.put('/update/:role/:id', updateProfile);

router.get('/helpers/:type', getHelpersByType);

router.post('/pay-and-book', payAndBook);


router.get('/task/user/:username', getTasksByUser);
router.get('/task/helper/:helpername', getTasksByHelper);
router.post('/task/complete', completeTask);
router.post('/rate-helper', rateHelper);

router.post('/admin/login', adminLogin);




export default router;
