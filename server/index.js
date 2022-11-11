const express = require('express');
const app = express();
const mongoose = require('mongoose');
const next = require("next");

const authRouter = require("./auth/authRouter");
const files = require("./files/crud");
const custom_clearance = require("./custom_clearance/crud");
const transportation = require("./transportation/crud");
const uploader = require("./uploader/crud");
const movements = require("./movements/crud");
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
    app.use('/api/uploader',uploader);
    app.use('/api/movements',movements);
    app.use('/',socketRouter);

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