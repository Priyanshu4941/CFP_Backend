const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

// Donor Dashboard - Only for authenticated donors
router.get('/donor-dashboard', authMiddleware, (req, res) => {
    res.render('pages/dashboard');  // Render the dashboard page (dashboard.ejs)
});

// Startup Owner Dashboard - Only for authenticated startup owners
router.get('/startup-dashboard', authMiddleware, (req, res) => {
    res.render('pages/dashboard');  // Render the dashboard page (dashboard.ejs)
});

module.exports = router;
