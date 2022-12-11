/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
const handleResetPassword = require("./../../handlers/handleResetPassword");
import {JsonEditor} from "react-jsondata-editor";

const changeLang = async (activeLang) => {
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const langRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/files/readLangFiles', {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': accessToken
  },
  body: JSON.stringify({lang: activeLang})
  });
  const content = await langRequest.json();
  if(content.success) {
    return content.langFiles;
  }else{
      document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again later.</div>';
  }
}
const changeFileReq = async (activeLang, activeFile) => {
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const langRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/files/readLang', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': accessToken
    },
    body: JSON.stringify({lang: activeLang, file: activeFile})
    });
    const content = await langRequest.json();
    if(content.success) {
      return content.singleFileData;
    }else{
        document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again later.</div>';
    }
  }
function Translations({langsData}) {
    const [activeLang, setActiveLang] = useState(langsData[0]);
    const [activeLangFiles, setActiveLangFiles] = useState([]);
    const [activeLangFileData, setActiveLangFileData] = useState('');
    const [activeFile, setActiveFile] = useState('');
    const changeActiveLang = (e) => {
        setActiveLang(e.target.value);
    }
    const changeCurrentFile = (e) => {
        setActiveFile(e.target.value);
    }
    const handleChangeFileData = async (activeLang, fileData, file) => {
        const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
        const langRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/files/editLang', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify({lang: activeLang, fileData: fileData, file: file})
        });
        const content = await langRequest.json();
        if(content.success) {
            document.querySelector(".alert-data").innerHTML = '<div class="alert alert-success" role="alert">Changed Succesfully.</div>';
        }else{
            document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again later.</div>';
        }
    }
    useEffect(() => {
        if(activeLang != ''){
            changeLang(activeLang).then((langFiles) => {
                setActiveLangFiles(langFiles);
            });
            changeFileReq(activeLang,activeFile).then((langFile) => {
                setActiveLangFileData(JSON.stringify(langFile));
            });
        }
    },[activeLang])
    useEffect(() => {
        if(activeFile != ''){
            changeFileReq(activeLang,activeFile).then((langFile) => {
                setActiveLangFileData(JSON.stringify(langFile));
            });
        }
    },[activeFile])
    return (
        <>
            <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                <div className="container px-3 py-3" style={{background: '#fff'}}>
                    
                    <ul className="nav nav-pills nav-fill">
                        {langsData.map((lang , i) => {
                            return (
                                <div className="col-3" key={i}>
                                    <input type="submit" onClick={(e) => {changeActiveLang(e)}} value={lang} className={(activeLang == lang) ? "btn btn-square mx-2 my-2 active" : "btn btn-square mx-2" } />
                                </div>
                            )
                        })}
                    </ul>
                    <div className="col-12 px-2 py-2">
                        <h5>Files of "{activeLang}" Language</h5>
                        {activeLangFiles.map((langFile, i) => {
                            return (
                                <div className="col-3" key={i}>
                                    <input type="submit" value={langFile.replace('.json','')} onClick={(e) => {changeCurrentFile(e)}} className={(activeFile == langFile.replace('.json','')) ? "col-3 btn btn-square mx-2 my-2 active" : "col-3 btn btn-square mx-2 my-2" } />
                                </div>
                            )
                        })}
                    </div>
                    <div className="alert-data">
                                
                    </div>
                    <div style={{ height : "500px",  width: "100%", border: "solid 1px #dddddd"}}>
                        <JsonEditor jsonObject={activeLangFileData} onChange={(output)=>{handleChangeFileData(activeLang, output, activeFile)}}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Translations;