const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Custom_clearance MongoDB Table schema (models)
const Custom_clearance = require('./../models/custom_clearance');
const Files = require('./../models/files');
const Users = require('./../models/users');
const Companies = require('./../models/companies');
const Branches = require('./../models/branches');
const Settings = require('./../models/settings');

//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify(['original-user','custom-clearance','super-admin']), async (req,res,next) => {
    const {companyName, branch, transactionPlace, shippingPort, recivingPort, sourceCountry, expectedShipDate, attachedFiles} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const custom_clearance = Custom_clearance({companyName, branch, transactionPlace, shippingPort, recivingPort, sourceCountry, expectedShipDate, attachedFiles, created_at, u_id});

    try {
        await custom_clearance.save(function(err,custom_clearanceData) {
            console.log('Inserted Custom Clearance Request '+custom_clearanceData._id);
            res.json({success: true,custom_clearance: custom_clearanceData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/read', authJWT.verify(
    ['same-as-u-id','custom-clearance','super-admin'], //Creds
    ['_id'], //Needed Params to auth
    'custom_clearance' //Model Name
    ), async (req,res,next) => {
    const { _id } = req.body;
    try{
        const custom_clearance = await Custom_clearance.findById(req.body._id);
        const user = await Users.findById(custom_clearance.u_id);
        //const files = await Files.find( { _id : { $in : Object.values(JSON.parse(custom_clearance.attachedFiles)) } } );
        const name = user.name;
        //console.log('Founded Custom Clearance Request '+custom_clearance._id+ ' ,And It`s "FILES"');
        console.log('Founded Custom Clearance Request '+custom_clearance._id);
        //return res.status(200).json({ success: true, custom_clearance: custom_clearance, name: name, files: files});
        return res.status(200).json({ success: true, custom_clearance: custom_clearance, name: name});
    }catch(e){
        return res.status(404).json({ message: 'Something went wrong' ,_id: _id ,error: e });
    }
});

router.post('/readAll', authJWT.verify(['original-user','custom-clearance','super-admin']), async (req,res,next) => {
    try{
        const custom_clearances = await Custom_clearance.find({u_id: req.userId}).limit(5);
        console.log('Founded Custom Clearance Requests');
        return res.status(200).json({ success: true, custom_clearances: custom_clearances});
    }catch(e){
        return res.status(404).json({ message: 'Something went wrong' ,error: e });
    }
});


router.post('/readAllRequests', authJWT.verify(['original-user','custom-clearance','super-admin']), async (req,res,next) => {
        try{
            const currentLoggedInUser = await Users.findById(req.userId);
            const currentLoggedInUserCreds = JSON.parse(currentLoggedInUser.creds);
            
            let authCredsSum;
            let userCreds = ['custom-clearance','super-admin'];
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
                //He is 'custom-clearance','super-admin'
                userRequest = {};
            }
            const custom_clearances = await Custom_clearance.find(userRequest);

            //Start of fields
            let newcustom_clearance = [];
            for(custom_clearance in custom_clearances){
                const countGTrecords = await Custom_clearance.find({_id: {$lt: custom_clearances[custom_clearance]._id}}).count()+501;
                let companyData = await Companies.find( { _id: custom_clearances[custom_clearance].companyName } );
                let branchData = await Branches.find( { _id: custom_clearances[custom_clearance].branch } );
                let transactionPlace = await Settings.find( { _id: custom_clearances[custom_clearance].transactionPlace } );
                let shippingPort = await Settings.find( { _id: custom_clearances[custom_clearance].shippingPort } );
                let recivingPort = await Settings.find( { _id: custom_clearances[custom_clearance].recivingPort } );
                let sourceCountry = await Settings.find( { _id: custom_clearances[custom_clearance].sourceCountry } );
                
                newcustom_clearance.push({
                    _id: custom_clearances[custom_clearance]._id,
                    id: countGTrecords,
                    companyName: companyData[0].companyName,
                    branch: branchData[0].name+' --- '+branchData[0].address,
                    transactionPlace: transactionPlace[0].content,
                    shippingPort: shippingPort[0].content,
                    recivingPort: recivingPort[0].content,
                    sourceCountry: sourceCountry[0].content,
                    expectedShipDate: custom_clearances[custom_clearance].expectedShipDate,
                    created_at: custom_clearances[custom_clearance].created_at
                });
            }
            //End of fields

            console.log('Founded Custom Clearance Requests');
            return res.status(200).json({ success: true, custom_clearances: newcustom_clearance});
    }catch(e){
        return res.json({ message: 'Something went wrong' ,error: e });
    }
});

module.exports = router;