import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../components/layout/Layout";

import AddTransportation from "./../../components/elements/AddTransportation";
import TransportationRequests from "./../../components/elements/TransportationRequests";


const controlTRRequests = () => {

    const [activeSettingsTab , setActiveSettingsTab] = useState('AddTransportation');
    
    const all = {
        'AddTransportation': AddTransportation,    
        'TransportationRequests': TransportationRequests
    };
    // The resolved component must begin with a capital letter
    const ChoosedSetting = all[activeSettingsTab];
return (
    <>
        <Layout userCreds={['original-user','transportation','super-admin']} params={[]} modelName='' forNewUsers={0}>
            <div className="container-fluid backgrounded-con float-start px-3 py-3">
                <div className="container">
                    <div className="col-12 px-3 py-3">
                        <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <h5>Transportation Settings</h5>
                            <div className="col-12 mt-3 float-start" style={{background: '#fff'}}>
                                <div className={(activeSettingsTab == 'AddTransportation') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('AddTransportation')}}>
                                    Add Transportation
                                </div>
                                <div className={(activeSettingsTab == 'TransportationRequests') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('TransportationRequests')}}>
                                    Transportation Requests
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                <ChoosedSetting settingsTab={activeSettingsTab} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
    );
}

export default controlTRRequests;