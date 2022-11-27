import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../components/layout/Layout";

import AddCC from "./../../components/elements/AddCC";
import CCRequests from "./../../components/elements/CCRequests";


const controlRequests = ({content}) => {
    const [activeSettingsTab , setActiveSettingsTab] = useState('AddCC');
    
    const all = {
        'AddCC': AddCC,
        'CCRequests': CCRequests
    };
    // The resolved component must begin with a capital letter
    const ChoosedSetting = all[activeSettingsTab];
return (
        <Layout userCreds={['original-user','custom-clearance','super-admin']} params={[]} modelName='' forNewUsers={0}>
            <div className="container-fluid backgrounded-con float-start px-3 py-3">
                <div className="container">
                    <div className="col-12 px-3 py-3">
                        <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <h5>Custom Clearance Settings</h5>
                            <div className="col-12 mt-3 float-start" style={{background: '#fff'}}>
                                <div className={(activeSettingsTab == 'AddCC') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('AddCC')}}>
                                    Add Custom Clearance Request
                                </div>
                                <div className={(activeSettingsTab == 'CCRequests') ? "settingsTab activeSettingsTab" : "settingsTab" }
                                    onClick={() => {setActiveSettingsTab('CCRequests')}}>
                                    Custom Clearance Requests
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12 float-start px-2 py-2">
                            <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
                                <ChoosedSetting content={content} settingsTab={activeSettingsTab} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default controlRequests;


export async function getServerSideProps(context) {
    let accessToken = context.req.cookies['accessToken'];
    const customClearanceRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/custom_clearance/readAllRequests', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      }
    });
  
    let resultData = await customClearanceRequest.json();

    return {
      props:{
        content: resultData
      }
    }
  } 