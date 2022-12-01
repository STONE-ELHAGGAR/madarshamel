const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Homes = require('./../models/homes');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');

router.post('/read', async (req,res,next) => {
    try {
        let homesData = await Homes.find({});
        res.json({success: true,homes: homesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

router.post('/update', authJWT.verify(['super-admin']), async (req,res,next) => {
    const {
        bannerDesc,
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        tabSec1,
        tabSec2,
        tabSec3,
        _1stname,
        _1stcompany,
        _1stquote,
        _2ndname,
        _2ndcompany,
        _2ndquote,
        _3rdname,
        _3rdcompany,
        _3rdquote,
        _4thname,
        _4thcompany,
        _4thquote,
        fb,
        twitter,
        insta,
        address,
        phone,
        email
    } = req.body;
    try {
        let homesData = await Homes.updateMany(
            { },
            [
               { $set: {
                bannerDesc,
                img1,
                img2,
                img3,
                img4,
                img5,
                img6,
                tabSec1,
                tabSec2,
                tabSec3,
                _1stname,
                _1stcompany,
                _1stquote,
                _2ndname,
                _2ndcompany,
                _2ndquote,
                _3rdname,
                _3rdcompany,
                _3rdquote,
                _4thname,
                _4thcompany,
                _4thquote,
                fb,
                twitter,
                insta,
                address,
                phone,
                email
               } }
            ]
         );
        res.json({success: true,homes: homesData});
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' ,error: e});
    }
});

module.exports = router;