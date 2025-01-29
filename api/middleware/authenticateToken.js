const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // If there is no token, set the user data in the request object to null and continue
    if (!token) {
        req.user = null;
        return next(); 
    }   

    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            req.user = null;
            return next();
        }

        // Set the user data in the request object  
        req.user = {username: data.user.username, role_id: data.user.role_id};
        next();
    });
}

module.exports = authenticateToken;