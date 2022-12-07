const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, transportation MongoDB Table schema (models)
const Transportation = require('./../models/transportation');
const Users = require('./../models/users');
const Settings = require('./../models/settings');
const sendEmail = require('./../../util/sendEmail');
const getNumId = require('./../../util/getNumId');

//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify(['original-user','transportation','super-admin']), async (req,res,next) => {
    const {companyName, companyMobile, companyAddress, transactionPlace, fromDate, toDate, sourceCountry, drivers, expectedShipDate, carCost, transferData, attachedFiles} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const country = await Settings.findById(sourceCountry);
    const transportation = Transportation({companyName, companyMobile, companyAddress, transactionPlace, fromDate, toDate, sourceCountry, drivers, expectedShipDate, carCost, transferData, created_at, u_id, attachedFiles});

    try {
        await transportation.save(function(err,transportationData) {
            console.log('Inserted Transportation Request '+transportationData._id);
            getNumId(transportationData._id,'transportation').then((numId) => {
            //Send Email To CS
            sendEmail(
                'cs@madarshamel.sa', //To Email
                'Madarshamel Customer Service', //To Name
            'Madarshamel | New Transportation Request From '+user.name, //Message Subject
            '', //btn_link
            '', //btn_content
            '', //temp_line3
            user.name+' Created Transportation Request', //temp_line1
            'Email: '+user.email+' Phone: '+user.mobile, //temp_line2
            '<table class="table table-striped" style="margin: 0px;width: 100%;float: left;">\
            <thead><tr><th scope="col">Field</th><th scope="col">Value</th></tr></thead><tbody id="requestChangesConData">\
            <tr><th style="border:1px solid #000;" scope="row">ID</th><td id="_id">'+numId+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Name</th><td>'+transportationData.companyName+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Mobile</th><td>'+transportationData.companyMobile+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Address</th><td>'+transportationData.companyAddress+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Transaction Place</th><td id="transactionPlace">'+transportationData.transactionPlace+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Source Country</th><td id="sourceCountry">'+country.content+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Reciving Port Data</th><td>'+transportationData.fromDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Shipping Port Data</th><td>'+transportationData.toDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Expected Ship Date</th><td id="expectedShipDate">'+transportationData.expectedShipDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Chamber Of Commerce Number</th><td id="chamberOfCommerceNumber">'+transportationData.carCost+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Postal Code</th><td id="postalCode">'+transportationData.transferData+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">By User</th><td id="u_id">'+user.name+'</td></tr></tbody></table>'+'<br/> Created at: '+created_at, //temp_line4
            );
            //Send Email To Ali
            sendEmail(
                'ali@madarshamel.sa', //To Email
                'Madarshamel Ali', //To Name
            'Madarshamel | New Transportation Request From '+user.name, //Message Subject
            '', //btn_link
            '', //btn_content
            '', //temp_line3
            user.name+' Created Transportation Request', //temp_line1
            'Email: '+user.email+' Phone: '+user.mobile, //temp_line2
            '<table class="table table-striped" style="margin: 0px;width: 100%;float: left;">\
            <thead><tr><th scope="col">Field</th><th scope="col">Value</th></tr></thead><tbody id="requestChangesConData">\
            <tr><th style="border:1px solid #000;" scope="row">ID</th><td id="_id">'+transportationData._id+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Name</th><td>'+transportationData.companyName+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Mobile</th><td>'+transportationData.companyMobile+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Address</th><td>'+transportationData.companyAddress+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Transaction Place</th><td id="transactionPlace">'+transportationData.transactionPlace+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Source Country</th><td id="sourceCountry">'+country.content+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Reciving Port Data</th><td>'+transportationData.fromDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Shipping Port Data</th><td>'+transportationData.toDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Expected Ship Date</th><td id="expectedShipDate">'+transportationData.expectedShipDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Chamber Of Commerce Number</th><td id="chamberOfCommerceNumber">'+transportationData.carCost+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Postal Code</th><td id="postalCode">'+transportationData.transferData+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">By User</th><td id="u_id">'+user.name+'</td></tr></tbody></table>'+'<br/> Created at: '+created_at, //temp_line4
            );
            //Send Email To Hail
            sendEmail(
                'hail@madarshamel.sa', //To Email
                'Madarshamel Hail', //To Name
            'Madarshamel | New Transportation Request From '+user.name, //Message Subject
            '', //btn_link
            '', //btn_content
            '', //temp_line3
            user.name+' Created Transportation Request', //temp_line1
            'Email: '+user.email+' Phone: '+user.mobile, //temp_line2
            '<table class="table table-striped" style="margin: 0px;width: 100%;float: left;">\
            <thead><tr><th scope="col">Field</th><th scope="col">Value</th></tr></thead><tbody id="requestChangesConData">\
            <tr><th style="border:1px solid #000;" scope="row">ID</th><td id="_id">'+transportationData._id+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Name</th><td>'+transportationData.companyName+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Mobile</th><td>'+transportationData.companyMobile+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Address</th><td>'+transportationData.companyAddress+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Transaction Place</th><td id="transactionPlace">'+transportationData.transactionPlace+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Source Country</th><td id="sourceCountry">'+country.content+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Reciving Port Data</th><td>'+transportationData.fromDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Shipping Port Data</th><td>'+transportationData.toDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Expected Ship Date</th><td id="expectedShipDate">'+transportationData.expectedShipDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Chamber Of Commerce Number</th><td id="chamberOfCommerceNumber">'+transportationData.carCost+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Postal Code</th><td id="postalCode">'+transportationData.transferData+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">By User</th><td id="u_id">'+user.name+'</td></tr></tbody></table>'+'<br/> Created at: '+created_at, //temp_line4
            );
            });
            res.json({success: true,err: err,transportation: transportationData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});
router.post('/read', authJWT.verify(
    ['same-as-u-id','transportation','super-admin'], //Creds
    ['_id'], //Needed Params to auth
    'transportation' //Model Name
    ), async (req,res,next) => {
    const { _id } = req.body;
    try{
        const transportation = await Transportation.findById(req.body._id);
        const user = await Users.findById(transportation.u_id);
        //const files = await Files.find( { _id : { $in : Object.values(JSON.parse(transportation.attachedFiles)) } } );
        const name = user.name;
        //console.log('Founded Transportation Request '+transportation._id+ ' ,And It`s "FILES"');
        console.log('Founded Transportation Request '+transportation._id);
        //return res.status(200).json({ success: true, transportation: transportation, name: name, files: files});
        return res.status(200).json({ success: true, transportation: transportation, name: name});
    }catch(e){
        return res.status(404).json({ message: 'Something went wrong' ,_id: _id ,error: e });
    }
});
router.post('/readAll', authJWT.verify(['original-user','transportation','super-admin']), async (req,res,next) => {
    try {
        let transportationsData = await Transportation.find({u_id: req.userId}).limit(5);
        res.json({success: true,transportations: transportationsData});
    }catch(e) {
        return res.json({success: false, message: 'Something went wrong' ,error: e});
    }
});

router.post('/readAllRequests', authJWT.verify(['original-user','transportation','super-admin']), async (req,res,next) => {
    try {
        const currentLoggedInUser = await Users.findById(req.userId);
            const currentLoggedInUserCreds = JSON.parse(currentLoggedInUser.creds);
            
            let authCredsSum;
            let userCreds = ['transportation','super-admin'];
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
                //He is 'transportation','super-admin'
                userRequest = {};
            }
        let transportationsData = await Transportation.find(userRequest);
        console.log('Founded Transportation Requests');
        res.json({success: true,transportations: transportationsData});
    }catch(e) {
        return res.json({success: false, message: 'Something went wrong' ,error: e});
    }
});
module.exports = router;