const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Chat MongoDB Table schema (models)
const Users = require('./../models/users');
const Chat = require('./../models/chat');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {message, for_u_id} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const seen = 'unseen';
    const chat = Chat({message, seen, created_at, u_id, for_u_id});

    try {
        await chat.save(function(err,messageData) {
            console.log('Inserted Message '+messageData._id);
            res.json({success: true,message: messageData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/prepareChat', authJWT.verify([]), async (req,res,next) => {
    let allUsers = [];
    try {
        const user = await Users.findById(req.userId);
        userCreds = JSON.parse(user.creds);
        if(userCreds.includes('super-admin') || userCreds.includes('live-chat')){
            //Send Him Current Chats
            allUsers = await Users.find({}, {name:1, email:1, mobile:1});
        }
        res.json({success: true,userCreds: userCreds, allUsers: allUsers});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
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
    const {for_u_id} = req.body;
    try {
        let chatsData = await Chat.find( { for_u_id: for_u_id } );
        for (var i = 0; i < chatsData.length; i++) {
            let usersData = await Users.find( { _id: chatsData[i].u_id } );
            chatsData[i] = {
                name: usersData[0].name,
                message: chatsData[i].message,
                u_id: chatsData[i].u_id,
                seen: chatsData[i].seen,
                _id: chatsData[i]._id,
                created_at: chatsData[i].created_at,
            }
        }
        res.json({success: true,chatsData: chatsData});
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