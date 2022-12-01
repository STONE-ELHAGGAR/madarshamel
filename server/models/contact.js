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
    desc:
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
        }

})
const Model = mongoose.model('Contact', ModelSchema);
module.exports = Model;