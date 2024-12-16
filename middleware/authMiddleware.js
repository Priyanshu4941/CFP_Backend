const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    // Get token from the Authorization header and split it if it's a "Bearer <token>" format
    const token = req.headers['authorization']?.split(' ')[1]; 

    // If there's no token, send an authorization error
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token using the secret from the .env file
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user data (including the user ID) to the request object
        req.user = decoded; // Ensure you're using req.user as planned in your controllers

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);

        // Send an invalid token response
        res.status(403).json({ message: 'Token is not valid' });
    }
};
