const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');
//Movements MongoDB Table schema (models)
const Users = require('./../models/users');
const Movements = require('./../models/movements');
const Custom_clearance = require('./../models/custom_clearance');
//Socket IO
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const SERVERPORT = process.env.PORT || 3001;


router.use(cors());
const server = http.createServer(router);
const io = new Server(server, {
    cors: {origin: "*"}
});

io.on('connection', (socket) => {
    let resData = {};
    console.log('User Connected id = ' + socket.id);
    socket.on('cc_send_accessToken_i_id', async (data) => {
        try {
            const movements = await Movements.find({requestId: data.activeIndex});
            for(let movementId in movements){
                const user = await Users.findById(movements[movementId].u_id);
                movements[movementId].u_id = user.name;
            }
            resData = {data: movements.reverse(),activeIndex: data.activeIndex};
        } catch(e) {
            resData = {data: e,activeIndex: data.activeIndex};
        }
        socket.emit('cc_receive_table_data', resData);
    })

})

server.listen(SERVERPORT, err => {
    if (err) throw err;
    console.log(`>>>>>>> Socket Server Running on ${SERVERPORT}`);
});

module.exports = router;