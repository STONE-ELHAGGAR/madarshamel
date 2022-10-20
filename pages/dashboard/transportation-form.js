import React from 'react';
import Layout from "../../components/layout/Layout";
import Image from 'next/image';

const Transportation = () => {
  return (
    <>
    <Layout>
        <div className="container-fluid backgrounded-con float-start px-3 py-3">
          <div className="container">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 float-start">
              <form action="#">
                <h3 className="text-center">Transportation Request</h3>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">Request Details</h4>
                  <label className="mt-20">Choose company name</label>
                  <select className="form-control display-1">
                    <option>Company Name</option>
                    <option>Company Name</option>
                    <option>Company Name</option>
                  </select>
                  <label className="mt-20">Branch</label>
                  <select className="form-control display-1">
                    <option>Branch</option>
                    <option>Branch</option>
                    <option>Branch</option>
                  </select>
                  <label className="mt-20">Transaction Place</label>
                  <select className="form-control display-1">
                    <option>Transaction Place</option>
                    <option>Transaction Place</option>
                    <option>Transaction Place</option>
                  </select>
                  <label className="mt-20">FROM</label>
                  <select className="form-control display-1">
                    <option>FROM</option>
                    <option>FROM</option>
                    <option>FROM</option>
                  </select>
                  <label className="mt-20">To</label>
                  <select className="form-control display-1">
                    <option>To</option>
                    <option>To</option>
                    <option>To</option>
                  </select>
                  <label className="mt-20">Source Country</label>
                  <select className="form-control display-1">
                    <option>Source Country</option>
                    <option>Source Country</option>
                    <option>Source Country</option>
                  </select>
                  <label className="mt-20">Drivers</label>
                  <select className="form-control display-1">
                    <option>Driver</option>
                    <option>Driver</option>
                    <option>Driver</option>
                  </select>
                  <label className="mt-20">Expected Ship Date</label>
                  <input type="date" className="form-control display-1" name="meeting-time" />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start">
                    <h4 className="text-center">Other Details</h4>
                    <input className="form-control mt-20 display-1" name="car-cost" placeholder="Car Cost" />
                    <label className="mt-20">Transfer Data</label>
                    <input className="form-control display-1" type="date" name="transfer-data" placeholder="Transfer Data" />
                  </div>
                </div>
                
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start">
                    <h4 className="text-center">Files</h4>
                    <input className="form-control mt-20 display-1" name="main-policy" placeholder="Main Policy" />
                    <input className="form-control mt-20 display-1" name="quantity" placeholder="Quantity" />
                    <input className="form-control mt-20 display-1" name="type" placeholder="Type" />
                    <input className="form-control mt-20 display-1" name="weight" placeholder="Weight" />
                    <input className="form-control mt-20 display-1" name="weight-type" placeholder="Weight Type" />
                    <input className="form-control mt-20 display-1" name="container-size" placeholder="Container Size" />
                    <input className="form-control mt-20 display-1" name="container-temp" placeholder="Container Temprature" />
                    <textarea className="form-control mt-20 display-1" name="details" placeholder="Additional Details"></textarea>
                    <div className="text-center bg-white mt-20 px-5 py-5 drag-and-drop">
                      <i className="fi fi-rr-file" />
                      <p>Drag Your File here OR Click To Choose</p>
                    </div>
                    <br />
                    <button className="btn btn-square">Add</button>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-2 py-2 float-start tableCon">
                    <table className="table table-bordered col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Main Policy</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Type</th>
                          <th scope="col">Weight</th>
                          <th scope="col">Weight Type</th>
                          <th scope="col">Container Size</th>
                          <th scope="col">Container Temprature</th>
                          <th scope="col">Additional Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>data</td>
                          <td>data</td>
                          <td>data</td>
                          <td>data</td>
                          <td>data</td>
                          <td>data</td>
                          <td>data</td>
                          <td>data</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-4 py-4 float-start">
                  <button className="btn btn-square">Submit Request</button>
                </div>

              </form>
            </div>
          </div>
        </div>
    </Layout>
  </>
  );
}


export default Transportation;