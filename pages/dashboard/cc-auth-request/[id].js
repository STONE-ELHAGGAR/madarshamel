import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../../components/layout/Layout";
const handleTableReader = require('./../../../handlers/handleTableReader');
const handleCustomClearanceAuthActiveIndex = require('./../../../handlers/handleCustomClearanceAuthActiveIndex');
const handleGetNumId = require('./../../../handlers/handleGetNumId');

const CustomClearanceRequestData = () => {

    let router = useRouter()
    
    const { id } = router.query;
    const [receivedTableData ,setReceivedTableData] = useState('');
    const [accessToken ,setAccessToken] = useState('');
    const [activeIndex ,setActiveIndex] = useState(0);
    const [guiId ,setGuiId] = useState(0);
    const [guiMovementId ,setGuiMovementId] = useState(0);
    const [activeMovementId ,setActiveMovementId] = useState(0);
    const [activeTab ,setActiveTab] = useState(1);


    useEffect(() => {
        if (id) {
            handleCustomClearanceAuthActiveIndex(id).then((result) => {
                (result) ? true : router.push({ pathname: '/404' }) ;
            })
            setActiveIndex(id);
        }
    }, [id]);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        setAccessToken(JSON.parse(sessionStorage.getItem('loginData')).data.accessToken);
    })
    const Paragraph = ({right, left, center=''}) => {
        return(
            <div className="col-12 float-start px-2 text-center mt-3" style={{fontSize: '17px', direction: 'rtl'}}>
                <p>
                    <span className="float-end">
                        {right}
                    </span>
                    <span>
                        {center}
                    </span>
                    <span className="float-start">
                        {left}
                    </span>
                </p>
            </div>
        )
    }
    return (
        <>
                <div className="container-fluid px-0 py-0 float-start backgrounded-con" style={{fontFamily: 'tahoma'}}>
                    <div className="a4 px-5 py-5">
                        
                        <Paragraph right="السادة / جميع وكلاء الملاحة" left="المحترمين" />
                        <Paragraph right="السلام عليكم ورحمة الله وبركاته" left="" />
                        <div className="col-12 float-start px-2 text-center mt-3" style={{fontWeight: 'bold',fontSize: '17px', direction: 'rtl'}}>
                            <p>
                                <span className="px-2 py-2 float-end">
                                    نقر نحن / شركة: 
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="companyName"></span>
                                </span>
                                <span className="px-2 py-2 float-end">
                                    ومقرها
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="companyAddress"></span>
                                </span>
                                <span className="px-2 py-2 float-end">
                                    صندوق بريد
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="postalCode"></span>
                                </span>
                                <span className="px-2 py-2 float-end">
                                    هاتف
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="companyMobile"></span>
                                </span>
                                <span className="px-2 py-2 float-end">
                                    فاكس رقم
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="fax"></span>
                                </span>
                                <span className="px-2 py-2 float-end">
                                    سجل تجاري رقم/
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="commercialRegistrationNo"></span>
                                </span>
                                <span className="px-2 py-2 float-end">
                                    وتاريخه
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="commercialRegistrationDate"></span>
                                </span>
                                <span className="px-2 py-2 float-end">
                                    الصادر من مدينة
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="commercialRegistrationCity"></span>
                                </span>
                                <span className="px-2 py-2 float-end">
                                    والمشترك بالغرفة التجارية رقم / 
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="chamberOfCommerceNumber"></span>
                                </span>
                            </p>
                        </div>
                        <Paragraph right="بأننا فوضنا المخلص الجمركي مكتب المدار الشامل  للتخليص الجمركي والحاصل على رخصة التخليص رقم 3856 صادرة من جدة بتاريخ 10/05/1438هـ وذلك بدفع مبالغ التأمين المستحقة على البضائع العائدة لنا سواء كانت شيكا او نقدا او مدفوعة من قبل المخلص أو صاحب البضاعة وله الحق في استرداد تلك المبالغ المودعة اليكم لصالح الحاويات العائدة والمسلمة الينا بعد تسديد غرامات تأخير الحاويات ان وجدت والمذكور مفوض ايضا من قبلنا باستلام اذن التسليم نيابة عنا كما يحق له التوقيع ووضع ختمة الخاص على البوليصة الاصلية والتوقيع على الاوراق المعدة من قبلنا في هذا الخصوص." left="" />
                        <Paragraph right="كما اقر ان الارسالية تعود لي شخصيا." left="" />
                        <Paragraph right="كما اقر ان هذه الارساليات تعود لي شخصيا وأنا مسئول مسئولية كاملة عن جميع المستندات الخاصة بذلك وتبعا لذلك سوف أتحمل كامل المسئولية إذا ما وقعت أي مخالفة جراء هذا التفويض" left="" />
                        <Paragraph right="" left="ملاحظة: يجب التصديق من الغرفة التجارية." />
                        <div className="col-12 float-start px-2 text-center mt-3" style={{fontWeight: 'bold',fontSize: '17px', direction: 'rtl'}}>
                            <p>
                                <span className="px-2 py-2 float-end">
                                    ويعتبر هذا التفويض ساري لمدة سنة واحدة اعتبارا من
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="created_at"></span>
                                </span>
                                <span className="px-2 py-2 float-end">
                                    حتى
                                </span>
                                <span className="px-2 py-2 float-end">
                                    <span id="c_to_date"></span>
                                </span>
                            </p>
                        </div>
                        <Paragraph right="" center="شاكرين لكم حسن تعاونكم" left="" />
                        <Paragraph right="" center="" left="المدير العام" />
                    </div>
                </div>
        </>
    );
};



export default CustomClearanceRequestData;