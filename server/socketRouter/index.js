const express = require('express');
//Router because it'll be required in index.js (backend server)
const router = express.Router();
//JsonWebToken to create access token
const authJWT = require('./../../util/authJWT');
//Movements MongoDB Table schema (models)
const Users = require('./../models/users');
const Movements = require('./../models/movements');
const Custom_clearance = require('./../models/custom_clearance');
const Chat = require('./../models/chat');
const jwt = require('jsonwebtoken');
//Socket IO
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const SERVERPORT = process.env.PORT || 3001;
const secret = process.env.API_SECRET;

router.use(cors());
const server = http.createServer(router);
const io = new Server(server, {
    cors: {origin: "*"}
});

io.on('connection', (socket) => {
    let resData = {};
    let movementsData;
    console.log('User Connected id = ' + socket.id);

    socket.on("join_room", (data) => {
        console.log('Joined Room : '+data);
        socket.join(data);
    });
    
    socket.on("send_message", async (data) => {
        //Here Insert Messages To Chats Table
        const message = data.message;
        const for_u_id = data.activeRoom;
        const accessToken = data.accessToken;
        let newChatsData = [];
        const created_at = new Date().toLocaleString("en-US", {timeZone: "Asia/Riyadh"});
        let u_id = '0';
        try{
            const payload = jwt.verify(accessToken, secret);
            u_id = payload.sub;
        }catch(e){
            console.log(e,accessToken);
        }
        const seen = 'unseen';
        let resData = [];
        const chat = Chat({message, seen, created_at, u_id, for_u_id});

        try {
            await chat.save(async (err,messageData) => {
                console.log(err,'Inserted Message '+messageData._id);
                resData = {success: true,message: messageData};
                try {
                    let chatsData = await Chat.find( { for_u_id: for_u_id } );
                    for (var i = 0; i < chatsData.length; i++) {
                        let usersData = await Users.find( { _id: chatsData[i].u_id } );
                        chatsData[i] = {
                            name: usersData[0].name,
                            message: chatsData[i].message,
                            u_id: chatsData[i].u_id,
                            seen: chatsData[i].seen,
                            _id: chatsData[i]._id,
                            created_at: chatsData[i].created_at,
                        }
                    }
                    resData = {success: true,chats: chatsData};
                    socket.to(data.activeRoom).emit("receive_message", resData);
                }catch(e) {
                    resData = { message: 'Something went wrong' ,error: e};
                }
            });
        }catch(e) {
            console(e);
        }
    });

    socket.on('cc_send_accessToken_i_id', async (data) => {
        let replaceData = '';
        try {
            const movements = await Movements.find({requestId: data.activeIndex});
            movementsData = movements.reverse();
            if(movementsData.length > 0){
                for(let movementId in movementsData){
                    const user = await Users.findById(movements[movementId].u_id);
                    if(movements[movementId].type == 'message'){
                        movements[movementId].type = 'Message';
                        movements[movementId].content = movements[movementId].content;
                    }
                    if(movements[movementId].type == 'serviceAlert'){
                        movements[movementId].type = 'Service Alert';
                        movements[movementId].content = movements[movementId].content;
                    }
                    if(movements[movementId].type == 'attachedFile'){
                        movements[movementId].type = 'Attached File';
                        movements[movementId].content = movements[movementId].content;
                        let fileNames = '';
                        let contentFiles = JSON.parse(movements[movementId].content);
                        let ccFiles = '<ul class="nav nav-pills nav-fill col-12 float-start"><li class="nav-item"><a class="nav-link h5" href="/dashboard/'+data.tableName+'-pdf-request/'+data.activeIndex+'/'+movements[movementId]._id+'"><i class="fi fi-rr-file"></i> Download PDF</a></li></ul>';
                        fileNames = '';
                            if(contentFiles?.files){
                                Object.values(JSON.parse(contentFiles.files)).map((fileName) => {
                                fileNames += '<a href="http://localhost:3000/api/download?fileName='+fileName+'" target="_blank">\
                                                    <div class="text-center">\
                                                        <i class="fi fi-rr-file h4"></i>\
                                                    </div>\
                                                    <div class="compare-tip h6">\
                                                        <span class="success" style="word-break: break-all;">'+fileName+'</span>\
                                                    </div>\
                                                </a>';
                                })
                            }
                            ccFiles += '<div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start px-3 py-3">\
                                                <div class="product-item-2 hover-up">\
                                                    <table class="table table-striped">\
                                                        <thead>\
                                                            <tr>\
                                                                <th scope="col">Field</th>\
                                                                <th scope="col">Value</th>\
                                                            </tr>\
                                                        </thead>\
                                                        <tbody>\
                                                            <tr>\
                                                                <th scope="row">Main Policy</th>\
                                                                <td>'+contentFiles.mainPolicy+'</td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th scope="row">Quantity</th>\
                                                                <td>'+contentFiles.quantity+'</td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th scope="row">Type</th>\
                                                                <td>'+contentFiles.type+'</td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th scope="row">Weight</th>\
                                                                <td>'+contentFiles.weight+'</td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th scope="row">Weight Type</th>\
                                                                <td>'+contentFiles.weightType+'</td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th scope="row">Container Size</th>\
                                                                <td>'+contentFiles.containerSize+'</td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th scope="row">Container Number</th>\
                                                                <td>'+contentFiles.containerNumber+'</td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th scope="row">Container Temprature</th>\
                                                                <td>'+contentFiles.containerTemp+'</td>\
                                                            </tr>\
                                                            <tr>\
                                                                <th scope="row">Details</th>\
                                                                <td>'+contentFiles.details+'</td>\
                                                            </tr>\
                                                        </tbody>\
                                                    </table><br />'+fileNames+'</div>\
                                            </div>';
                                            movements[movementId].content = ccFiles;
                    }
                    replaceData +=
                    '<div class="col-12 px-3 py-3 mt-3 float-start" style="background: #fff">\
                        <h5 style="border-bottom: 1px solid #ddd;padding-bottom: 10px;margin-bottom: 10px;">'+movements[movementId].type+' from '+user.name+'</h5><h6>'
                            +movements[movementId].content+
                    '</h6></div>';

                }
            }

            resData = {data: null, replaceData: replaceData,activeIndex: data.activeIndex};
        } catch(e) {
            resData = {data: e,activeIndex: data.activeIndex};
            console.log(e)
        }
        socket.emit('cc_receive_table_data', resData);
    })

})

server.listen(SERVERPORT, err => {
    if (err) throw err;
    console.log(`>>>>>>> Socket Server Running on ${SERVERPORT}`);
});

module.exports = router;