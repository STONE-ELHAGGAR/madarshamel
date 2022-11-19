const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    name:
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
    truck:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    nid:
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
const Model = mongoose. model('Drivers', ModelSchema);
module.exports = Model;