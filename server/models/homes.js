const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    bannerDesc:
        {
            type: String
        },
    img1:
        {
            type: String
        },
    img2:
        {
            type: String
        },
    img3:
        {
            type: String
        },
    img4:
        {
            type: String
        },
    img5:
        {
            type: String
        },
    img6:
        {
            type: String
        },
    tabSec1:
        {
            type: String
        },
    tabSec2:
        {
            type: String
        },
    tabSec3:
        {
            type: String
        },
    _1stname:
        {
            type: String
        },
    _1stcompany:
        {
            type: String
        },
    _1stquote:
        {
            type: String
        },
    _2ndname:
        {
            type: String
        },
    _2ndcompany:
        {
            type: String
        },
    _2ndquote:
        {
            type: String
        },
    _3rdname:
        {
            type: String
        },
    _3rdcompany:
        {
            type: String
        },
    _3rdquote:
        {
            type: String
        },
    _4thname:
        {
            type: String
        },
    _4thcompany:
        {
            type: String
        },
    _4thquote:
        {
            type: String
        },
    fb: {
            type: String
    },
    twitter: {
        type: String
    },
    insta: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    }


})
const Model = mongoose.model('Homes', ModelSchema);
module.exports = Model;