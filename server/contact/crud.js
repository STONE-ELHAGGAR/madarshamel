const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Contact = require('./../models/contact');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');
const sendEmail = require('./../../util/sendEmail');

router.post('/create', async (req,res,next) => {
    const {name, company, email, mobile, desc} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const contacts = Contact({name, company, email, mobile, desc, created_at});
    try {
        await contacts.save(function(err,contactsData) {
            console.log('Inserted contacts '+contactsData._id);
            //Send Email To CS
            sendEmail(
                'cs@madarshamel.sa', //To Email
                'Madarshamel Customer Service', //To Name
              'Madarshamel | New Message From '+name, //Message Subject
              '', //btn_link
              '', //btn_content
              name+' Sent a new message from '+email, //temp_line1
              'Company Name: '+company+' Phone: '+mobile, //temp_line2
              'Message', //temp_line3
              desc+' <br/> Created at: '+created_at, //temp_line4
            );
            //Send to sender
            sendEmail(
                email, //To Email
                name+' - '+company, //To Name
              'Madarshamel | We Recived Your Message', //Message Subject
              '', //btn_link
              '', //btn_content
              'Welcome '+name, //temp_line1
              'We have recived your message.', //temp_line2
              'And We`ll Contact with you ASAP.', //temp_line3
              '', //temp_line4
            );
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