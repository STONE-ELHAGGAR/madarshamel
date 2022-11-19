/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";



const handleReadBranches = async (e) => {
    if (typeof window !== 'undefined') {
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const requestBody = {};
      const branchesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/company/read', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(requestBody)
        });
      const contentReq = await branchesRequest.json();
      if(contentReq.success){
        if(contentReq.companies.length > 0){
            let belongsTo = document.getElementById('belongsTo');
            let newOptions = '<option value="0">Not Belongs</option>';
            contentReq.companies.map((option) => {
                newOptions += '<option value="'+option._id+'">'+option.companyName+' - '+option.companyMobile+'</option>';
            })
            if(belongsTo){belongsTo.innerHTML = newOptions}
        }
      }else{
        console.log(contentReq)
      }
    }
}


const handleSaveSetting = async (e) => {
  e.preventDefault();
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  let name = document.getElementById('name').value;
  let address = document.getElementById('address').value;
  let belongsTo = document.getElementById('belongsTo').value;
  const requestBody = {
      name: name,
      address: address,
      belongsTo: belongsTo
    };
    const branchesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/branches/create', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      },
      body: JSON.stringify(requestBody)
      });
    const contentReq = await branchesRequest.json();
    if(contentReq.success){
      document.getElementById('name').value = '';
      document.getElementById('address').value = '';
      document.getElementById('belongsTo').value = 0;
      handleReadBranches();
      console.log(contentReq.setting)
    }else{
      console.log(contentReq)
    }
}

function Branches() {


    useEffect(() => {
        handleReadBranches()
    },[])

    return (
        <>
            <Layout userCreds={['super-admin']} params={[]} modelName='' forNewUsers={0}>
                <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                    <div className="container px-3 py-3" style={{background: '#fff'}}>
                        <label>Branch Name</label>
                        <input type="text" className="form-control" placeholder="Branch Name" id="name" />
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Address" id="address" />
                        <label>Belongs To</label>
                        <select style={{width: '100%'}} className="px-3 py-3" name="belongsTo" id="belongsTo">
                            <option value="0">Not Belongs</option>
                        </select><br />
                        <button type="submit" onClick={handleSaveSetting} className="btn btn-square mt-3">Add</button>
                    </div>
                </div>
            </Layout>

        </>
    )
}
export default Branches;