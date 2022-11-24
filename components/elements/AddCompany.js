/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";


const handleSaveCompany = async (e) => {
  e.preventDefault();
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  let companyName = document.getElementById('companyName').value;
  let companyMobile = document.getElementById('companyMobile').value;
  const requestBody = {
      companyName: companyName,
      companyMobile: companyMobile
    };
    const companyRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/company/create', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      },
      body: JSON.stringify(requestBody)
      });
    const contentReq = await companyRequest.json();
    if(contentReq.success){
      document.getElementById('companyName').value = '';
      document.getElementById('companyMobile').value = '';
      document.getElementById('alert-section').innerHTML = '<div class="alert alert-success" role="alert">Added Succesfully.</div>';
    }else{
      document.getElementById('alert-section').innerHTML = '<div class="alert alert-danger" role="alert">Something Went Wrong.</div>';
      console.log(contentReq)
    }
}

function Company() {

    return (
        <>
            <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                <div className="container px-3 py-3" style={{background: '#fff'}}>
                    <div id="alert-section"></div>
                    <label>Company Name</label>
                    <input type="text" className="form-control" placeholder="Company Name" id="companyName" />
                    <label>Company Mobile</label>
                    <input type="text" className="form-control" placeholder="Company Mobile" id="companyMobile" />
                    <button type="submit" onClick={handleSaveCompany} className="btn btn-square mt-3">Add</button>
                </div>
            </div>
        </>
    )
}
export default Company;