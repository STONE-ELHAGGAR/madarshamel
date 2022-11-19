const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Files = require('./../models/files');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {mainPolicy, quantity, type, files, weight, weightType, containerSize, containerNumber, containerTemp, details} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const file = Files({mainPolicy, quantity, type, weight, weightType, containerSize, containerNumber, containerTemp, details, files, created_at, u_id});

    try {
        await file.save(function(err,fileData) {
            console.log('Inserted Attached File '+fileData._id);
            res.json({success: true,file: fileData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;