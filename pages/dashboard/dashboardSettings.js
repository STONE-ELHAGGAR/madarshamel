import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../components/layout/Layout";

import AddUser from "./../../components/elements/AddUser";
import AddDriver from "./../../components/elements/AddDriver";
import AddCompany from "./../../components/elements/AddCompany";
import Branches from "./../../components/elements/Branches";
import AllUsers from "./../../components/elements/AllUsers";
import RequestSettings from "./../../components/elements/RequestSettings";


const dashboardSettings = () => {

    const [activeSettingsTab , setActiveSettingsTab] = useState('AddDriver');
    
    const all = {
        'AddDriver': AddDriver,
        'AddCompany': AddCompany,    
        'AddUser': AddUser,    
        'Branches': Branches,    
        'AllUsers': AllUsers,    
        'RequestSettings': RequestSettings    
    };
    // The resolved component must begin with a capital letter
    const ChoosedSetting = all[activeSettingsTab];
return (
    <>
        <Layout userCreds={['super-admin']} params={[]} modelName='' forNewUsers={0}>
            <div className="container-fluid backgrounded-con float-start px-3 py-3">
                <div className="container">
                    <div className="col-12 px-3 py-3">
                        <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <h5>Dashboard Settings</h5>
                            <div className="col-12 mt-3 float-start" style={{background: '#fff'}}>
                                <div className={(activeSettingsTab == 'AddDriver') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('AddDriver')}}>
                                    Add Driver
                                </div>
                                <div className={(activeSettingsTab == 'AddCompany') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('AddCompany')}}>
                                    Add Company
                                </div>
                                <div className={(activeSettingsTab == 'AddUser') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('AddUser')}}>
                                    Add User
                                </div>
                                <div className={(activeSettingsTab == 'Branches') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('Branches')}}>
                                    Branches
                                </div>
                                <div className={(activeSettingsTab == 'AllUsers') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('AllUsers')}}>
                                    All Users
                                </div>
                                <div className={(activeSettingsTab == 'RequestSettings') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('RequestSettings')}}>
                                    Request Settings
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                <ChoosedSetting />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
    );
}

export default dashboardSettings;