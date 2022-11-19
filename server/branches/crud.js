const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Branches = require('./../models/branches');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {name, address, belongsTo} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const branches = Branches({name, address, belongsTo, created_at, u_id});

    try {
        await branches.save(function(err,branchesData) {
            console.log('Inserted branch '+branchesData._id);
            res.json({success: true,branch: branchesData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/read', authJWT.verify([]), async (req,res,next) => {
    const {belongsTo} = req.body;
    try {
        let branchesData = await Branches.find( { belongsTo: belongsTo } );
        res.json({success: true,branches: branchesData});
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