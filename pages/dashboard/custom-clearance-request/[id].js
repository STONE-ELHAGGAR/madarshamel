import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../../components/layout/Layout";
const handleCustomClearanceActiveIndex = require('./../../../handlers/handleCustomClearanceActiveIndex');
//Table Socket Requirments
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
import ReactHtmlParser from 'react-html-parser';



const handleSendMessage = async (e) => {
    e.preventDefault();
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    let message = document.getElementById('message').value;
    console.log(message);
    let activeIndexId = document.getElementById('activeIndexId').value;
    let requestBody = {
        content: message,
        type: 'message',
        requestType: 'custom-clearance',
        requestId: activeIndexId,
    }
    const sendMsgRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/movements/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(requestBody)
    });
    const content = await sendMsgRequest.json();
    if(content.success){
        document.getElementById('message').value = '';
    }
}
const handleServiceAlert = async (e) => {
    e.preventDefault();
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    let serviceAlert = document.getElementById('serviceAlert').value;
    console.log(serviceAlert);
    let activeIndexId = document.getElementById('activeIndexId').value;
    let requestBody = {
        content: serviceAlert,
        type: 'serviceAlert',
        requestType: 'custom-clearance',
        requestId: activeIndexId,
    }
    const sendServiceAlertRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/movements/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(requestBody)
    });
    const content = await sendServiceAlertRequest.json();
    if(content.success){
        document.getElementById('serviceAlert').value = '';
    }
}


const CustomClearanceRequestData = () => {

    let router = useRouter()
    
    const { id } = router.query;

    const [receivedTableData ,setReceivedTableData] = useState('');
    const [accessToken ,setAccessToken] = useState('');
    const [activeIndex ,setActiveIndex] = useState(0);
    const [activeTab ,setActiveTab] = useState(1);

    //Handle Table Socket
    const cc_send_accessToken_i_id = () => {
        if(accessToken && activeIndex){
            socket.emit('cc_send_accessToken_i_id', {accessToken: accessToken, activeIndex: activeIndex});
        }
    }

    const socketInterval = setInterval(cc_send_accessToken_i_id, 2000);
    cc_send_accessToken_i_id();
    socketInterval;

    useEffect(() => {
        socket.on('cc_receive_table_data', (data) => {
            if(data.data.length > 0){
                const replaceData = '';
                data.data.map((movement) => {
                    if(movement.type == 'message'){
                        movement.type = 'Message';
                    }
                    if(movement.type == 'serviceAlert'){
                        movement.type = 'Service Alert';
                    }
                    replaceData +=
                    '<div class="col-12 px-3 py-3 mt-3 float-start" style="background: #fff">\
                        <h5 style="border-bottom: 1px solid #ddd;padding-bottom: 10px;margin-bottom: 10px;">'+movement.type+' from '+movement.u_id+'</h5><h6>'
                            +movement.content+
                    '</h6></div>';
                })
                setReceivedTableData(replaceData);
            }
        })
    },[socket]);



    useEffect(() => {
        if (id) {
            handleCustomClearanceActiveIndex(id).then((result) => {
                (result) ? true : router.push({ pathname: '/404' }) ;
            })
            setActiveIndex(id);
        }
    }, [id]);
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setAccessToken(JSON.parse(sessionStorage.getItem('loginData')).data.accessToken);

        //TAB Change Message
        const message = document.getElementById('messageTab');
        const serviceAlert = document.getElementById('serviceAlertTab');
        const attachFile = document.getElementById('attachFileTab');
        const tabCon = document.getElementById('tabCon');
        message.addEventListener('click',() => {setActiveTab(1);})
        attachFile.addEventListener('click',() => {setActiveTab(2);})
        serviceAlert.addEventListener('click',() => {setActiveTab(3);})
    })
    const SendMessageComponent = () => {
        return (
            <div>
                <textarea className="form-control" id="message" placeholder="Type your message"></textarea>
                <input id="activeIndexId" value={activeIndex} type="hidden" />
                <br />
                <button className="btn btn-square" id="sendMessage" onClick={handleSendMessage}>SEND</button>
            </div>
        );
    }
    const SendAlertComponent = () => {
        return (
        <div>
            <textarea className="form-control" id="serviceAlert" placeholder="Type your alert"></textarea>
            <input id="activeIndexId" value={activeIndex} type="hidden" />
            <br />
            <button className="btn btn-square" id="sendServiceAlert" onClick={handleServiceAlert}>SEND</button>
        </div>
        );
    }
    const SendAttachFileComponent = () => {
        return (<div><h2>AttachFile</h2></div>);
    }
    return (
        <>
            <Layout>
                <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                    <div className="container">
                        <h3>Custom Clearance Request</h3>
                        <h5>{id}</h5>
                        <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                <ul className="nav nav-pills nav-fill col-12 float-start">
                                    <li className="nav-item">
                                        <a className="nav-link h5" href="#"><i className="fi fi-rr-file"></i> Download PDF</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link h5" href="#"><i className="fi fi-rr-list"></i> Full Report</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link h5" href="#"><i className="fi fi-rr-edit"></i> Edit</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                <ul className="nav nav-pills nav-fill col-12 float-start">
                                    <li className="nav-item">
                                        <div className={((activeTab === 1) ? 'nav-link active h5' : 'nav-link h5' )} role="button" id="messageTab">Message</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={((activeTab === 2) ? 'nav-link active h5' : 'nav-link h5' )} role="button" id="attachFileTab">Attach File</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={((activeTab === 3) ? 'nav-link active h5' : 'nav-link h5' )} role="button" id="serviceAlertTab">Service Alert (SECRET)</div>
                                    </li>
                                </ul>
                                <div className="container-fluid float-start" id="tabCon">
                                    {((activeTab === 1) ? <SendMessageComponent /> : ((activeTab === 2) ? <SendAttachFileComponent /> : <SendAlertComponent /> ) )}
                                </div>
                            </div>
                            {ReactHtmlParser(receivedTableData)}
                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                <h4>Request Details</h4>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Field</th>
                                            <th scope="col">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody id="requestChangesConData">
                                        <tr>
                                            <th scope="row">ID</th>
                                            <td id="_id"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Company Name</th>
                                            <td id="companyName"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Branch</th>
                                            <td id="branch"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Transaction Place</th>
                                            <td id="transactionPlace"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Shipping Port</th>
                                            <td id="shippingPort"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Reciving Port</th>
                                            <td id="recivingPort"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Source Country</th>
                                            <td id="sourceCountry"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Expected Ship Date</th>
                                            <td id="expectedShipDate"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Created At</th>
                                            <td id="created_at"></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">By User</th>
                                            <td id="u_id"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start" id="ccFiles">

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 px-2 py-2 float-start">
                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                <h5 className="text-center">Ahmed Elhaggar</h5>
                                <h5>Balance: <code>10000</code> SAR | Debt: <code>0</code> SAR</h5><br />
                                <h5>Bank Request</h5>
                                <input type="text" placeholder="amount" name="amount" className="form-control amount"/><br />
                                <select name="case" className="form-control case">
                                    <option value="0">Withdraw</option>
                                    <option value="1">Deposit</option>
                                </select><br />
                                <textarea placeholder="Additional Details" className="form-control additionalDetails"></textarea><br />
                                <button className="btn btn-square">Create</button>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    );
};



export default CustomClearanceRequestData;