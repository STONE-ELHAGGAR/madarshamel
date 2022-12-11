const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//Users, Files MongoDB Table schema (models)
const Users = require('./../models/users');
const Files = require('./../models/files');
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');
const fs = require('fs');
const path = require('path');
const fs_Extra = require('fs-extra');

router.post('/create', authJWT.verify([]), async (req,res,next) => {
    const {mainPolicy, quantity, type, files, weight, weightType, containerSize, containerNumber, containerTemp, details} = req.body;
    const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
    const user = await Users.findById(req.userId);
    const u_id = user.id;
    const file = Files({mainPolicy, quantity, type, weight, weightType, containerSize, containerNumber, containerTemp, details, files, created_at, u_id});

    try {
        await file.save(function(err,fileData) {
            console.log('Inserted Attached File '+fileData._id);
            res.json({success: true,file: fileData});
        });
    }catch(e) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/readLangs', authJWT.verify([]), async (req,res,next) => {
    let folderDir = path.join(__dirname, '../../locales/');
    fs.readdir(folderDir, {encoding: 'utf-8'}, function(err,data){
        res.json({success: true, langs: data});
    });
});

router.post('/readLangFiles', authJWT.verify([]), async (req,res,next) => {
    const {lang} = req.body;
    let folderDir = path.join(__dirname, '../../locales/'+lang);
    fs.readdir(folderDir, {encoding: 'utf-8'}, function(err,data){
        res.json({success: true, langFiles: data});
    });
});

router.post('/readLang', authJWT.verify([]), async (req,res,next) => {
    const {lang, file} = req.body;
    let singleFileDir = path.join(__dirname, '../../locales/'+lang+'/'+file+'.json');
    fs.readFile(singleFileDir, {encoding: 'utf-8'}, function(err,singleFileData){
        res.json({success: true, singleFileData: JSON.parse(singleFileData)});
    });
});

router.post('/editLang', authJWT.verify([]), async (req,res,next) => {
    const {lang, file, fileData} = req.body;
    let singleFileDir = path.join(__dirname, '../../locales/'+lang+'/'+file+'.json');
    fs.writeFile(singleFileDir, fileData, {encoding: 'utf-8'}, function(err) {
        if(err) {
            return console.log(err);
        }
        res.json({success: true});
    });
});

/*router.post('/createLang', authJWT.verify([]), async (req,res,next) => {
    const {lang} = req.body;
    let i18nDir = path.join(__dirname, '../../i18n.json');
    let sourceDir = path.join(__dirname, '../../locales/en');
    let destinationDir = path.join(__dirname, '../../locales/'+lang);
    if (!fs.existsSync(destinationDir)){
        fs.mkdirSync(destinationDir, { recursive: true });
    }
    fs.readFile(i18nDir, {encoding: 'utf-8'}, function(err,singleFileData){
        let newi18n = JSON.parse(singleFileData);
        newi18n.locales.push(lang);
        fs.writeFile(i18nDir, JSON.stringify(newi18n), {encoding: 'utf-8'}, function(err) {
            if(err) {
                return console.log(err);
            }else{
                console.log('i18n Changed')
            }
        });
    });
    fs_Extra.copy(sourceDir, destinationDir, function(error) {
        if (error) {
            throw error;
        } else {
            res.json({success: true});
        }
    }); 
});*/


module.exports = router;