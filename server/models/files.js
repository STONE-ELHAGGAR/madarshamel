const mongoose = require( "mongoose");
const ModelSchema = new mongoose. Schema ({
    mainPolicy:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    quantity:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    type:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    weight:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    weightType:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    containerSize:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    containerTemp:
        {
            type: String,
            required: true,
            maxlength: 255
        },
    details:
        {
            type: String,
            required: true
        },
    u_id:
        {
            type: String,
            required: true
        },
    files:
        {
            type: String
        }
        
})
const Model = mongoose. model('Files', ModelSchema);
module.exports = Model;