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
                  <div className="custom-alert-data"> </div>
                
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">Company Details</h4>
                  <label className="mt-20">Company Name</label>
                  <input type="text" className="form-control display-1 companyName" name="companyName" id="companyName" placeholder="Company Name" />
                  <label className="mt-20">Company Mobile</label>
                  <input type="text" className="form-control display-1 companyMobile" name="companyMobile" id="companyMobile" placeholder="Company Mobile" />
                  <label className="mt-20">Company Address</label>
                  <input type="text" className="form-control display-1 companyAddress" name="companyAddress" id="companyAddress" placeholder="Company Address" />
                  <label className="mt-20">Postal Code</label>
                  <input type="text" className="form-control display-1 postalCode" name="postalCode" id="postalCode" placeholder="Postal Code" />
                  <label className="mt-20">Fax</label>
                  <input type="text" className="form-control display-1 fax" name="fax" id="fax" placeholder="Fax (Optional)" />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">Commercial Registration Info.</h4>
                  <label className="mt-20">Commercial Registration No</label>
                  <input type="text" className="form-control display-1 commercialRegistrationNo" name="commercialRegistrationNo" id="commercialRegistrationNo" placeholder="Commercial Registration No" />
                  <label className="mt-20">Commercial Registration Date</label>
                  <input type="text" className="form-control display-1 commercialRegistrationDate" name="commercialRegistrationDate" id="commercialRegistrationDate" placeholder="Commercial Registration Date" />
                  <label className="mt-20">Commercial Registration City</label>
                  <input type="text" className="form-control display-1 commercialRegistrationCity" name="commercialRegistrationCity" id="commercialRegistrationCity" placeholder="Commercial Registration City" />
                  <label className="mt-20">Chamber of Commerce Number</label>
                  <input type="text" className="form-control display-1 chamberOfCommerceNumber" name="chamberOfCommerceNumber" id="chamberOfCommerceNumber" placeholder="Chamber of Commerce Number" />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">Request Details</h4>
                  <label className="mt-20">Transaction Place</label>
                  <input type="text" className="form-control display-1 transactionPlace" name="transactionPlace" id="transactionPlace" placeholder="Transaction Place" />
                  <label className="mt-20">Reciving Port</label>
                  <input type="text" className="form-control display-1 recivingPort" name="recivingPort" id="recivingPort" placeholder="Reciving Port" />
                  <label className="mt-20">Shipping Port</label>
                  <input type="text" className="form-control display-1 shippingPort" name="shippingPort" id="shippingPort" placeholder="Shipping Port" />
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