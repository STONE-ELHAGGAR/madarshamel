import React, { useEffect, useState } from 'react';
//import Uploader from "../../components/elements/Uploader";
import Image from 'next/image';
const handleInsertTransportation = require('./../../handlers/handleInsertTransportation');
import SettingSelector from "./SettingSelector";
import CompanySelector from "./CompanySelector";
import DriverSelector from "./DriverSelector";

const Transportation = () => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      sessionStorage.setItem('files','');
      sessionStorage.setItem('attachedFiles','');
  });
  return (
    <>
        <div className="container-fluid backgrounded-con float-start px-3 py-3">
          <div className="container">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 float-start">
              <form action="#">
                <h3 className="text-center">Transportation Request</h3>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">Request Details</h4>
                  <div className="custom-alert-data"> </div>
                  <label className="mt-20">Company Name</label>
                  <input type="text" className="form-control display-1 companyName" name="companyName" id="companyName" placeholder="Company Name" />
                  <label className="mt-20">Company Mobile</label>
                  <input type="text" className="form-control display-1 companyMobile" name="companyMobile" id="companyMobile" placeholder="Company Mobile" />
                  <label className="mt-20">Company Address</label>
                  <input type="text" className="form-control display-1 companyAddress" name="companyAddress" id="companyAddress" placeholder="Company Address" />
                  <label className="mt-20">Transaction Place</label>
                  <input type="text" className="form-control display-1 transactionPlace" name="transactionPlace" id="transactionPlace" placeholder="Transaction Place" />
                  <label className="mt-20">From</label>
                  <input type="text" className="form-control display-1 fromDate" name="fromDate" id="fromDate" placeholder="From" />
                  <label className="mt-20">To</label>
                  <input type="text" className="form-control display-1 toDate" name="toDate" id="toDate" placeholder="To" />
                  <SettingSelector field="sourceCountry" />
                  <DriverSelector />
                  <label className="mt-20">Expected Ship Date</label>
                  <input type="date" className="form-control display-1 expectedShipDate" name="expectedShipDate" />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start">
                    <h4 className="text-center">Other Details</h4>
                    <label className="mt-20">Car Cost</label>
                    <input className="form-control mt-20 display-1 carCost" name="carCost" placeholder="Car Cost" />
                    <label className="mt-20">Transfer Data</label>
                    <input className="form-control display-1 transferData" type="date" name="transferData" placeholder="Transfer Data" />
                  </div>
                </div>
                
                {/*<Uploader />*/}

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-4 py-4 float-start">
                  <button className="btn btn-square" onClick={handleInsertTransportation}>Submit Request</button>
                </div>

              </form>
            </div>
          </div>
        </div>
    </>
  )
}


export default Transportation;