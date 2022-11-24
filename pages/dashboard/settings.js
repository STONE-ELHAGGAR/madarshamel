import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../components/layout/Layout";
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');

import AddUser from "./../../components/elements/AddUser";
import AddDriver from "./../../components/elements/AddDriver";
import AddCompany from "./../../components/elements/AddCompany";
import Branches from "./../../components/elements/Branches";
import AllUsers from "./../../components/elements/AllUsers";
import RequestSettings from "./../../components/elements/RequestSettings";


const dashboardSettings = () => {

    const [activeSettingsTab , setActiveSettingsTab] = useState('LoadingSettings');
    const [componentsTab , setComponentsTab] = useState({});
    const [menuTabs , setMenuTabs] = useState(false);
    const [pageIsReady , setPageIsReady] = useState(false);
    const LoadingSettings = () => {
        return (
            <div>
                <h5>Loading Settings</h5>
            </div>
        )
    }
    let all = {
        'LoadingSettings': LoadingSettings
    };
    const MenuTabsOriginal = () => {
        return (
            <div className="col-12 mt-3 float-start" style={{background: '#fff'}}>
                <div className={(activeSettingsTab == 'AddCompany') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('AddCompany')}}>
                    Add Company
                </div>
                <div className={(activeSettingsTab == 'Branches') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('Branches')}}>
                    Branches
                </div>
            </div>
        )
    }
    const MenuTabs = () => {
        return (
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
        )
    }
    useEffect(() => {
    checkIfLoggedIn(['super-admin'],[],'',0)
        .then((result) => {
            if(result){
                setComponentsTab({
                    'LoadingSettings': LoadingSettings,
                    'AddDriver': AddDriver,
                    'AddCompany': AddCompany,    
                    'AddUser': AddUser,    
                    'Branches': Branches,    
                    'AllUsers': AllUsers,    
                    'RequestSettings': RequestSettings    
                });
                setActiveSettingsTab('AddDriver');
                setMenuTabs(true);
                setPageIsReady(true);
            }else{
                setComponentsTab({
                    'LoadingSettings': LoadingSettings,
                    'AddCompany': AddCompany,    
                    'Branches': Branches    
                });
                setActiveSettingsTab('AddCompany');
                setMenuTabs(false);
                setPageIsReady(true);
            }
        })
    },[])
    all = componentsTab;
    
    // The resolved component must begin with a capital letter
    const ChoosedSetting = all[activeSettingsTab];
return (
    <>
        <Layout userCreds={['original-user','super-admin']} params={[]} modelName='' forNewUsers={0}>
            <div className="container-fluid backgrounded-con float-start px-3 py-3">
                <div className="container">
                    <div className="col-12 px-3 py-3">
                        <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <h5>Dashboard Settings</h5>
                            {(menuTabs) ? <MenuTabs /> : <MenuTabsOriginal />}
                        </div>
                        <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                {(pageIsReady) ? <ChoosedSetting /> : <LoadingSettings />}
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