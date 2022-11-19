const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Movements = require('./../models/movements');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {content, type, requestType, requestId} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const movements = Movements({content, type, requestType, requestId, created_at, u_id});

    try {
        await movements.save(function(err,movementData) {
            console.log('Inserted Movement '+movementData._id+' Type '+movementData.type);
            res.json({success: true,movement: movementData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});
router.post('/readById', authJWT.verify([]), async (req,res,next) => {
    const {id} = req.body;
    try {
        let movementsData = await Movements.find( { _id: id } );
        res.json({success: true,movements: movementsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;