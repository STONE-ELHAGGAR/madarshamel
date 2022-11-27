const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Companies = require('./../models/companies');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify(['original-user','super-admin']), async (req,res,next) => {
    const {companyName, companyMobile} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const companies = Companies({companyName, companyMobile, created_at, u_id});

    try {
        await companies.save(function(err,companiesData) {
            console.log('Inserted Company '+companiesData._id);
            res.json({success: true,company: companiesData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/read', authJWT.verify(['original-user','super-admin']), async (req,res,next) => {
    try {
        const currentLoggedInUser = await Users.findById(req.userId);
            const currentLoggedInUserCreds = JSON.parse(currentLoggedInUser.creds);
            
            let authCredsSum;
            let userCreds = ['custom-clearance','transportation','super-admin'];
            //Check Creds Means Route Requested Creds
            if(userCreds.length > 0){
                let same_as_u_id, custom_clearance, super_admin, live_chat, original_user, transportation;
                let authSum = [];

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
            console.log(authCredsSum)
            let userRequest = {u_id: req.userId}; 
            if(authCredsSum){
                //He is 'custom-clearance','transportation','super-admin'
                userRequest = {};
            }
        let companiesData = await Companies.find(userRequest);
        res.json({success: true,companies: companiesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readById', authJWT.verify([]), async (req,res,next) => {
    const {id} = req.body;
    try {
        let companiesData = await Companies.find( { _id: id } );
        res.json({success: true,companies: companiesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readByMobile', authJWT.verify([]), async (req,res,next) => {
    const {mobile} = req.body;
    try {
        let companiesData = await Companies.find( { mobile: mobile } );
        res.json({success: true,companies: companiesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;