import React, { useEffect, useState } from 'react';

const handleReadDrivers = async (fieldDataVar) => {
  if (typeof window !== 'undefined') {
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const requestBody = {};
    const driversRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/driver/read', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      },
      body: JSON.stringify(requestBody)
      });
    const contentReq = await driversRequest.json();
    let driverNameSelect = document.getElementById('drivers');
    let newOptions = '';
    if(contentReq.success){
      if(contentReq.drivers.length > 0){
        contentReq.drivers.map((option) => {
            newOptions += '<option value="'+option._id+'">'+option.name+' --- Mobile: '+option.mobile+' --- NID: '+option.nid+'</option>';
        })
        if(driverNameSelect){
          driverNameSelect.innerHTML = newOptions
          driverNameSelect.value = contentReq.drivers[0]._id;
        }
    }
    }else{
      console.log(contentReq)
    }
  }
}

const DriverSelector = ({field}) => {
    
    useEffect(() => {
      handleReadDrivers();
    },[])
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start">
        <label className="mt-20">Driver</label>
        <select id="drivers" style={{width: '100%'}}  name="drivers" className="form-control display-1 drivers">
        </select>
      </div>
    )
};

export default DriverSelector;