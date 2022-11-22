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
    const user = await Users.findOne({ email });
    /*if(!user || user.password != password) {
        return res.status(401).json({
            message: 'Invalid Credentials'
        });
    }*/
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


module.exports = router;