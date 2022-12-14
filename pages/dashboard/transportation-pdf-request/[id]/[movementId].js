import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../../../components/layout/Layout";
const handleTableReader = require('./../../../../handlers/handleTableReader');
const handleTransportationPDFActiveIndex = require('./../../../../handlers/handleTransportationPDFActiveIndex');
const handleGetNumId = require('./../../../../handlers/handleGetNumId');

const TransportationRequestData = () => {

    let router = useRouter()
    
    const { id,movementId } = router.query;

    const [receivedTableData ,setReceivedTableData] = useState('');
    const [accessToken ,setAccessToken] = useState('');
    const [activeIndex ,setActiveIndex] = useState(0);
    const [guiId ,setGuiId] = useState(0);
    const [guiMovementId ,setGuiMovementId] = useState(0);
    const [activeMovementId ,setActiveMovementId] = useState(0);
    const [activeTab ,setActiveTab] = useState(1);
    const [driversInput ,setDriversInput] = useState('');


    useEffect(() => {
        if (id) {
            handleTransportationPDFActiveIndex(id,movementId).then((result) => {
                (result.success) ? true : router.push({ pathname: '/404' }) ;
                setDriversInput(result.driversInput);
            })
            setActiveMovementId(movementId);
            setActiveIndex(id);
        }
    }, [id]);
    useEffect(() => {
        if(driversInput){
            const driverName = document.getElementById('driverName');
            const driverMobile = document.getElementById('driverMobile');
            const driverTruck = document.getElementById('driverTruck');
            const driverNid = document.getElementById('driverNid');
            //Driver Data
            handleTableReader(driversInput, 'id','/api/driver/readById').then((result) => {
                driverName.innerHTML = result.drivers[0].name
                driverMobile.innerHTML = result.drivers[0].mobile
                driverTruck.innerHTML = result.drivers[0].truck
                driverNid.innerHTML = result.drivers[0].nid
            })
        }
    },[driversInput]);
    useEffect(() => {
        if(activeIndex){
            handleGetNumId('transportation',activeIndex).then((result) => {
                setGuiId(result.numId);
            })
        }
    }, [activeIndex]);
    let containerData;
    useEffect(() => {
        if(activeIndex){
            handleGetNumId('movements',activeMovementId).then((result) => {
                setGuiMovementId(result.numId);
            })
            handleTableReader(activeMovementId, 'id','/api/movements/readById').then((result) => {
                containerData = JSON.parse(result.movements[0].content);
                document.getElementById('containerDetails').innerHTML = containerData.details;
                document.getElementById('containerNumber').innerHTML = containerData.containerNumber+' / Container Size:'+containerData.containerSize;
                document.getElementById('containerTemp').innerHTML = containerData.containerTemp;
                document.getElementById('containerQuantity').innerHTML = containerData.quantity+' / '+containerData.type;
                document.getElementById('containerWeight').innerHTML = containerData.weight+' / '+containerData.weightType;
            })
        }
    }, [activeMovementId]);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setAccessToken(JSON.parse(sessionStorage.getItem('loginData')).data.accessToken);
    })
    return (
        <>
                <div className="container-fluid px-0 py-0 float-start backgrounded-con">
                <div className="a4">
                    <table className="table table-borderless">
                    <input type="hidden" value="" id="driversInput" />
                        <tbody>
                            <tr>
                                <td style={{float: 'left'}}>
                                    <h5>Madarshamel</h5>
                                    <h6>International Shipping Services</h6>
                                    <h6>??? Customs Clearance</h6>
                                </td>
                                <td><Image width="100px" height="80px" alt="MadarShamel" src="/assets/imgs/template/logo.png" /></td>
                                <td style={{textAlign: 'center',float: 'right',width: '100%'}}>
                                    <h5>???????????? ???????????? ?????????????? ??????????????</h5>
                                    <h6>?????????? ?????????? ???????????? ??? ?????????????? ??????????????</h6>
                                    <h6>?????????? ?????????? ??????????</h6>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table requestTitle">
                        <tbody>
                            <tr>
                                <td>Delivery note</td>
                                <td>???????? ?????????? - ??????????</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="col-6 float-start px-2 py-2">
                        <table className="table backgrounded-table">
                            <thead>
                                <tr>
                                    <td style={{border: '0px'}}>Delivery note</td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px',textAlign: 'right'}}>???????? ??????????</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Waybill No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',maxWidth: '170px'}}>{guiId}</td>
                                    <td>?????? ??????????????</td>
                                </tr>
                                <tr>
                                    <td>JOB No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',maxWidth: '170px'}}>{guiMovementId}</td>
                                    <td>?????? ????????????????</td>
                                </tr>
                                <tr>
                                    <td>DOC No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',maxWidth: '170px'}}>{guiId}</td>
                                    <td>?????? ????????????</td>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',maxWidth: '170px'}} id="created_at"></td>
                                    <td>??????????????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6 float-start px-2 py-2">
                        <table className="table backgrounded-table">
                            <thead>
                                <tr>
                                    <td style={{border: '0px'}}>Delivery Data</td>
                                    <td style={{border: '0px'}}></td>
                                    <td style={{border: '0px',textAlign: 'right'}}>???????????? ??????????????</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>To</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',maxWidth: '170px'}} id="toDate"></td>
                                    <td>???????? ??????????????</td>
                                </tr>
                                <tr>
                                    <td>From</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',maxWidth: '170px'}} id="fromDate"></td>
                                    <td>???????? ??????????</td>
                                </tr>
                                <tr>
                                    <td>Transaction Place</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',maxWidth: '170px'}} id="transactionPlace"></td>
                                    <td>???????? ????????????????</td>
                                </tr>
                                <tr>
                                    <td>Expected Ship Date</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',maxWidth: '170px'}} id="expectedShipDate"></td>
                                    <td>?????????????? ????????????????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 float-start px-2">
                        <table className="table backgrounded-table">
                            <thead>
                                <tr>
                                    <td style={{border: '0px'}}>Client Data</td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px',textAlign: 'right'}}>???????????? ????????????</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}} id="companyName"></td>
                                    <td style={{textAlign: 'right'}}>??????????</td>
                                </tr>
                                <tr>
                                    <td>Contact No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}} id="companyMobile"></td>
                                    <td style={{textAlign: 'right'}}>?????? ??????????????</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}} id="companyAddress"></td>
                                    <td style={{textAlign: 'right'}}>??????????????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 float-start px-2">
                        <table className="table backgrounded-table">
                            <thead>
                                <tr>
                                    <td style={{border: '0px'}}>Consignee data</td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px',textAlign: 'right'}}>???????????? ?????????????? ????????</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}}></td>
                                    <td style={{textAlign: 'right'}}>??????????</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}}></td>
                                    <td style={{textAlign: 'right'}}>??????????????</td>
                                </tr>
                                <tr>
                                    <td>Contact No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}}></td>
                                    <td style={{textAlign: 'right'}}>?????? ??????????????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 float-start px-2">
                        <table className="table backgrounded-table">
                            <thead>
                                <tr>
                                    <td style={{border: '0px'}}>Shipment data</td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px',textAlign: 'right'}}>???????????? ????????????</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>Details <span style={{float: 'right'}}>????????????????</span></td>
                                    <td style={{fontWeight: 'bold'}}>Type <span style={{float: 'right'}}>??????????</span></td>
                                    <td style={{fontWeight: 'bold'}}>CONT NO. <span style={{float: 'right'}}>?????? ??????????????</span></td>
                                    <td style={{fontWeight: 'bold'}}>QTY <span style={{float: 'right'}}>????????????</span></td>
                                    <td style={{fontWeight: 'bold'}}>Weight <span style={{float: 'right'}}>??????????</span></td>
                                </tr>
                                <tr>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}} id="containerDetails"></td>
                                    <td className="conTT">
                                        <table className="table">
                                            <thead>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Cooler</td>
                                                    <td>??????</td>
                                                    <td>Dry</td>
                                                    <td>??????????</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2">Temperature</td>
                                                    <td colSpan="2">???????? ??????????????</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" id="containerTemp"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}} id="containerNumber"></td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}} id="containerQuantity"></td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}} id="containerWeight"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 float-start px-2" id="driveDataCon">
                        <table className="table backgrounded-table">
                            <thead>
                                <tr>
                                    <td style={{border: '0px'}}>Transporter data</td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px',textAlign: 'right'}}>???????????? ????????????</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>Driver???s name <span style={{float: 'right'}}>?????? ????????????</span></td>
                                    <td style={{fontWeight: 'bold'}}>ID NO. <span style={{float: 'right'}}>?????? ????????????</span></td>
                                    <td style={{fontWeight: 'bold'}}>TRUCK NO. <span style={{float: 'right'}}>?????? ??????????????</span></td>
                                    <td style={{fontWeight: 'bold'}}>Contact No. <span style={{float: 'right'}}>?????? ??????????????</span></td>
                                    <td style={{fontWeight: 'bold'}}>Signature <span style={{float: 'right'}}>??????????????</span></td>
                                </tr>
                                <tr>
                                    <td className="p30i" style={{padding: '40px',background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}} id="driverName"></td>
                                    <td className="p30i" style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}} id="driverNid"></td>
                                    <td className="p30i" style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}} id="driverTruck"></td>
                                    <td className="p30i" style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}} id="driverMobile"></td>
                                    <td className="p30i" style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 float-start px-2 text-center">
                        <p>.?????????????????? ?????????????? ?????????? ?????????? ?????? ?????? ?????????????? ????????????. ???????? ???????????? ???????????????????? ???????????????? ?????????? ???? ?????? ?????????? ???????????? ?????? ???????? ???? ?????????????? ?????? ????????????</p>
                        <span style={{fontSize: '12px', fontWeight: 'bold'}}>The contents referred to above are the responsibility of the transporter and the number of packages and their contents mentioned
                        above are according to the customer's declaration and do not constitute any responsibility to the transporter.</span>
                    </div>
                    <div className="col-6 float-start px-2">
                        <table className="table backgrounded-table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{background: '#fff'}}>Discharge Date</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',minWidth: '150px'}}></td>
                                    <td style={{background: '#fff'}}>?????????? ??????????????</td>
                                </tr>
                                <tr>
                                    <td style={{background: '#fff'}}>Discharge Time</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',minWidth: '150px'}}></td>
                                    <td style={{background: '#fff'}}>?????? ??????????????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6 float-start px-2">
                        <table className="table backgrounded-table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{background: '#fff'}}>Arrival Date</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',minWidth: '150px'}}></td>
                                    <td style={{background: '#fff'}}>?????????? ????????????</td>
                                </tr>
                                <tr>
                                    <td style={{background: '#fff'}}>Arrival Time</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',minWidth: '150px'}}></td>
                                    <td style={{background: '#fff'}}>?????? ????????????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-3 float-start px-2">
                        <table className="table backgrounded-table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{background: '#fff'}}>Remarks</td>
                                    <td style={{background: '#fff'}}>??????????????</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{background: '#fff'}} className="p30"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6 float-start px-2">
                        <table className="table backgrounded-table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="4" style={{background: '#fff'}}>
                                        <div className="tipData text-center">???????????? ?????????????? ?????????????? ?????????? ?????????? ???????? ???? ?????????? ??????????</div>
                                        <div className="tipData text-center">I received the above container in good condition with the lock sealed</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{background: '#fff'}}>Receiver sign</td>
                                    <td className="p30ii" colSpan="2" style={{background: '#fff',minWidth: '120px'}}></td>
                                    <td style={{background: '#fff'}}>?????????? ????????????????</td>
                                </tr>
                                <tr>
                                    <td style={{background: '#fff'}}>Stamp</td>
                                    <td className="p30ii" colSpan="2" style={{background: '#fff',minWidth: '120px'}}></td>
                                    <td style={{background: '#fff'}}>??????????</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-3 float-start px-2">
                        <table className="table backgrounded-table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{background: '#fff'}}>Prepared By</td>
                                    <td style={{background: '#fff'}}>???????? ????????????</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{background: '#fff'}} className="p30"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>



                    </div>
                </div>
        </>
    );
};



export default TransportationRequestData;