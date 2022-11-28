const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    companyName:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    companyMobile:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    companyAddress:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    transactionPlace:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    fromDate:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    toDate:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    sourceCountry:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    drivers:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    expectedShipDate:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    carCost:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    transferData:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    attachedFiles:
        {
            type: String
        },
    created_at:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    u_id:
        {
            type: String,
            required: true,
            maxlength: 255
        }
        
})
const Model = mongoose. model('Transportation', ModelSchema);
module.exports = Model;