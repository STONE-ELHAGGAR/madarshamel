const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Drivers = require('./../models/drivers');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {name, mobile, truck, nid} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const drivers = Drivers({name, mobile, truck, nid, created_at, u_id});

    try {
        await drivers.save(function(err,driversData) {
            console.log('Inserted Driver '+driversData._id);
            res.json({success: true,drivers: driversData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/read', authJWT.verify([]), async (req,res,next) => {
    try {
        let driversData = await Drivers.find();
        res.json({success: true,drivers: driversData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readById', authJWT.verify([]), async (req,res,next) => {
    const {id} = req.body;
    try {
        let driversData = await Drivers.find( { _id: id } );
        res.json({success: true,drivers: driversData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readByMobile', authJWT.verify([]), async (req,res,next) => {
    const {mobile} = req.body;
    try {
        let driversData = await Drivers.find( { mobile: mobile } );
        res.json({success: true,drivers: driversData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;