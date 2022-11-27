const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//MongoDB Table schema (models)
const Users = require('./../models/users');
const Settings = require('./../models/settings');
const Transactions = require('./../models/transactions');
const Transportation = require('./../models/transportation');
const Custom_clearance = require('./../models/custom_clearance');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {content, field, belongsTo} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const settings = Settings({content, field, belongsTo, created_at, u_id});

    try {
        await settings.save(function(err,settingsData) {
            console.log('Inserted Setting '+settingsData._id);
            res.json({success: true,setting: settingsData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/adminDashboard', authJWT.verify(['original-user','custom-clearance','transportation','super-admin']), async (req,res,next) => {
    const currentDate = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"}).split(', ');
    const loggedInUser = await Users.find({_id: req.userId});
    let custom_clearance, super_admin, original_user, transportation;
    let allTransportationCond = {};
    let allTransactionCond = {};
    let allCustomClearanceCond = {};
    let currentLoggedInUserCreds = JSON.parse(loggedInUser[0].creds);

    (currentLoggedInUserCreds.includes('custom-clearance')) ? custom_clearance = true : custom_clearance = false;
    (currentLoggedInUserCreds.includes('transportation')) ? transportation = true : transportation = false;
    (currentLoggedInUserCreds.includes('super-admin')) ? super_admin = true : super_admin = false;
    (currentLoggedInUserCreds.includes('original-user')) ? original_user = true : original_user = false;

    if(super_admin){
        //He is an admin
        allTransportationCond = {};
        allCustomClearanceCond = {};
        allTransactionCond = {};
    }else if(custom_clearance && transportation){
        //He can custom_clearance
        allTransportationCond = {}
        allCustomClearanceCond = {}
        allTransactionCond = {};
    }else if(custom_clearance){
        //He can custom_clearance
        allTransportationCond = {u_id: loggedInUser[0]._id}
        allCustomClearanceCond = {}
        allTransactionCond = {};
    }else if(transportation){
        //He can transportation
        allTransportationCond = {};
        allTransactionCond = {};
        allCustomClearanceCond = {u_id: loggedInUser[0]._id};
    }else if(original_user){
        //He can original_user
        allTransportationCond = {u_id: loggedInUser[0]._id}
        allCustomClearanceCond = {u_id: loggedInUser[0]._id}
        allTransactionCond = {u_id: loggedInUser[0]._id};
    }

    let todayMoney = 0;
    let todayUsers = 0;
    let transactionsData = [];
    let allTransactionsData = [];
    let usersData = 0;
    let yesterdayUsersData = 0;
    let allUsersData = 0;
    let currentDayDepositBalance = 0;
    let allDepositBalance = 0;
    let currentDayWithdrawBalance = 0;
    let allWithdrawBalance = 0;
    let customClearanceData = 0;
    let customClearanceDataArr = [];
    let customClearanceDated = 0;
    let transportationData = 0;
    let transportationDataArr = [];
    let transportationDataDated = 0;
    let yesterday = new Date(Date.now() - 1 * 864e5 - new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4).toISOString().split('T')[0].split('-');
    let yesterdayDate = yesterday[1]+'/'+yesterday[2]+'/'+yesterday[0];
        //Today Transactions
        try{
            transactionsData = await Transactions.find({
                $and:[
                    allTransactionCond,
                    { $text: { $search: `"${currentDate[0]}"` } },
                    { score: { $meta: "textScore" } }
                ]
            });
            transactionsData.map((transaction) => {
                if(parseInt(transaction.status) === 1){
                    currentDayDepositBalance += parseInt(transaction.amount);
                }else{
                    currentDayWithdrawBalance += parseInt(transaction.amount);
                }
            })
        }catch(e){
            transactionsData = [];
        }
        //All Transactions
        try{
            allTransactionsData = await Transactions.find(allTransactionCond);
            allTransactionsData.map((transaction) => {
                if(parseInt(transaction.status) === 1){
                    allDepositBalance += parseInt(transaction.amount);
                }else{
                    allWithdrawBalance += parseInt(transaction.amount);
                }
            })
        }catch(e){
            allTransactionsData = [];
        }
        //Today Users
        try{
            if(super_admin || custom_clearance || transportation){
                usersData = await Users.find({
                    $and:[
                        { $text: { $search: `"${currentDate[0]}"` } },
                        { score: { $meta: "textScore" } }
                    ]
                }).count();
            }else{
                usersData = 0;
            }
        }catch(e){
            usersData = 0;
        }
        //Yesterday Users
        try{
            if(super_admin || custom_clearance || transportation){
            yesterdayUsersData = await Users.find({
                $and:[
                    { $text: { $search: `"${yesterdayDate}"` } },
                    { score: { $meta: "textScore" } }
                ]
            }).count();
            }else{
                yesterdayUsersData = 0;
            }
        }catch(e){
            yesterdayUsersData = 0;
        }
        //All Users
        try{
            if(super_admin || custom_clearance || transportation){
                allUsersData = await Users.find().count();
            }else{
                allUsersData = 0;
            }
        }catch(e){
            allUsersData = 0;
        }
        
        //All Custom Clearance
        try{
            customClearanceData = await Custom_clearance.find(allCustomClearanceCond).count();
        }catch(e){
            customClearanceData = 0;
        }
        //All Transportation
        try{
            transportationData = await Transportation.find(allTransportationCond).count();
        }catch(e){
            transportationData = 0;
        }

        const previousDay = (minus) => {
            let dayNum = new Date(Date.now() - minus * 864e5 - new Date(Date.now() - minus * 864e5).getTimezoneOffset() * 6e4).toISOString().split('T')[0].split('-');
            return  dayNum[1]+'/'+dayNum[2]+'/'+dayNum[0];
        }
        for(let i = 1; i <= 7; i++)
        {
            //i Custom Clearance
            try{
                customClearanceDataDated = await Custom_clearance.find({
                    $and:[
                        allCustomClearanceCond,
                        { $text: { $search: `"${previousDay(i)}"` } },
                        { score: { $meta: "textScore" } }
                    ]
                }).count();
            }catch(e){
                customClearanceDataDated = 0;
            }
            //i Transportation
            try{
                transportationDataDated = await Transportation.find({
                    $and:[
                        allTransportationCond,
                        { $text: { $search: `"${previousDay(i)}"` } },
                        { score: { $meta: "textScore" } }
                    ]
                }).count();
            }catch(e){
                transportationDataDated = 0;
            }
            customClearanceDataArr.push(customClearanceDataDated)
            transportationDataArr.push(transportationDataDated)
        }

        res.json({success: true, data: {
                currentDayDepositBalance: currentDayDepositBalance,
                currentDayWithdrawBalance: currentDayWithdrawBalance,
                allDepositBalance: allDepositBalance,
                allWithdrawBalance: allWithdrawBalance,
                allUsersData: allUsersData,
                yesterdayUsersData: yesterdayUsersData,
                todayUsersData: usersData,
                customClearanceData: customClearanceData,
                transportationData: transportationData,
                customClearanceDataArr: customClearanceDataArr.reverse(),
                transportationDataArr: transportationDataArr.reverse(),
                super_admin: super_admin
            }
        });
});

router.post('/read', authJWT.verify([]), async (req,res,next) => {
    const {belongsTo} = req.body;
    try {
        let settingsData = await Settings.find( { belongsTo: belongsTo } );
        res.json({success: true,settings: settingsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readByField', authJWT.verify([]), async (req,res,next) => {
    const {field} = req.body;
    try {
        let settingsData = await Settings.find( { field: field } );
        res.json({success: true,settings: settingsData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/readById', authJWT.verify([]), async (req,res,next) => {
    const {id} = req.body;
    try {
        let settingsData = await Settings.find( { _id: id } );
        res.json({success: true,settings: settingsData});
    }catch(e) {
        return res.json({success: false, message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;