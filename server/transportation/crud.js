const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Custom_clearance MongoDB Table schema (models)
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

module.exports = router;