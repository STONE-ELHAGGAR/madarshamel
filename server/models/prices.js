const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    name:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    company:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    email:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    mobile:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    goodsDetails:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    hts:
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
    senderAddress:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    consigneeCity:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    consigneeAddress:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    cond:
        {
            type: String,
            maxlength: 255
        },
    created_at:
        {
            type: String,
            required: true,
            maxlength: 255
        }

})
const Model = mongoose.model('Prices', ModelSchema);
module.exports = Model;