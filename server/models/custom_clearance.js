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
    shippingPort:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    recivingPort:
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
    expectedShipDate:
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
const Model = mongoose. model('Custom_clearance', ModelSchema);
module.exports = Model;