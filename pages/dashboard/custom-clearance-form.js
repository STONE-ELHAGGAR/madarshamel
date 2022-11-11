import React, { useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Uploader from "../../components/elements/Uploader";
import Image from 'next/image';
import { useRouter } from 'next/router';
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');
const handleInsertCustomClearance = require('./../../handlers/handleInsertCustomClearance');


const CustomClearanceForm = () => {
  const router = useRouter();
  const [logged , setLogged] = useState(false);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      sessionStorage.setItem('files','');
      sessionStorage.setItem('attachedFiles','');
      checkIfLoggedIn()
          .then((result) => {
              if(result){
                setLogged(true);
                console.log('Loggedin');
              }else{
                setLogged(false);
                console.log('Not Loggedin');
                router.push({ pathname: '/page-login' })
              }
          })
  });
  const NotLoggedInComponent = () => {
    return false;
  }
  const LoggedInComponent = () => {
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
                  <label className="mt-20">Choose company name</label>
                  <select name="companyName" className="form-control display-1 companyName">
                    <option value="0">Company Name</option>
                    <option value="1">Company Name</option>
                    <option value="2">Company Name</option>
                  </select>
                  <label className="mt-20">Branch</label>
                  <select name="branch" className="form-control display-1 branch">
                    <option value="0">Branch</option>
                    <option value="1">Branch</option>
                    <option value="2">Branch</option>
                  </select>
                  <label className="mt-20">Transaction Place</label>
                  <select name="transactionPlace" className="form-control display-1 transactionPlace">
                    <option value="0">Transaction Place</option>
                    <option value="1">Transaction Place</option>
                    <option value="2">Transaction Place</option>
                  </select>
                  <label className="mt-20">Shipping Port</label>
                  <select name="shippingPort" className="form-control display-1 shippingPort">
                    <option value="0">Shipping Port</option>
                    <option value="1">Shipping Port</option>
                    <option value="2">Shipping Port</option>
                  </select>
                  <label className="mt-20">Reciving Port</label>
                  <select name="recivingPort" className="form-control display-1 recivingPort">
                    <option value="0">Reciving Port</option>
                    <option value="1">Reciving Port</option>
                    <option value="2">Reciving Port</option>
                  </select>
                  <label className="mt-20">Source Country</label>
                  <select name="sourceCountry" className="form-control display-1 sourceCountry">
                    <option value="0">Source Country</option>
                    <option value="1">Source Country</option>
                    <option value="2">Source Country</option>
                  </select>
                  <label className="mt-20">Expected Ship Date</label>
                  <input type="date" className="form-control display-1 expectedShipDate" name="expectedShipDate" />
                </div>

                <Uploader />

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-4 py-4 float-start">
                  <button className="btn btn-square" onClick={handleInsertCustomClearance}>Submit Request</button>
                </div>

              </div>
            </div>
          </div>
        </div>
    </>
  );
  }
  return (
    <>
      <Layout>
        {((logged) ? <LoggedInComponent /> : <NotLoggedInComponent /> )}
      </Layout>
    </>
  )
}


export default CustomClearanceForm;