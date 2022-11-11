const jwt = require('jsonwebtoken');
//Users MongoDB Table schema
const Users = require('./../server/models/users');
require('dotenv').config();
const secret = process.env.API_SECRET;
const expiresIn = '24h';

exports.sign = (payload) => jwt.sign(payload, secret, {expiresIn});

exports.verify = (userCreds = []) => {
    return async (req,res,next) => {
        const token = req.headers['authorization'];
        try {
            const payload = jwt.verify(token, secret);
            req.userId = payload.sub;
            const user = await Users.findById(req.userId);
            /*
            Here do not forget to check user creds
            if equaled use next() if not status(500)
            or find how to jump to catch(e)
            */
            next();
        } catch(e) {
            res.status(500).json({success: false, message: 'unauthorized'});
        }
    }
}