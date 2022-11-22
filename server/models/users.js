const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    mobile:
        {
            type: String,
            required: true,
            maxlength: 50
        },
    name:
        {
            type: String,
            required: true,
            maxlength: 50
        },
    email:
        {
            type: String,
            required: true,
            unique: true
        },
    creds:
        {
            type: String,
            required: true
        },
    created_at:
        {
            type: String,
            required: true
        },
    ip:
        {
            type: String,
            required: true,
            maxlength: 50
        },
    password:
        {
            type: String,
            required: true
        },
    debtLimit:
        {
            type: String
        },
    timeStamp:
        {
            type: String
        }
})
const Model = mongoose. model('Users', ModelSchema);
module.exports = Model;