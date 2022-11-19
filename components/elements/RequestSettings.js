/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";


const handleReadSettings = async (e) => {
    if (typeof window !== 'undefined') {
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const requestBody = {
        belongsTo: 0
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
            let belongsTo = document.getElementById('belongsTo');
            let newOptions = '<option value="0">Not Belongs</option>';
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


const handleSaveSetting = async (e) => {
  e.preventDefault();
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  let content = document.getElementById('content').value;
  let field = document.getElementById('field').value;
  let belongsTo = document.getElementById('belongsTo').value;
  const requestBody = {
      content: content,
      field: field,
      belongsTo: belongsTo
    };
    const settingsRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/settings/create', {
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
      document.getElementById('content').value = '';
      document.getElementById('field').value = '';
      document.getElementById('belongsTo').value = 0;
      handleReadSettings();
      console.log(contentReq.setting)
    }else{
      console.log(contentReq)
    }
}

function Settings() {


    useEffect(() => {
        handleReadSettings()
    },[])

    return (
        <>
            <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                <div className="container px-3 py-3" style={{background: '#fff'}}>
                    <label>Content</label>
                    <input type="text" className="form-control" placeholder="Content" id="content" />
                    <label>Field</label>
                    <input type="text" className="form-control" placeholder="Field" id="field" />
                    <label>Belongs To</label>
                    <select style={{width: '100%'}} className="px-3 py-3" name="belongsTo" id="belongsTo">
                        <option value="0">Not Belongs</option>
                    </select><br />
                    <button type="submit" onClick={handleSaveSetting} className="btn btn-square mt-3">Add</button>
                </div>
            </div>
        </>
    )
}
export default Settings;