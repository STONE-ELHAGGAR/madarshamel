const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users MongoDB Table schema
const Users = require('./../models/users');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');
const cryptPassword = require('./../../util/bcrypt');
const comparePassword = require('./../../util/comparePassword');
const sendEmail = require('./../../util/sendEmail');

router.post('/login',async (req,res,next) => {
    const { email, password } = req.body;
    try{
        const user = await Users.findOne({ email });
        comparePassword(password, user.password, (err, isPasswordMatch) => {
                if(isPasswordMatch){
                    //Matched
                    console.log('matched')
                    //Check if User activated
                    if(user.timeStamp){
                        //Not Activated
                        return res.status(401).json({
                            message: 'Invalid Credentials'
                        });
                    }else{
                        //Activated
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
                    }
                }else{
                    //Not Matched
                    console.log('Not Matched')
                    return res.status(401).json({
                        message: 'Invalid Credentials'
                    });
                }
        })
    }catch(e){
        return res.status(401).json({
            message: 'Invalid Credentials'
        });
    }
});

router.post('/getNumId', authJWT.verify([]), async (req,res,next) => {
    const {modelName, _id} = req.body;
    if(_id){
        const Model = require('./../models/'+modelName);
        const countGTrecords = await Model.find({_id: {$lt: _id}}).count()+501;
        return res.status(200).json({ success: true, numId: countGTrecords});
    }
});

router.post('/verifyAccount' ,async (req,res) => {
    const {verifyCode} = req.body;
    let id_stamp = verifyCode.split('_');
    let u_id = id_stamp[0];
    let timeStamp = id_stamp[1];
    let verifyResult = {};
    try{
        const user = await Users.find({ _id: u_id });
        if(user[0]?.timeStamp){
            if(user[0].timeStamp == timeStamp){
                user[0].timeStamp
                const userUpdate = await Users.updateOne(
                    {_id: user[0]._id},
                    {$set:{ timeStamp: '' }}
                );
                verifyResult = {
                    success: true,
                    message: 'Verified Successfully.'
                };
            }else{
                verifyResult = {
                    success: true,
                    message: 'Verification Code is Wrong.'
                };
            }
        }else{
            verifyResult = {
                success: true,
                message: 'This account is already Verified.'
            };
        }
    }catch(e){
        verifyResult = {
            success: true,
            message: 'Cannot Find the User.',
            error: e
        };
    }
    
    return res.status(200).json(verifyResult);
})

router.post('/changePassword' ,async (req,res) => {
    const {verifyCode, password} = req.body;
    let id_stamp = verifyCode.split('_');
    let u_id = id_stamp[0];
    let timeStamp = id_stamp[1];
    let verifyResult = {};
    cryptPassword(password, async (err, cryptedPassword) => {
    try{
        const user = await Users.find({ _id: u_id });
        if(user[0]?.timeStamp){
            if(user[0].timeStamp == timeStamp){
                user[0].timeStamp
                const userUpdate = await Users.updateOne(
                    {_id: user[0]._id},
                    {$set:{ timeStamp: '', password: cryptedPassword }}
                );
                verifyResult = {
                    success: true,
                    message: 'Changed Successfully.'
                };
            }else{
                verifyResult = {
                    success: true,
                    message: 'This Link is invalid.'
                };
            }
        }else{
            verifyResult = {
                success: true,
                message: 'This Link is invalid.'
            };
        }
    }catch(e){
        verifyResult = {
            success: true,
            message: 'Cannot Find the User.',
            error: e
        };
    }
    
    return res.status(200).json(verifyResult);
})
})


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
            console.log('Check if User '+currentLoggedInUser._id+' Same u_id for '+modelName+' : '+itemId);
            (itemData[0].u_id == currentLoggedInUser._id) ? same_as_u_id = true : same_as_u_id = false;
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
    let timeStamp = new Date().valueOf();
    cryptPassword(password, async (err, cryptedPassword) => {
        let user = Users({
            name,
            mobile,
            creds,
            ip,
            email,
            password: cryptedPassword,
            created_at,
            timeStamp
        });
        try {
            await user.save(function async (err,userData) {
                console.log('Inserted user '+userData._id);
                sendEmail(
                    userData.email, //To Email
                    userData.name, //To Name
                  'Madarshamel | Verify Madarshamel Account', //Message Subject
                  process.env.BASEURL+'/dashboard/verify/'+userData._id+'_'+userData.timeStamp, //btn_link
                  'Verify', //btn_content
                  'Welcome '+userData.name+' To Madarshamel', //temp_line1
                  'We are proud of you joining our family ... Click on "Verify" button to verify your account, please', //temp_line2
                  '', //temp_line3
                  '', //temp_line4
                );
            });
            res.json({success: true});

        }catch(e) {
            return res.status(500).json({ message: 'Something went wrong' });
        }
    })
});

router.post('/adminRegister',async (req,res,next) => {
    const {name, mobile, debtLimit, creds, email, password} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const user = Users({
        name,
        mobile,
        creds,
        ip,
        email,
        debtLimit,
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

router.post('/readById', authJWT.verify([]), async (req,res,next) => {
    try {
        let usersData = await Users.find({_id: req.userId});
        res.json({success: true,users: usersData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readByUser', authJWT.verify([]), async (req,res,next) => {
    const {id} = req.body;
    try {
        let usersData = await Users.find({_id: id});
        res.json({success: true,users: usersData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/updateMySelf', authJWT.verify([]), async (req,res,next) => {
    const {name, mobile} = req.body;
    try {
        let usersData = await Users.updateOne(
            {_id: req.userId},
            { $set: {name, mobile} }
         );
        res.json({success: true,users: usersData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/updateUser', authJWT.verify([]), async (req,res,next) => {
    const {id, name, mobile, email, creds} = req.body;
    try {
        let usersData = await Users.updateOne(
            {_id: id},
            { $set: {name, mobile, email, creds} }
         );
        res.json({success: true,users: usersData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/rememberPass', async (req,res,next) => {
    const {email} = req.body;
    try {
        let usersData = await Users.find({email: email});
        if(usersData.length === 1){
            let timeStamp = new Date().valueOf();
            let usersDataStamped = await Users.updateOne(
                {_id: usersData[0]._id},
                { $set: {timeStamp} }
            );
            try{
            sendEmail(
                usersData[0].email, //To Email
                usersData[0].name, //To Name
              'Madarshamel | Reset Password Madarshamel', //Message Subject
              process.env.BASEURL+'/change-password/'+usersData[0]._id+'_'+timeStamp, //btn_link
              'Reset Password', //btn_content
              'Welcome '+usersData[0].name, //temp_line1
              'Here is your password account ... Click on "Reset Password" button to Reset your account, please', //temp_line2
              'This link button is secret', //temp_line3
              'Please DON`T send or share this link to anyone.', //temp_line4
            );
            }catch(e){
                console.log(e)
            }
            res.json({success: true,users: usersData,case: 'success' , message: 'We`ve Sent You an email to change your Password.'});
        }else{
            res.json({success: true,users: email,case: 'danger', message: 'We`ve not found an user with this email: '+email});
        }
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});


module.exports = router;