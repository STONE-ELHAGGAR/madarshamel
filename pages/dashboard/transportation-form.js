import React, { useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import Uploader from "../../components/elements/Uploader";
import Image from 'next/image';
import { useRouter } from 'next/router';
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');
const handleInsertTransportation = require('./../../handlers/handleInsertTransportation');

const Transportation = () => {
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
              <form action="#">
                <h3 className="text-center">Transportation Request</h3>
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
                  <select className="form-control display-1 branch" name="branch">
                    <option value="0">Branch</option>
                    <option value="1">Branch</option>
                    <option value="2">Branch</option>
                  </select>
                  <label className="mt-20">Transaction Place</label>
                  <select className="form-control display-1 transactionPlace" name="transactionPlace">
                    <option value="0">Transaction Place</option>
                    <option value="1">Transaction Place</option>
                    <option value="2">Transaction Place</option>
                  </select>
                  <label className="mt-20">FROM</label>
                  <select className="form-control display-1 fromDate" name="fromDate">
                    <option value="0">FROM</option>
                    <option value="1">FROM</option>
                    <option value="2">FROM</option>
                  </select>
                  <label className="mt-20">To</label>
                  <select className="form-control display-1 toDate" name="toDate">
                    <option value="0">To</option>
                    <option value="1">To</option>
                    <option value="2">To</option>
                  </select>
                  <label className="mt-20">Source Country</label>
                  <select className="form-control display-1 sourceCountry" name="sourceCountry">
                    <option value="0">Source Country</option>
                    <option value="1">Source Country</option>
                    <option value="2">Source Country</option>
                  </select>
                  <label className="mt-20">Drivers</label>
                  <select className="form-control display-1 drivers" name="drivers">
                    <option value="0">Driver</option>
                    <option value="1">Driver</option>
                    <option value="2">Driver</option>
                  </select>
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
                
                <Uploader />

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-4 py-4 float-start">
                  <button className="btn btn-square" onClick={handleInsertTransportation}>Submit Request</button>
                </div>

              </form>
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


export default Transportation;