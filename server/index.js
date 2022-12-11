const express = require('express');
const app = express();
const mongoose = require('mongoose');
const next = require("next");


const authRouter = require("./auth/authRouter");
const files = require("./files/crud");
const custom_clearance = require("./custom_clearance/crud");
const transportation = require("./transportation/crud");
const transactions = require("./transactions/crud");
const uploader = require("./uploader/crud");
const movements = require("./movements/crud");
const settings = require("./settings/crud");
const branches = require("./branches/crud");
const company = require("./company/crud");
const driver = require("./driver/crud");
const chat = require("./chat/crud");
const prices = require("./prices/crud");
const contact = require("./contact/crud");
const homes = require("./homes/crud");
const pages = require("./pages/crud");
const socketRouter = require("./socketRouter/index");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const serverApp = next({ dev });
const handle = serverApp.getRequestHandler();

serverApp
  .prepare()
  .then(() => {
    app.use(express.json());

    app.use('/api',authRouter);
    app.use('/api/files',files);
    app.use('/api/custom_clearance',custom_clearance);
    app.use('/api/transportation',transportation);
    app.use('/api/transactions',transactions);
    app.use('/api/uploader',uploader);
    app.use('/api/movements',movements);
    app.use('/api/settings',settings);
    app.use('/api/branches',branches);
    app.use('/api/company',company);
    app.use('/api/driver',driver);
    app.use('/api/chat',chat);
    app.use('/api/prices',prices);
    app.use('/api/contact',contact);
    app.use('/api/homes',homes);
    app.use('/api/pages',pages);
    app.use('/',socketRouter);

    app.get('/api/download', function(req, res){
      const {fileName} = req.query;
      const file = `${__dirname}/../uploads/${fileName}`;
      res.download(file); // Set disposition and send it.
    });
    
      /*
      --- Send Email
      const sendEmail = require('./../util/sendEmail');
      sendEmail(
        'ahmedelhagar74@gmail.com', //To Email
        'Ahmed Elhaggar', //To Name
        'Welcome To Madarshamel', //Message Subject
        'https://madarshamel.sa/', //btn_link
        'GO', //btn_content
        'temp_line1 Data', //temp_line1
        'temp_line2 Data', //temp_line2
        'temp_line3 Data', //temp_line3
        'temp_line4 Data', //temp_line4
      );
      */
    
    app.get("*", (req, res) => {
      return handle(req, res);
    });
    
    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`>>>>>>> Ready on ${PORT}`);
    });

  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

mongoose.connect('mongodb://localhost:27017/madarshamel');