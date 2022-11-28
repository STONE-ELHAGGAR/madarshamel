/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";


const handleSavePage = async (e) => {
  e.preventDefault();
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  const requestBody = {
      title: title,
      description: description
    };
    const pageRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/pages/create', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      },
      body: JSON.stringify(requestBody)
      });
    const contentReq = await pageRequest.json();
    if(contentReq.success){
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.getElementById('alert-section').innerHTML = '<div class="alert alert-success" role="alert">Added Succesfully.</div>';
    }else{
      document.getElementById('alert-section').innerHTML = '<div class="alert alert-danger" role="alert">Something Went Wrong.</div>';
      console.log(contentReq)
    }
}

function page() {

    return (
        <>
            <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                <div className="container px-3 py-3" style={{background: '#fff'}}>
                    <div id="alert-section"></div>
                    <label>Title</label>
                    <input type="text" className="form-control" placeholder="Title" id="title" />
                    <label>Description</label>
                    <textarea className="form-control" placeholder="Description" id="description"></textarea>
                    <button type="submit" onClick={handleSavePage} className="btn btn-square mt-3">Add</button>
                </div>
            </div>
        </>
    )
}
export default page;