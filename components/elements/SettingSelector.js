import React, { useEffect, useState } from 'react';

const handleReadSettings = async (belonger,fieldDataVar2) => {
  if (typeof window !== 'undefined') {
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const requestBody = {
      belongsTo: belonger
    };
    const settingsRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/settings/read', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      },
      body: JSON.stringify(requestBody)
      });
    const contentReq = await settingsRequest.json();
    if(contentReq.success){
      if(contentReq.settings.length > 0){
          let belongsTo = document.getElementById(fieldDataVar2);
          let newOptions = '';
          contentReq.settings.map((option) => {
              newOptions += '<option value="'+option._id+'">'+option.content+'</option>';
          })
          if(belongsTo){belongsTo.innerHTML = newOptions}
      }
    }else{
      console.log(contentReq)
    }
  }
}
const handleReadSettingByField = async (fieldDataVar) => {
  if (typeof window !== 'undefined') {
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const requestBody = {
        field: fieldDataVar
      };
      const settingsRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/settings/readByField', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(requestBody)
        });
      const contentReq = await settingsRequest.json();
      if(contentReq.success){
        document.getElementById('belongerLabel-'+fieldDataVar).innerHTML = contentReq.settings[0].content;
        handleReadSettings(contentReq.settings[0]._id,fieldDataVar)
      }else{
        console.log(contentReq);
      }
    }
}
const SettingSelector = ({field}) => {
    const [fieldData, setFieldData] = useState(field);
    useEffect(() => {
      handleReadSettingByField(fieldData);
    },[fieldData])
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start">
        <label id={((fieldData) ? "belongerLabel-"+fieldData : "" )} className="mt-20"></label>
        <select name={fieldData} id={fieldData} style={{width: '100%'}} className={((fieldData) ? "px-3 py-3 "+fieldData : "px-3 py-3" )}>
        </select>
      </div>
    )
};

export default SettingSelector;