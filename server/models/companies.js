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
const Model = mongoose. model('Companies', ModelSchema);
module.exports = Model;