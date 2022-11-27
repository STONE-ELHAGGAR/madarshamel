const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    message:
        {
            type: String,
            required: true
        },
    seen:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    for_u_id:
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
        }
})
const Model = mongoose. model('Chat', ModelSchema);
module.exports = Model;