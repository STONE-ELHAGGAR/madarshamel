import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../components/layout/Layout";
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');

import MyTransactions from "./../../components/elements/MyTransactions";
import Bank from "./../../components/elements/Bank";


const dashboardSettings = ({userData, transactionsData}) => {
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
                <div className={(activeSettingsTab == 'MyTransactions') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('MyTransactions')}}>
                    My Transactions
                </div>
            </div>
        )
    }
    const MenuTabs = () => {
        return (
            <div className="col-12 mt-3 float-start" style={{background: '#fff'}}>
                <div className={(activeSettingsTab == 'Bank') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('Bank')}}>
                    Bank
                </div>
                <div className={(activeSettingsTab == 'MyTransactions') ? "settingsTab activeSettingsTab" : "settingsTab" }
                    onClick={() => {setActiveSettingsTab('MyTransactions')}}>
                    My Transactions
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
                    'MyTransactions': MyTransactions,
                    'Bank': Bank
                });
                setActiveSettingsTab('Bank');
                setMenuTabs(true);
                setPageIsReady(true);
            }else{
                setComponentsTab({
                    'LoadingSettings': LoadingSettings,
                    'MyTransactions': MyTransactions 
                });
                setActiveSettingsTab('MyTransactions');
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
                            <h5>Bank</h5>
                            {(menuTabs) ? <MenuTabs /> : <MenuTabsOriginal />}
                        </div>
                        <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                {(pageIsReady) ? <ChoosedSetting requests={transactionsData} choosedUserData={userData.users[0]._id} userData={userData} /> : <LoadingSettings />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default dashboardSettings;

export async function getServerSideProps(context) {
    let accessToken = context.req.cookies['accessToken'];

    const userRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/readById', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
      });
    
    let userData = await userRequest.json();

    const transactionsRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/transactions/readAll', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
      });
    
      let transactionsData = await transactionsRequest.json();
      
    return {
      props:{
        userData: userData,
        transactionsData: transactionsData
      }
    }
  } 