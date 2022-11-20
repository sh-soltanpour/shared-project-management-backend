const jwt = require('jsonwebtoken');

function generateAccessToken(id, email) {
    return jwt.sign({id, email}, process.env.TOKEN_SECRET || "123", {expiresIn: '18000s'});
}

module.exports = {generateAccessToken};
