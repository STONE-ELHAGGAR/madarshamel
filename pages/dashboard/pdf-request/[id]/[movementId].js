import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../../../components/layout/Layout";
const handleTableReader = require('./../../../../handlers/handleTableReader');
const handleCustomClearancePDFActiveIndex = require('./../../../../handlers/handleCustomClearancePDFActiveIndex');

const CustomClearanceRequestData = () => {

    let router = useRouter()
    
    const { id,movementId } = router.query;

    const [receivedTableData ,setReceivedTableData] = useState('');
    const [accessToken ,setAccessToken] = useState('');
    const [activeIndex ,setActiveIndex] = useState(0);
    const [activeMovementId ,setActiveMovementId] = useState(0);
    const [activeTab ,setActiveTab] = useState(1);


    useEffect(() => {
        if (id) {
            handleCustomClearancePDFActiveIndex(id,movementId).then((result) => {
                (result) ? true : router.push({ pathname: '/404' }) ;
            })
            setActiveMovementId(movementId);
            setActiveIndex(id);
        }
    }, [id]);
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setAccessToken(JSON.parse(sessionStorage.getItem('loginData')).data.accessToken);
    })
    return (
        <>
                <div className="container-fluid px-0 py-0 float-start backgrounded-con">
                <div className="a4">
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td style={{float: 'left'}}>
                                    <h5>Madarshamel</h5>
                                    <h6>International Shipping Services</h6>
                                    <h6>– Customs Clearance</h6>
                                </td>
                                <td><Image width="100px" height="80px" alt="MadarShamel" src="/assets/imgs/template/logo.png" /></td>
                                <td style={{textAlign: 'center',float: 'right',width: '100%'}}>
                                    <h5>المدار الشامل للتخليص الجمركي</h5>
                                    <h6>خدمات الشحن الدولي – التخليص الجمركي</h6>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table requestTitle">
                        <tbody>
                            <tr>
                                <td>Delivery note</td>
                                <td>بيان تسليم</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="col-6 float-start px-2 py-2">
                        <table className="table backgrounded-table">
                            <thead>
                                <tr>
                                    <td style={{border: '0px'}}>Delivery note</td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px',textAlign: 'right'}}>بيان تسليم</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Waybill No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',maxWidth: '170px'}}>{activeIndex}</td>
                                    <td>رقم الاشعار</td>
                                </tr>
                                <tr>
                                    <td>JOB No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',maxWidth: '170px'}}>{activeMovementId}</td>
                                    <td>رقم المعاملة</td>
                                </tr>
                                <tr>
                                    <td>DOC No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',maxWidth: '170px'}}>{activeIndex}</td>
                                    <td>رقم البيان</td>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',maxWidth: '170px'}} id="created_at"></td>
                                    <td>التاريخ</td>
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
                                    <td style={{border: '0px',textAlign: 'right'}}>بيانات التوصيل</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Receiving Location</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',maxWidth: '170px'}} id="recivingPort"></td>
                                    <td>موقع الاستلام</td>
                                </tr>
                                <tr>
                                    <td>Shipping Location</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',maxWidth: '170px'}} id="shippingPort"></td>
                                    <td>موقع التسليم</td>
                                </tr>
                                <tr>
                                    <td>Transaction Place</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',maxWidth: '170px'}} id="transactionPlace"></td>
                                    <td>مكان المعاملة</td>
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
                                    <td style={{border: '0px',textAlign: 'right'}}>بيانات العميل</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}} id="companyName"></td>
                                    <td style={{textAlign: 'right'}}>الاسم</td>
                                </tr>
                                <tr>
                                    <td>Contact No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}} id="clientNumber"></td>
                                    <td style={{textAlign: 'right'}}>رقم التواصل</td>
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
                                    <td style={{border: '0px',textAlign: 'right'}}>بيانات المُرسل إليه</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}}></td>
                                    <td style={{textAlign: 'right'}}>الاسم</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}}></td>
                                    <td style={{textAlign: 'right'}}>العنوان</td>
                                </tr>
                                <tr>
                                    <td>Contact No.</td>
                                    <td style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',minWidth: '170px',textAlign: 'center'}}></td>
                                    <td style={{textAlign: 'right'}}>رقم التواصل</td>
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
                                    <td style={{border: '0px',textAlign: 'right'}}>بيانات الشحنة</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>Details <span style={{float: 'right'}}>التفاصيل</span></td>
                                    <td style={{fontWeight: 'bold'}}>Type <span style={{float: 'right'}}>النوع</span></td>
                                    <td style={{fontWeight: 'bold'}}>CONT NO. <span style={{float: 'right'}}>رقم الحاوية</span></td>
                                    <td style={{fontWeight: 'bold'}}>QTY <span style={{float: 'right'}}>الكمية</span></td>
                                    <td style={{fontWeight: 'bold'}}>Weight <span style={{float: 'right'}}>الوزن</span></td>
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
                                                    <td>جاف</td>
                                                    <td>Dry</td>
                                                    <td>مُبرد</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2">Temperature</td>
                                                    <td colSpan="2">درجة الحرارة</td>
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
                    {/*<div className="col-12 float-start px-2" id="driveDataCon">
                        <table className="table backgrounded-table">
                            <thead>
                                <tr>
                                    <td style={{border: '0px'}}>Transporter data</td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px'}}> </td>
                                    <td style={{border: '0px',textAlign: 'right'}}>بيانات الناقل</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>Driver’s name <span style={{float: 'right'}}>اسم السائق</span></td>
                                    <td style={{fontWeight: 'bold'}}>ID NO. <span style={{float: 'right'}}>رقم الهوية</span></td>
                                    <td style={{fontWeight: 'bold'}}>TRUCK NO. <span style={{float: 'right'}}>رقم الشاحنة</span></td>
                                    <td style={{fontWeight: 'bold'}}>Contact No. <span style={{float: 'right'}}>رقم التواصل</span></td>
                                    <td style={{fontWeight: 'bold'}}>Signature <span style={{float: 'right'}}>التوقيع</span></td>
                                </tr>
                                <tr>
                                    <td className="p30i" style={{padding: '40px',background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}}></td>
                                    <td className="p30i" style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}}></td>
                                    <td className="p30i" style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}}></td>
                                    <td className="p30i" style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}}></td>
                                    <td className="p30i" style={{background: '#fff',fontSize: '13px',wordBreak: 'break-all',textAlign: 'center'}}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>*/}
                    <div className="col-12 float-start px-2 text-center">
                        <p>.المحتويات المُشار إليها اعلاه تقع على مسؤولية الناقل. وعدد الطرود ومحتوياتها المذكورة اعلاه هي حسب تصريح العميل ولا تشكل أي مسؤولية على الناقل</p>
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
                                    <td style={{background: '#fff'}}>تاريخ التفريغ</td>
                                </tr>
                                <tr>
                                    <td style={{background: '#fff'}}>Discharge Time</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',minWidth: '150px'}}></td>
                                    <td style={{background: '#fff'}}>وقت التفريغ</td>
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
                                    <td style={{background: '#fff'}}>تاريخ الوصول</td>
                                </tr>
                                <tr>
                                    <td style={{background: '#fff'}}>Arrival Time</td>
                                    <td style={{background: '#fff',fontSize: '12px',wordBreak: 'break-all',minWidth: '150px'}}></td>
                                    <td style={{background: '#fff'}}>وقت الوصول</td>
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
                                    <td style={{background: '#fff'}}>ملاحظات</td>
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
                                        <div className="tipData text-center">استلمت الحاوية المدونة أعلاه بحالة جيدة مع القفل مختوم</div>
                                        <div className="tipData text-center">I received the above container in good condition with the lock sealed</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{background: '#fff'}}>Receiver sign</td>
                                    <td className="p30ii" colSpan="2" style={{background: '#fff',minWidth: '120px'}}></td>
                                    <td style={{background: '#fff'}}>توقيع المُستلم</td>
                                </tr>
                                <tr>
                                    <td style={{background: '#fff'}}>Stamp</td>
                                    <td className="p30ii" colSpan="2" style={{background: '#fff',minWidth: '120px'}}></td>
                                    <td style={{background: '#fff'}}>الختم</td>
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
                                    <td style={{background: '#fff'}}>أعدت بواسطة</td>
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



export default CustomClearanceRequestData;