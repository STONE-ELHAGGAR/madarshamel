import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../../components/layout/Layout";
import Bank from "./../../../components/elements/Bank";
import TrTableItem from "./../../../components/elements/TrTableItem";
import MovementUploader from "./../../../components/elements/MovementUploader";
const handleTransportationActiveIndex = require('./../../../handlers/handleTransportationActiveIndex');
//Table Socket Requirments
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
import ReactHtmlParser from 'react-html-parser';

/*const handleTableReader = require('./../../../handlers/handleTableReader');

handleTableReader('6374733b476304ed31e64069', 'id','/api/company/readById').then((result) => {
    
})*/
const handleSendMessage = async (e) => {
    e.preventDefault();
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    let message = document.getElementById('message').value;
    console.log(message);
    let activeIndexId = document.getElementById('activeIndexId').value;
    let requestBody = {
        content: message,
        type: 'message',
        requestType: 'transportation',
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
        requestType: 'transportation',
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


const TransportationRequestData = () => {

    let router = useRouter()
    
    const { id } = router.query;

    const [receivedTableData ,setReceivedTableData] = useState('');
    const [accessToken ,setAccessToken] = useState('');
    const [activeIndex ,setActiveIndex] = useState(0);
    const [activeIndexData ,setActiveIndexData] = useState([]);
    const [activeTabCon ,setActiveTabCon] = useState(1);

    //Handle Table Socket
    const cc_send_accessToken_i_id = () => {
        if(accessToken && activeIndex){
            socket.emit('cc_send_accessToken_i_id', {accessToken: accessToken, activeIndex: activeIndex, tableName: 'transportation'});
        }
    }

    const socketInterval = setInterval(cc_send_accessToken_i_id, 2000);
    cc_send_accessToken_i_id();
    socketInterval;

    useEffect(() => {
            socket.on('cc_receive_table_data', (data) => {
                setReceivedTableData(data.replaceData);
            })
    },[socket]);


    useEffect(() => {
        if (id) {
            handleTransportationActiveIndex(id).then((result) => {
                (result.success) ? setActiveIndexData(result) : router.push({ pathname: '/404' }) ;
            })
            setActiveIndex(id);
        }
    }, [id]);
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setAccessToken(JSON.parse(sessionStorage.getItem('loginData')).data.accessToken);
        
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
        return (<div><MovementUploader tableName="transportation" id={activeIndex} /></div>);
    }
    return (
        <>
            <Layout userCreds={['same-as-u-id','custom-clearance','super-admin']} params={[]} modelName='' forNewUsers={0}>
                <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                    <div className="container">
                        <h3>Transportation Request</h3>
                        <h5>{id}</h5>
                        <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                <ul className="nav nav-pills nav-fill col-12 float-start">
                                    <li className="nav-item">
                                        <div className={((activeTabCon === 1) ? 'nav-link active h5' : 'nav-link h5' )} role="button" id="messageTab" onClick={() => {setActiveTabCon(1)}}>Message</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={((activeTabCon === 2) ? 'nav-link active h5' : 'nav-link h5' )} role="button" id="attachFileTab" onClick={() => {setActiveTabCon(2)}}>Attach File</div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={((activeTabCon === 3) ? 'nav-link active h5' : 'nav-link h5' )} role="button" id="serviceAlertTab" onClick={() => {setActiveTabCon(3)}}>Service Alert (SECRET)</div>
                                    </li>
                                </ul>
                                <div className="container-fluid float-start" id="tabCon">
                                    {((activeTabCon === 1) ? <SendMessageComponent /> : ((activeTabCon === 2) ? <SendAttachFileComponent /> : <SendAlertComponent /> ) )}
                                </div>
                            </div>
                            <div id="tableMirrorData">{ReactHtmlParser(receivedTableData)}</div>
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
                                        <td id="_id">{activeIndex}</td>
                                    </tr>
                                        <TrTableItem content={activeIndexData} id="companyName" row="Company Name" />
                                        <TrTableItem content={activeIndexData} id="branch" row="Branch" />
                                        <TrTableItem content={activeIndexData} id="transactionPlace" row="Transaction Place" />
                                        <TrTableItem content={activeIndexData} id="fromDate" row="From" />
                                        <TrTableItem content={activeIndexData} id="toDate" row="To" />
                                        <TrTableItem content={activeIndexData} id="sourceCountry" row="Source Country" />
                                        <TrTableItem content={activeIndexData} id="expectedShipDate" row="Expected Ship Date" />
                                        <TrTableItem content={activeIndexData} id="carCost" row="Car Cost" />
                                        <TrTableItem content={activeIndexData} id="drivers" row="Driver" />
                                        <TrTableItem content={activeIndexData} id="transferData" row="Transfer Date" />
                                        <TrTableItem content={activeIndexData} id="created_at" row="Created At" />
                                        <TrTableItem content={activeIndexData} id="u_id" row="By User" />
                                    </tbody>
                                </table>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start" id="ccFiles">

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 px-2 py-2 float-start">
                            <Bank tableName="transportation" requestId={activeIndex} />
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    );
};



export default TransportationRequestData;