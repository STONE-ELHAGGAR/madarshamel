import React, { useEffect, useState } from 'react';

const handleReadCompanies = async (fieldDataVar) => {
  if (typeof window !== 'undefined') {
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const requestBody = {};
    const companiesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/company/read', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      },
      body: JSON.stringify(requestBody)
      });
    const contentReq = await companiesRequest.json();
    let companyNameSelect = document.getElementById('companyName');
    let newOptions = '';
    if(contentReq.success){
      if(contentReq.companies.length > 0){
        contentReq.companies.map((option) => {
            newOptions += '<option value="'+option._id+'">'+option.companyName+' - '+option.companyMobile+'</option>';
        })
        if(companyNameSelect){
          companyNameSelect.innerHTML = newOptions
          companyNameSelect.value = contentReq.companies[0]._id;
          countryChanged();
        }
    }
    }else{
      console.log(contentReq)
    }
  }
}

const handleReadBranches = async (c_id) => {
  if (typeof window !== 'undefined') {
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const requestBody = {
    belongsTo: c_id
  };
    const branchesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/branches/read', {
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
      let belongsTo = document.getElementById('branch');
      let newOptions = '';
      if(contentReq.branches.length > 0){
          contentReq.branches.map((option) => {
              newOptions += '<option value="'+option._id+'">'+option.name+' - '+option.address+'</option>';
          })
          if(belongsTo){belongsTo.innerHTML = newOptions}
      }else{
        belongsTo.innerHTML = '';
      }
    }else{
      belongsTo.innerHTML = '';
      console.log(contentReq)
    }
  }
}

const countryChanged = async () => {
  let currentCountry = document.getElementById('companyName');
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const requestBody = {
    id: currentCountry.value
  };
    const companiesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/company/readById', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      },
      body: JSON.stringify(requestBody)
      });
    const contentReq = await companiesRequest.json();
    if(contentReq.success){
      handleReadBranches(contentReq.companies[0]._id);
    }else{
      console.log(contentReq);
    }
}
const CompanySelector = ({field}) => {
    
    useEffect(() => {
      handleReadCompanies();
    },[])
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start">
        <label className="mt-20">Company Name</label>
        <select onChange={countryChanged} id="companyName" style={{width: '100%'}}  name="companyName" className="form-control display-1 companyName">
        </select>
        <label className="mt-20">Branch</label>
        <select id="branch" style={{width: '100%'}}  name="branch" className="form-control display-1 branch">
        </select>
      </div>
    )
};

export default CompanySelector;