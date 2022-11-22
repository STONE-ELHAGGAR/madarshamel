const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Settings = require('./../models/settings');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {content, field, belongsTo} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const settings = Settings({content, field, belongsTo, created_at, u_id});

    try {
        await settings.save(function(err,settingsData) {
            console.log('Inserted Setting '+settingsData._id);
            res.json({success: true,setting: settingsData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/read', authJWT.verify([]), async (req,res,next) => {
    const {belongsTo} = req.body;
    try {
        let settingsData = await Settings.find( { belongsTo: belongsTo } );
        res.json({success: true,settings: settingsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readByField', authJWT.verify([]), async (req,res,next) => {
    const {field} = req.body;
    try {
        let settingsData = await Settings.find( { field: field } );
        res.json({success: true,settings: settingsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readById', authJWT.verify([]), async (req,res,next) => {
    const {id} = req.body;
    try {
        let settingsData = await Settings.find( { _id: id } );
        res.json({success: true,settings: settingsData});
    }catch(e) {
        return res.json({success: false, message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;