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
    const {userCreds,params,modelName} = req.body;
    const currentLoggedInUser = await Users.findById(req.userId);
    const currentLoggedInUserCreds = JSON.parse(currentLoggedInUser.creds);
    let authCredsSum;
    //Check Creds Means Route Requested Creds
    if(userCreds.length > 0){
        let same_as_u_id, custom_clearance, super_admin, live_chat, original_user, transportation;
        let authSum = [];
        if(modelName){
            //Model MongoDB Table schema
            const Model = require('./../models/'+modelName);
            let itemId = req.body[params[0]];
            const itemData = await Model.find({_id: itemId});

            (itemData[0].u_id == currentLoggedInUser.id) ? same_as_u_id = true : same_as_u_id = false;
            
        }
        (currentLoggedInUserCreds.includes('custom-clearance')) ? custom_clearance = true : custom_clearance = false;
        (currentLoggedInUserCreds.includes('transportation')) ? transportation = true : transportation = false;
        (currentLoggedInUserCreds.includes('super-admin')) ? super_admin = true : super_admin = false;
        (currentLoggedInUserCreds.includes('live-chat')) ? live_chat = true : live_chat = false;
        (currentLoggedInUserCreds.includes('original-user')) ? original_user = true : original_user = false;


        (userCreds.includes('same-as-u-id')) ? authSum.push(same_as_u_id) : false ;
        (userCreds.includes('custom-clearance')) ? authSum.push(custom_clearance) : false ;
        (userCreds.includes('transportation')) ? authSum.push(transportation) : false ;
        (userCreds.includes('super-admin')) ? authSum.push(super_admin) : false ;
        (userCreds.includes('live-chat')) ? authSum.push(live_chat) : false ;
        (userCreds.includes('original-user')) ? authSum.push(original_user) : false ;
        if (authSum.find(e => e === true)) {
            authCredsSum = true;
        }else{
            authCredsSum = false;
        }
    }else{
        authCredsSum = true;
    }

    return res.status(200).json({
        success: authCredsSum,
        data: {
            id: currentLoggedInUser._id,
            name: currentLoggedInUser.name,
            email: currentLoggedInUser.email
        }
    });
});

router.post('/register',async (req,res,next) => {
    const {name, mobile, email, password} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const creds = '["original-user"]';
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

router.post('/adminRegister',async (req,res,next) => {
    const {name, mobile, creds, email, password} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
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
router.post('/adminReadAllUsers', authJWT.verify([]), async (req,res,next) => {
    try {
        let usersData = await Users.find();
        res.json({success: true,users: usersData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});


module.exports = router;