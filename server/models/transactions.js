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
        },
    byUId:
        {
            type: String,
            required: true,
            maxlength: 255
        }
})
const Model = mongoose. model('Transactions', ModelSchema);
module.exports = Model;