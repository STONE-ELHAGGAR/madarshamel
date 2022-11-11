const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');
//Users MongoDB Table schema (models)
const Users = require('./../models/users');

//Require express-fileupload to upload files
const fileupload = require('express-fileupload');
//Require path to deal with files
const path = require('path');

router.use(fileupload({
    createParentPath: true
}));

router.post('/upload', authJWT.verify([]), async (req, res, next) => {
    if(req.files){
        let file = req.files.file;
        console.log('Uploaded File Size '+file.size);
        const user = await Users.findById(req.userId);
        const u_id = user.id;
        let file_name = new Date().getTime() +'_' + u_id + '_' + file.name.toLowerCase();
        let pathFile = path.join(__dirname, '../../uploads', file_name);
        let fileExt = file_name.substring(file_name.lastIndexOf('.')+1, file_name.length) || file_name;
        let lowerExt = fileExt.toLowerCase();
        const max_size = 3;
        const extCondition = (lowerExt != 'png' && lowerExt != 'jpg' && lowerExt != 'jpeg' && lowerExt != 'pdf');
        const sizeCondition = (file.size > (1024*1024*max_size));

        if(extCondition || sizeCondition) {
            const error = [];

            //Create Errors
            (extCondition) ? error.push('File Not Allowed') : false ;
            (sizeCondition) ? error.push('Reached maximum size '+max_size+' MB') : false ;

            res.status(500).json({success: false, error: error});
        }else{
            await file.mv(pathFile, (err) => {
                if(err){
                    res.status(500).json({success: false, error: err});
                }else{
                    res.status(200).json({success: true, filename: file_name});
                }
            });
        }
    }
});

module.exports = router;