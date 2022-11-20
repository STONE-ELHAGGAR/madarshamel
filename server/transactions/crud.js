const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Transactions MongoDB Table schema (models)
const Users = require('./../models/users');
const Transactions = require('./../models/transactions');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {amount, details, movementId, status, u_id} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const byUId = user.id;
    const transactions = Transactions({amount, details, movementId, status, created_at, u_id, byUId});

    try {
        await transactions.save(function(err,transactionsData) {
            console.log('Inserted transaction '+transactionsData._id);
            res.json({success: true,transaction: transactionsData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/read', authJWT.verify([]), async (req,res,next) => {
    const {movementId} = req.body;
    try {
        let transactionsData = await Transactions.find( { movementId: movementId } );
        res.json({success: true,transactions: transactionsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readByUID', authJWT.verify([]), async (req,res,next) => {
    const {u_id} = req.body;
    try {
        let transactionsData = await Transactions.find( { u_id: u_id } );
        res.json({success: true,transactions: transactionsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readBalance', authJWT.verify([]), async (req,res,next) => {
    const {u_id} = req.body;
    try {
        let transactionsData = await Transactions.find( { u_id: u_id } );
        let currentBalance = 0;
        if(transactionsData){
            transactionsData.map((transaction) => {
                if(parseInt(transaction.status) === 1){
                    currentBalance += parseInt(transaction.amount);
                }else{
                    currentBalance -= parseInt(transaction.amount);
                }
            })
        }
        res.json({success: true,currentBalance: currentBalance});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readById', authJWT.verify([]), async (req,res,next) => {
    const {id} = req.body;
    try {
        let transactionsData = await Transactions.find( { _id: id } );
        res.json({success: true,transactions: transactionsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;