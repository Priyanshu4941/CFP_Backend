// // Import necessary modules
// // Import express
// const express = require('express');

// // Import the campaign controller
// const campaignController = require('../controllers/campaignController'); // Ensure the correct path to your controller

// // Import authentication middleware
// const { authMiddleware } = require('../middleware/authMiddleware'); // Ensure the correct path to your middleware

// // Create a new router instance
// const router = express.Router();

// // Route for creating a new campaign (protected by authMiddleware)
// router.post('/create', authMiddleware, campaignController.createCampaign);

// // Route to get all campaigns (public)
// router.get('/campaigns', campaignController.getAllCampaigns);

// // Route to get a specific campaign by ID (protected by authMiddleware)
// router.get('/campaigns/:id', authMiddleware, campaignController.getCampaignById);

// // Export the router
// module.exports = router;


// Import necessary modules
const express = require('express');
const campaignController = require('../controllers/campaignController'); // Correct path to your controller
const { authMiddleware } = require('../middleware/authMiddleware'); // Correct path to your middleware

// Create a new router instance
const router = express.Router();

// Route for creating a new campaign (protected by authMiddleware)
router.post('/create', authMiddleware, campaignController.createCampaign);

// Route to get all campaigns (public)
router.get('/campaigns', campaignController.getAllCampaigns);

// Route to get a specific campaign by ID (protected by authMiddleware)
router.get('/campaigns/:id', authMiddleware, campaignController.getCampaignById);

// ---- NEW ROUTE FOR FRONTEND DETAILS PAGE ----
// Route to render a specific campaign's details page (public)
router.get('/campaigns/details/:id', campaignController.renderCampaignDetails); // Use a specific path for clarity

// Export the router
module.exports = router;
