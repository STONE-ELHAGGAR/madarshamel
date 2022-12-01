const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Contact = require('./../models/contact');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', async (req,res,next) => {
    const {name, company, email, mobile, desc} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const contacts = Contact({name, company, email, mobile, desc, created_at});
    try {
        await contacts.save(function(err,contactsData) {
            console.log('Inserted contacts '+contactsData._id);
            res.json({success: true,contacts: contactsData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});


router.post('/readById', async (req,res,next) => {
    const {id} = req.body;
    try {
        let contactsData = await Contact.find( { _id: id } );
        res.json({success: true,contacts: contactsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/read', async (req,res,next) => {
    try { 
        let contactsData = await Contact.find({});
        res.json({success: true,contacts: contactsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;