/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
const handleResetPassword = require("./../../handlers/handleResetPassword");


const handleEditUser = async () => {
  const name = document.querySelector(".name").value;
  const mobile = document.querySelector(".mobile").value;
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const EditUserRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/updateMySelf', {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': accessToken
  },
  body: JSON.stringify({name: name, mobile: mobile})
  });
  const content = await EditUserRequest.json();
  if(content.success) {
    const userData = JSON.parse(sessionStorage.getItem('loginData'));
    userData.data.name = name;
    sessionStorage.setItem('loginData', JSON.stringify(userData));
    document.querySelector(".alert-data").innerHTML = '<div class="alert alert-success" role="alert">Edited Successfully</div>';
    location.reload();
    return false;
  }else{
      document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again later.</div>';
  }
}

function EditUser({userData}) {
    const [userName, setUserName] = useState(userData.users[0].name);
    const [userMobile, setUserMobile] = useState(userData.users[0].mobile);
    const onTodoChange = (value, input) => {
        if(input == 'name'){
            setUserName(value)
        }
        if(input == 'mobile'){
            setUserMobile(value)
        }
        
    }
    return (
        <>
            <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                <div className="container px-3 py-3" style={{background: '#fff'}}>
                    <div className="box-form-signup">
                    <div className="alert-data">
                                
                    </div>
                    <div className="form-group"><input className="form-control name" type="text" value={userName} onChange={e => onTodoChange(e.target.value,'name')} placeholder="Your name *" />
                    </div>
                    {/*<div className="form-group"><input className="form-control debtLimit" type="text" placeholder="Debt Limit" /></div>*/}
                    <div className="form-group"><input className="form-control mobile" value={userMobile} onChange={e => onTodoChange(e.target.value,'mobile')} type="text" placeholder="+966 55 555 5555" /></div>
                    {/*<div className="form-group"><input className="form-control email" type="email" placeholder="user@example.com" /></div>*/}
                    {/*<div className="form-group"><input className="form-control password" type="password" placeholder="**********" /></div>*/}
                    <div className="form-group mt-10"><button onClick={handleEditUser} className="btn btn-square text-heading-6">Save</button></div>
                    </div>
                </div>
                <div className="container px-3 py-3 mt-3" style={{background: '#fff'}}>
                    <div id="alert-section"></div>
                    <div className="form-group mt-10"><button onClick={(e) => {handleResetPassword(e, userData.users[0].email)}} className="btn btn-square text-heading-6">Change Password</button></div>
                </div>
            </div>
        </>
    )
}
export default EditUser;