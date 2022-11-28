const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Pages = require('./../models/pages');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify(['transportation','custom_clearance','super-admin']), async (req,res,next) => {
    const {title, description} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const pages = Pages({title, description, created_at, u_id});
    try {
        await pages.save(function(err,pagesData) {
            console.log('Inserted pages '+pagesData._id);
            res.json({success: true,pages: pagesData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});


router.post('/readById', async (req,res,next) => {
    const {id} = req.body;
    try {
        let pagesData = await Pages.find( { _id: id } );
        res.json({success: true,pages: pagesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/read', async (req,res,next) => {
    try { 
        let pagesData = await Pages.find({});
        res.json({success: true,pages: pagesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;