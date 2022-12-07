const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    title:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    description:
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
const Model = mongoose.model('Pages', ModelSchema);
module.exports = Model;