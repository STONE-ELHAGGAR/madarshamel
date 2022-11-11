const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users MongoDB Table schema
const Users = require('./../models/users');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/login',async (req,res,next) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if(!user || user.password != password) {
        return res.status(401).json({
            message: 'Invalid Credentials'
        });
    }
    //{sub: user._id} is payload to create accessToken
    const accessToken = authJWT.sign({sub: user._id});
    const successLogin = {
        success: true,
        data: {
            id: user._id,
            name: user.name,
            accessToken: accessToken
        }
    };
    return res.status(200).json(successLogin);
});

router.post('/loginCheck', authJWT.verify([]) ,async (req,res,next) => {
    const user = await Users.findById(req.userId);
    return res.status(200).json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

router.post('/register',async (req,res,next) => {
    const {name, mobile, email, password} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const creds = 'admin';
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const user = Users({
        name,
        mobile,
        creds,
        ip,
        email,
        password,
        created_at
    });

    try {
        await user.save();
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }

    res.status(200).json({success: true});
});

module.exports = router;