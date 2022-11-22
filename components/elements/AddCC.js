import React, { useEffect, useState } from 'react';
//import Uploader from "../../components/elements/Uploader";
import SettingSelector from "./SettingSelector";
import CompanySelector from "./CompanySelector";
import Image from 'next/image';
const handleInsertCustomClearance = require('./../../handlers/handleInsertCustomClearance');

const CustomClearanceForm = ({settingsTab}) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      sessionStorage.setItem('files','');
      sessionStorage.setItem('attachedFiles','');
  });
  if(settingsTab){
  return (
    <>
        <div className="container-fluid backgrounded-con float-start px-3 py-3">
          <div className="container">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 float-start">
              <div>
                <h3 className="text-center">Custom Clearance Request</h3>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">Request Details</h4>
                  <div className="custom-alert-data"> </div>
                  <CompanySelector />
                  <SettingSelector field="transactionPlace" />
                  <SettingSelector field="shippingPort" />
                  <SettingSelector field="recivingPort" />
                  <SettingSelector field="sourceCountry" />
                  <label className="mt-20">Expected Ship Date</label>
                  <input type="date" className="form-control display-1 expectedShipDate" name="expectedShipDate" />
                </div>

                {/*<Uploader />*/}

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-4 py-4 float-start">
                  <button className="btn btn-square" onClick={handleInsertCustomClearance}>Submit Request</button>
                </div>

              </div>
            </div>
          </div>
        </div>
    </>
  )
  }else{
    return (
        <>
            <h3>Loading ....</h3>
        </>
    )
  }
}


export default CustomClearanceForm;