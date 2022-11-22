const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, transportation MongoDB Table schema (models)
const Transportation = require('./../models/transportation');
const Users = require('./../models/users');

//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {companyName, branch, transactionPlace, fromDate, toDate, sourceCountry, drivers, expectedShipDate, carCost, transferData, attachedFiles} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const transportation = Transportation({companyName, branch, transactionPlace, fromDate, toDate, sourceCountry, drivers, expectedShipDate, carCost, transferData, created_at, u_id, attachedFiles});

    try {
        await transportation.save(function(err,transportationData) {
            console.log('Inserted Transportation Request '+transportationData._id);
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
        //console.log('Founded Custom Clearance Request '+transportation._id+ ' ,And It`s "FILES"');
        console.log('Founded Transportation Request '+transportation._id);
        //return res.status(200).json({ success: true, transportation: transportation, name: name, files: files});
        return res.status(200).json({ success: true, transportation: transportation, name: name});
    }catch(e){
        return res.status(404).json({ message: 'Something went wrong' ,_id: _id ,error: e });
    }
});
router.post('/readAll', authJWT.verify([]), async (req,res,next) => {
    try {
        let transportationsData = await Transportation.find().limit(5);
        res.json({success: true,transportations: transportationsData});
    }catch(e) {
        return res.json({success: false, message: 'Something went wrong' ,error: e});
    }
});

router.post('/readAllRequests', authJWT.verify([]), async (req,res,next) => {
    try {
        let transportationsData = await Transportation.find();
        res.json({success: true,transportations: transportationsData});
    }catch(e) {
        return res.json({success: false, message: 'Something went wrong' ,error: e});
    }
});
module.exports = router;