const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Prices = require('./../models/prices');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', async (req,res,next) => {
    const {name, company, email, mobile, goodsDetails, hts, sourceCountry, senderAddress, consigneeCity, consigneeAddress, cond} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const prices = Prices({name, company, email, mobile, goodsDetails, hts, sourceCountry, senderAddress, consigneeCity, cond, consigneeAddress, created_at});
    try {
        await prices.save(function(err,pricesData) {
            console.log('Inserted prices '+pricesData._id);
            res.json({success: true,prices: pricesData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/read', authJWT.verify(['live-chat','transportation','custom_clearance','super-admin']), async (req,res,next) => {
    try {
        let pricesData = await Prices.find({});
        res.json({success: true,prices: pricesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readByField', authJWT.verify([]), async (req,res,next) => {
    const {belongsTo} = req.body;
    try {
        let branchesData = await Branches.find( { belongsTo: belongsTo } );
        res.json({success: true,branches: branchesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readById', authJWT.verify([]), async (req,res,next) => {
    const {id} = req.body;
    try {
        let branchesData = await Branches.find( { _id: id } );
        res.json({success: true,branches: branchesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;