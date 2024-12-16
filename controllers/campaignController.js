// // Import the Campaign model (ensure you have this model in your "models" directory)
// const Campaign = require('../models/Campaign');

// // Controller function for creating a new campaign
// exports.createCampaign = async (req, res) => {
//     const { title, description, githubLink, deployedUrl, email, contactNumber } = req.body;

//     try {
//         // Ensure req.user is populated from the authMiddleware
//         if (!req.user || !req.user.id) {
//             return res.status(403).json({ message: 'User not authenticated' });
//         }

//         // Create a new campaign document with the user ID as the owner
//         const newCampaign = new Campaign({
//             title,
//             description,
//             githubLink,
//             deployedUrl,
//             email,
//             contactNumber,
//             owner: req.user.id // Using req.user.id correctly here
//         });

//         // Save the new campaign to the database
//         await newCampaign.save();
//         res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
//     } catch (error) {
//         console.error('Campaign creation error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Controller function for getting all campaigns
// exports.getAllCampaigns = async (req, res) => {
//     try {
//         const campaigns = await Campaign.find();
//         res.status(200).json(campaigns);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Controller function for getting a single campaign by ID
// exports.getCampaignById = async (req, res) => {
//     try {
//         // Fetch the campaign by the ID provided in the URL params
//         const campaign = await Campaign.findById(req.params.id);

//         // If no campaign is found, return a 404 error
//         if (!campaign) {
//             return res.status(404).json({ message: 'Campaign not found' });
//         }

//         // Respond with the found campaign
//         res.status(200).json(campaign);
//     } catch (error) {
//         console.error('Error fetching campaign:', error.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

























// Import the Campaign model (ensure you have this model in your "models" directory)
const Campaign = require('../models/Campaign');

// Controller function for creating a new campaign
exports.createCampaign = async (req, res) => {
    const { title, description, githubLink, deployedUrl, email, contactNumber } = req.body;

    try {
        // Ensure req.user is populated from the authMiddleware
        if (!req.user || !req.user.id) {
            return res.status(403).json({ message: 'User not authenticated' });
        }

        // Create a new campaign document with the user ID as the owner
        const newCampaign = new Campaign({
            title,
            description,
            githubLink,
            deployedUrl,
            email,
            contactNumber,
            owner: req.user.id // Using req.user.id correctly here
        });

        // Save the new campaign to the database
        await newCampaign.save();
        res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
    } catch (error) {
        console.error('Campaign creation error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller function for getting all campaigns
exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        console.error('Error fetching campaigns:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller function for getting a single campaign by ID
exports.getCampaignById = async (req, res) => {
    try {
        // Fetch the campaign by the ID provided in the URL params
        const campaign = await Campaign.findById(req.params.id);

        // If no campaign is found, return a 404 error
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        // Respond with the found campaign
        res.status(200).json(campaign);
    } catch (error) {
        console.error('Error fetching campaign:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// ---- NEW FUNCTION TO RENDER CAMPAIGN DETAILS PAGE ----
// This will be used for rendering the campaign details page on the frontend
exports.renderCampaignDetails = async (req, res) => {
    try {
        // Fetch the campaign by ID
        const campaign = await Campaign.findById(req.params.id);
        
        // If the campaign isn't found, return a 404 response
        if (!campaign) {
            return res.status(404).send('Campaign not found');
        }

        // Render the campaign details EJS page and pass the campaign data
        res.render('pages/campaign-details', { campaign });
    } catch (error) {
        console.error('Error rendering campaign details:', error.message);
        res.status(500).send('Server Error');
    }
};
