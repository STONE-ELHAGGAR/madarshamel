const jwt = require('jsonwebtoken');
//Users MongoDB Table schema
const Users = require('./../server/models/users');
require('dotenv').config();
const secret = process.env.API_SECRET;
const expiresIn = '24h';

exports.sign = (payload) => jwt.sign(payload, secret, {expiresIn});

exports.verify = (userCreds = [],params = [], modelName = '') => {
    return async (req,res,next) => {
        const token = req.headers['authorization'];
        try {
            const payload = jwt.verify(token, secret);
            req.userId = payload.sub;
            const currentLoggedInUser = await Users.findById(req.userId);
            const currentLoggedInUserCreds = JSON.parse(currentLoggedInUser.creds);

            //Check Creds Means Route Requested Creds
            if(userCreds.length > 0){
                let same_as_u_id, custom_clearance, super_admin, live_chat, original_user, transportation;
                let authSum = [];
                let authCredsSum;
                if(modelName){
                    //Model MongoDB Table schema
                    const Model = require('./../server/models/'+modelName);
                    let itemId = req.body[params[0]];
                    const itemData = await Model.find({_id: itemId});

                    (itemData[0].u_id == currentLoggedInUser.id) ? same_as_u_id = true : same_as_u_id = false;
                    
                }
                (currentLoggedInUserCreds.includes('custom-clearance')) ? custom_clearance = true : custom_clearance = false;
                (currentLoggedInUserCreds.includes('transportation')) ? transportation = true : transportation = false;
                (currentLoggedInUserCreds.includes('super-admin')) ? super_admin = true : super_admin = false;
                (currentLoggedInUserCreds.includes('live-chat')) ? live_chat = true : live_chat = false;
                (currentLoggedInUserCreds.includes('original-user')) ? original_user = true : original_user = false;


                (userCreds.includes('same-as-u-id')) ? authSum.push(same_as_u_id) : false ;
                (userCreds.includes('custom-clearance')) ? authSum.push(custom_clearance) : false ;
                (userCreds.includes('transportation')) ? authSum.push(transportation) : false ;
                (userCreds.includes('super-admin')) ? authSum.push(super_admin) : false ;
                (userCreds.includes('live-chat')) ? authSum.push(live_chat) : false ;
                (userCreds.includes('original-user')) ? authSum.push(original_user) : false ;
                if (authSum.find(e => e === true)) {
                    authCredsSum = true;
                }else{
                    authCredsSum = false;
                    throw new Exception();
                }
            }
            next();
        } catch(e) {
            res.status(500).json({success: false, message: 'unauthorized'});
        }
    }
}