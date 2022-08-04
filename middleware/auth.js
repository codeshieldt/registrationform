const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function auth(req, res, next)
{
    const token = req.header('token');
    if(!token) return res.status(401)
        .redirect('./login.html');
    
    try{
        const decoded = jwt = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    }
    catch(ex)
    {
        res.status(400).redirect('/login.html')
    }
}