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
    const forUser = await Users.findById(u_id);
    //Withdraw status 0
    let minimumBalance = 0;

    let transactionsData = await Transactions.find( { u_id: u_id } );
        let currentBalance = 0;
        let currentDebt = 0;
        //const user = await Users.findById(u_id);
        if(transactionsData){
            transactionsData.map((transaction) => {
                if(parseInt(transaction.status) === 1){
                    currentBalance += parseInt(transaction.amount);
                }else{
                    currentBalance -= parseInt(transaction.amount);
                }
            })
        }

    let newBalance = 0;
    if(parseInt(status) === 0){
        //Check if Withdraw => status 0
        if(forUser?.debtLimit){
            //Have Debt Limit
            minimumBalance = parseInt(forUser.debtLimit);
            newBalance = (parseInt(currentBalance)-parseInt(amount));
            console.log('New Balance will be '+newBalance)
        }else{
            //Don't Have Limit
            newBalance = (parseInt(currentBalance)-parseInt(amount));
            minimumBalance = 0;
            console.log('New Balance will be '+newBalance)
        }
    }
    const user = await Users.findById(req.userId);
    const byUId = user.id;
    const transactions = Transactions({amount, details, movementId, status, created_at, u_id, byUId});

    try {
        if(parseInt(status) === 0 && (newBalance < (minimumBalance*-1))){
            //Should Throw an Error here
            throw new Error('This User doesn`t have enough BALANCE.');
        }
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

router.post('/readAll', authJWT.verify([]), async (req,res,next) => {
    const u_id = req.userId;
    try {
        const userData = await Users.find({_id: u_id});
        let transactionsData = await Transactions.find({ $or: [ { u_id: u_id }, { byUId: u_id } ] } );
        let transactionsDataArray = [];
        for(el in transactionsData){
            let u_idData = '';
            let byUIdData = '';
            if(transactionsData[el].u_id == userData[0]._id){
                u_idData = 'For Me';
            }else{                
                let truserData = await Users.find({_id: transactionsData[el].u_id});;
                u_idData = 'For '+truserData[0].name;
            }
            if(transactionsData[el].byUId == userData[0]._id){
                byUIdData = 'By Me';
            }else{                
                let byuserData = await Users.find({_id: transactionsData[el].byUId});;
                u_idData = 'By '+byuserData[0].name;
            }
            transactionsDataArray.push({
                _id: transactionsData[el]._id,
                amount: transactionsData[el].amount,
                details: transactionsData[el].details,
                status: transactionsData[el].status,
                movementId: transactionsData[el].movementId,
                created_at: transactionsData[el].created_at,
                u_id: u_idData,
                byUId: byUIdData
            });
        }
        res.json({success: true,transactions: transactionsDataArray});
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
        let currentDebt = 0;
        let debtLimit = '0';
        const forUser = await Users.findById(u_id);
        if(transactionsData){
            transactionsData.map((transaction) => {
                if(parseInt(transaction.status) === 1){
                    currentBalance += parseInt(transaction.amount);
                }else{
                    currentBalance -= parseInt(transaction.amount);
                }
            })
            if(currentBalance < 0){
                currentDebt = currentBalance*-1;
                currentBalance = 0;
            }
            if(forUser?.debtLimit){
                //Have Debt Limit
                debtLimit = forUser.debtLimit;
            }else{
                debtLimit = '0';
            }
        }
        res.json({success: true,currentBalance: currentBalance, currentDebt: currentDebt, debtLimit: debtLimit});
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