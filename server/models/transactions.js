const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    amount:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    details:
        {
            type: String,
            maxlength: 255
        },
    movementId:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    status:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    movementId:
        {
            type: String,
            required: true
        }
})
const Model = mongoose. model('Transactions', ModelSchema);
module.exports = Model;