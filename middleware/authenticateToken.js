// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Get token from Authorization header and split it in case it's "Bearer <token>"
    const token = req.headers['authorization']?.split(' ')[1];

    // If no token is provided, send authorization error
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        // Verify the token using the JWT_SECRET from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = { id: decoded.id }; // Change this line

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        // Send a response indicating that the token is not valid
        res.status(403).json({ message: 'Token is not valid' });
    }
}

module.exports = authenticateToken;
