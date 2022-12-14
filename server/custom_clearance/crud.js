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
const sendEmail = require('./../../util/sendEmail');
const getNumId = require('./../../util/getNumId');

//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify(['original-user','custom-clearance','super-admin']), async (req,res,next) => {
    const {companyName, companyAddress, companyMobile, transactionPlace, shippingPort, recivingPort, sourceCountry, expectedShipDate, postalCode, fax, commercialRegistrationNo, commercialRegistrationDate, commercialRegistrationCity, chamberOfCommerceNumber, attachedFiles} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const custom_clearance = Custom_clearance({companyName, companyAddress, companyMobile, transactionPlace, shippingPort, recivingPort, sourceCountry, expectedShipDate, postalCode, fax, commercialRegistrationNo, commercialRegistrationDate, commercialRegistrationCity, chamberOfCommerceNumber, attachedFiles, created_at, u_id});
    
    try {
        await custom_clearance.save(function(err,custom_clearanceData) {
            console.log('Inserted Custom Clearance Request '+custom_clearanceData._id);
            getNumId(custom_clearanceData._id,'custom_clearance').then((numId) => {
            //Send Email To CS
            sendEmail(
                'cs@madarshamel.sa', //To Email
                'Madarshamel Customer Service', //To Name
            'Madarshamel | New Custom Clearance Request From '+user.name, //Message Subject
            '', //btn_link
            '', //btn_content
            '', //temp_line3
            user.name+' Created Custom Clearance Request', //temp_line1
            'Email: '+user.email+' Phone: '+user.mobile, //temp_line2
            '<table class="table table-striped" style="margin: 0px;width: 100%;float: left;">\
            <thead><tr><th scope="col">Field</th><th scope="col">Value</th></tr></thead><tbody id="requestChangesConData">\
            <tr><th style="border:1px solid #000;" scope="row">ID</th><td id="_id">'+numId+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Name</th><td>'+custom_clearanceData.companyName+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Mobile</th><td>'+custom_clearanceData.companyMobile+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Address</th><td>'+custom_clearanceData.companyAddress+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Transaction Place</th><td id="transactionPlace">'+custom_clearanceData.transactionPlace+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Source Country</th><td id="sourceCountry">'+custom_clearanceData.sourceCountry+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Reciving Port Data</th><td>'+custom_clearanceData.recivingPort+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Shipping Port Data</th><td>'+custom_clearanceData.shippingPort+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Expected Ship Date</th><td id="expectedShipDate">'+custom_clearanceData.expectedShipDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Chamber Of Commerce Number</th><td id="chamberOfCommerceNumber">'+custom_clearanceData.chamberOfCommerceNumber+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Postal Code</th><td id="postalCode">'+custom_clearanceData.postalCode+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Fax</th><td id="fax">'+custom_clearanceData.fax+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Commercial Registration No</th><td id="commercialRegistrationNo">'+custom_clearanceData.commercialRegistrationNo+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Commercial Registration Date</th><td id="commercialRegistrationDate">'+custom_clearanceData.commercialRegistrationDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Commercial Registration City</th><td id="commercialRegistrationCity">'+custom_clearanceData.commercialRegistrationCity+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">By User</th><td id="u_id">'+user.name+'</td></tr></tbody></table>'+'<br/> Created at: '+created_at, //temp_line4
            );
            //Send Email To Ali
            sendEmail(
                'ali@madarshamel.sa', //To Email
                'Madarshamel Ali', //To Name
            'Madarshamel | New Custom Clearance Request From '+user.name, //Message Subject
            '', //btn_link
            '', //btn_content
            '', //temp_line3
            user.name+' Created Custom Clearance Request', //temp_line1
            'Email: '+user.email+' Phone: '+user.mobile, //temp_line2
            '<table class="table table-striped" style="margin: 0px;width: 100%;float: left;">\
            <thead><tr><th scope="col">Field</th><th scope="col">Value</th></tr></thead><tbody id="requestChangesConData">\
            <tr><th style="border:1px solid #000;" scope="row">ID</th><td id="_id">'+custom_clearanceData._id+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Name</th><td>'+custom_clearanceData.companyName+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Mobile</th><td>'+custom_clearanceData.companyMobile+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Address</th><td>'+custom_clearanceData.companyAddress+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Transaction Place</th><td id="transactionPlace">'+custom_clearanceData.transactionPlace+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Source Country</th><td id="sourceCountry">'+custom_clearanceData.sourceCountry+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Reciving Port Data</th><td>'+custom_clearanceData.recivingPort+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Shipping Port Data</th><td>'+custom_clearanceData.shippingPort+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Expected Ship Date</th><td id="expectedShipDate">'+custom_clearanceData.expectedShipDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Chamber Of Commerce Number</th><td id="chamberOfCommerceNumber">'+custom_clearanceData.chamberOfCommerceNumber+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Postal Code</th><td id="postalCode">'+custom_clearanceData.postalCode+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Fax</th><td id="fax">'+custom_clearanceData.fax+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Commercial Registration No</th><td id="commercialRegistrationNo">'+custom_clearanceData.commercialRegistrationNo+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Commercial Registration Date</th><td id="commercialRegistrationDate">'+custom_clearanceData.commercialRegistrationDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Commercial Registration City</th><td id="commercialRegistrationCity">'+custom_clearanceData.commercialRegistrationCity+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">By User</th><td id="u_id">'+user.name+'</td></tr></tbody></table>'+'<br/> Created at: '+created_at, //temp_line4
            );
            //Send Email To Hail
            sendEmail(
                'hail@madarshamel.sa', //To Email
                'Madarshamel Hail', //To Name
            'Madarshamel | New Custom Clearance Request From '+user.name, //Message Subject
            '', //btn_link
            '', //btn_content
            '', //temp_line3
            user.name+' Created Custom Clearance Request', //temp_line1
            'Email: '+user.email+' Phone: '+user.mobile, //temp_line2
            '<table class="table table-striped" style="margin: 0px;width: 100%;float: left;">\
            <thead><tr><th scope="col">Field</th><th scope="col">Value</th></tr></thead><tbody id="requestChangesConData">\
            <tr><th style="border:1px solid #000;" scope="row">ID</th><td id="_id">'+custom_clearanceData._id+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Name</th><td>'+custom_clearanceData.companyName+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Mobile</th><td>'+custom_clearanceData.companyMobile+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Company Address</th><td>'+custom_clearanceData.companyAddress+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Transaction Place</th><td id="transactionPlace">'+custom_clearanceData.transactionPlace+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Source Country</th><td id="sourceCountry">'+custom_clearanceData.sourceCountry+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Reciving Port Data</th><td>'+custom_clearanceData.recivingPort+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Shipping Port Data</th><td>'+custom_clearanceData.shippingPort+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Expected Ship Date</th><td id="expectedShipDate">'+custom_clearanceData.expectedShipDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Chamber Of Commerce Number</th><td id="chamberOfCommerceNumber">'+custom_clearanceData.chamberOfCommerceNumber+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Postal Code</th><td id="postalCode">'+custom_clearanceData.postalCode+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Fax</th><td id="fax">'+custom_clearanceData.fax+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Commercial Registration No</th><td id="commercialRegistrationNo">'+custom_clearanceData.commercialRegistrationNo+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Commercial Registration Date</th><td id="commercialRegistrationDate">'+custom_clearanceData.commercialRegistrationDate+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">Commercial Registration City</th><td id="commercialRegistrationCity">'+custom_clearanceData.commercialRegistrationCity+'</td></tr>\
            <tr><th style="border:1px solid #000;" scope="row">By User</th><td id="u_id">'+user.name+'</td></tr></tbody></table>'+'<br/> Created at: '+created_at, //temp_line4
            );
            })
            
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
                //let transactionPlace = await Settings.find( { _id: custom_clearances[custom_clearance].transactionPlace } );
                //let sourceCountry = await Settings.find( { _id: custom_clearances[custom_clearance].sourceCountry } );
                
                newcustom_clearance.push({
                    _id: custom_clearances[custom_clearance]._id,
                    id: countGTrecords,
                    companyName: custom_clearances[custom_clearance].companyName,
                    companyMobile: custom_clearances[custom_clearance].companyMobile,
                    companyAddress: custom_clearances[custom_clearance].companyAddress,
                    chamberOfCommerceNumber: custom_clearances[custom_clearance].chamberOfCommerceNumber,
                    postalCode: custom_clearances[custom_clearance].postalCode,
                    fax: custom_clearances[custom_clearance].fax,
                    commercialRegistrationNo: custom_clearances[custom_clearance].commercialRegistrationNo,
                    commercialRegistrationDate: custom_clearances[custom_clearance].commercialRegistrationDate,
                    commercialRegistrationCity: custom_clearances[custom_clearance].commercialRegistrationCity,
                    transactionPlace: custom_clearances[custom_clearance].transactionPlace,
                    shippingPort: custom_clearances[custom_clearance].shippingPort,
                    recivingPort: custom_clearances[custom_clearance].recivingPort,
                    sourceCountry: custom_clearances[custom_clearance].sourceCountry,
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