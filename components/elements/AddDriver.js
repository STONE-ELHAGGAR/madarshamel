/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";


const handleSaveDriver = async (e) => {
  e.preventDefault();
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  let name = document.getElementById('name').value;
  let mobile = document.getElementById('mobile').value;
  let truck = document.getElementById('truck').value;
  let nid = document.getElementById('nid').value;
  const requestBody = {
      name: name,
      mobile: mobile,
      truck: truck,
      nid: nid
    };
    const driverRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/driver/create', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      },
      body: JSON.stringify(requestBody)
      });
    const contentReq = await driverRequest.json();
    if(contentReq.success){
      document.getElementById('name').value = '';
      document.getElementById('mobile').value = '';
      document.getElementById('truck').value = '';
      document.getElementById('nid').value = '';
    }else{
      console.log(contentReq)
    }
}

function Driver() {

    return (
        <>
            <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                <div className="container px-3 py-3" style={{background: '#fff'}}>
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" id="name" />
                    <label>Mobile</label>
                    <input type="text" className="form-control" placeholder="Mobile" id="mobile" />
                    <label>Truck</label>
                    <input type="text" className="form-control" placeholder="Truck" id="truck" />
                    <label>National ID</label>
                    <input type="text" className="form-control" placeholder="National ID" id="nid" />
                    <button type="submit" onClick={handleSaveDriver} className="btn btn-square mt-3">Add</button>
                </div>
            </div>
        </>
    )
}
export default Driver;