const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Custom_clearance MongoDB Table schema (models)
const Custom_clearance = require('./../models/custom_clearance');
const Files = require('./../models/files');
const Users = require('./../models/users');

//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
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

router.post('/read', authJWT.verify([]), async (req,res,next) => {
    const { _id } = req.body;
    try{
        const custom_clearance = await Custom_clearance.findById(req.body._id);
        const user = await Users.findById(custom_clearance.u_id);
        const files = await Files.find( { _id : { $in : Object.values(JSON.parse(custom_clearance.attachedFiles)) } } );
        const name = user.name;
        console.log('Founded Custom Clearance Request '+custom_clearance._id+ ' ,And It`s "FILES"');
        return res.status(200).json({ success: true, custom_clearance: custom_clearance, name: name, files: files});
    }catch(e){
        return res.status(404).json({ message: 'Something went wrong' ,_id: _id ,error: e });
    }
});

module.exports = router;