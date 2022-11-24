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
        let companiesData = await Companies.find({u_id: req.userId});
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