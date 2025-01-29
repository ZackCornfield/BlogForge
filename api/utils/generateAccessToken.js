const jwt = require('jsonwebtoken');

// Generate Access Token
const generateAccessToken = (user) => {
    return jwt.sign({ user: user }, process.env.TOKEN_SECRET, { expiresIn: 604800000 }) // Expires in 7 days    
}

module.exports = generateAccessToken;