const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    content:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    type: //Contain (MSG, File, Edit ... etc)
        {
            type: String,
            required: true,
            maxlength: 255
        },
    requestType: //Contain (custom-clearance, transportation)
        {
            type: String,
            required: true,
            maxlength: 255
        },
    requestId:
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
const Model = mongoose. model('Movements', ModelSchema);
module.exports = Model;