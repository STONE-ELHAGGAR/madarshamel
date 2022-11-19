const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    name:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    address:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    belongsTo:
        {
            type: String,
            required: true,
            maxlength: 255
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
const Model = mongoose. model('Branches', ModelSchema);
module.exports = Model;