const express = require('express');
const { register, verifyOtp, login } = require('../controllers/authController'); // Import login function
const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login); // Add login route

module.exports = router;
