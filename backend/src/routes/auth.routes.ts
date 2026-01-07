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
  getAllUsers,
  getAllHelpers,
  updateHelperByAdmin,
  updateUserByAdmin,
  getAllBookings,



  getPendingForHelper,
  acceptTask,
  getHelperTasks,
  getUserTasks,

  getCalendar,

  sendMessage,
  getChatHistory,
  getChatContacts,
  checkAvailability,

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

router.get('/admin/users', getAllUsers);
router.put('/admin/users/:id', updateUserByAdmin);



router.get('/admin/helpers', getAllHelpers);
router.put('/admin/helpers/:id', updateHelperByAdmin);

router.get('/admin/bookings', getAllBookings);

router.get('/payments/helper/pending', getPendingForHelper);
router.put('/payments/accept/:id', acceptTask);
router.get('/payments/user/:username', getUserTasks);
router.get('/payments/helper/:helpername', getHelperTasks);



router.get('/calendar/:role/:name', getCalendar);


router.get('/chat/contacts', getChatContacts);
router.get('/chat/history', getChatHistory);
router.post('/chat/send', sendMessage);



router.post('/check-availability', checkAvailability);



export default router;
