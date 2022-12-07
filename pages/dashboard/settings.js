import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../components/layout/Layout";
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');

import AddUser from "./../../components/elements/AddUser";
import EditUser from "./../../components/elements/EditUser";
import AddDriver from "./../../components/elements/AddDriver";
import AddCompany from "./../../components/elements/AddCompany";
import AddPage from "./../../components/elements/AddPage";
import Branches from "./../../components/elements/Branches";
import AllUsers from "./../../components/elements/AllUsers";
import AllPriceRequests from "./../../components/elements/AllPriceRequests";
import ContactRequests from "./../../components/elements/ContactRequests";
import RequestSettings from "./../../components/elements/RequestSettings";
import EditHomePage from "./../../components/elements/EditHomePage";


const DashboardSettings = ({content, userData, contactResultData, homes}) => {
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
                <div className={(activeSettingsTab == 'EditUser') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('EditUser')}}>
                    Edit My Info
                </div>
            </div>
        )
    }
    const MenuTabs = () => {
        return (
            <div className="col-12 mt-3 float-start" style={{background: '#fff'}}>
                <div className={(activeSettingsTab == 'EditUser') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('EditUser')}}>
                    Edit My Info
                </div>
                <div className={(activeSettingsTab == 'AddDriver') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('AddDriver')}}>
                    Add Driver
                </div>
                <div className={(activeSettingsTab == 'AddUser') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('AddUser')}}>
                    Add User
                </div>
                <div className={(activeSettingsTab == 'AddPage') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('AddPage')}}>
                    Add Page
                </div>
                <div className={(activeSettingsTab == 'AllUsers') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('AllUsers')}}>
                    All Users
                </div>
                <div className={(activeSettingsTab == 'AllPriceRequests') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('AllPriceRequests')}}>
                    All Price Requests
                </div>
                <div className={(activeSettingsTab == 'ContactRequests') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('ContactRequests')}}>
                    Contact Requests
                </div>
                <div className={(activeSettingsTab == 'RequestSettings') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('RequestSettings')}}>
                    Request Settings
                </div>
                <div className={(activeSettingsTab == 'EditHomePage') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('EditHomePage')}}>
                    Edit Home Page
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
                    'EditUser': EditUser,
                    'AddPage': AddPage,    
                    'Branches': Branches,    
                    'AllUsers': AllUsers,
                    'AllPriceRequests': AllPriceRequests,
                    'ContactRequests': ContactRequests,
                    'RequestSettings': RequestSettings,   
                    'EditHomePage': EditHomePage
                });
                setActiveSettingsTab('EditUser');
                setMenuTabs(true);
                setPageIsReady(true);
            }else{
                setComponentsTab({
                    'LoadingSettings': LoadingSettings,
                    'AddCompany': AddCompany,    
                    'EditUser': EditUser,
                    'Branches': Branches    
                });
                setActiveSettingsTab('EditUser');
                setMenuTabs(false);
                setPageIsReady(true);
            }
        })
    },[])
    all = componentsTab;
    
    // The resolved component must begin with a capital letter
    const ChoosedSetting = all[activeSettingsTab];
return (
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
                                {(pageIsReady) ? <ChoosedSetting homes={homes} contactResultData={contactResultData} requests={content} userData={userData} /> : <LoadingSettings />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default DashboardSettings;

export async function getServerSideProps(context) {
    let accessToken = context.req.cookies['accessToken'];
    const customClearanceRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/prices/read', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      }
    });
  
    let resultData = await customClearanceRequest.json();


    const homesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/homes/read', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
      });
    
      let homesResultData = await homesRequest.json();



    const contactRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/contact/read', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
      });
    
      let contactResultData = await contactRequest.json();

    const userRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/readById', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
      });
    
      let userData = await userRequest.json();
    return {
      props:{
        content: resultData,
        homes: homesResultData,
        contactResultData: contactResultData,
        userData: userData
      }
    }
  } 