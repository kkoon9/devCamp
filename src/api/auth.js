const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router
  .route('/register')
  .post(register);

router
  .route('/login')
  .post(login);

router
  .route('/me')
  .get(protect, getMe);

router
  .route('/forgetpassword')
  .post(forgotPassword);

router
  .get('/logout', logout);

module.exports = router;