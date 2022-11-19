/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";


const handleRegister = async () => {
  let checkedElements = document.querySelectorAll('.messageCheckbox:checked');
  let checkedElementsArray = [];
  checkedElements.forEach( el => {
    checkedElementsArray.push(el.value);
  });
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  const name = document.querySelector(".name").value;
  const mobile = document.querySelector(".mobile").value;
  const creds = JSON.stringify(checkedElementsArray);
  const registerRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/adminRegister', {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({email: email, password: password, name: name, mobile: mobile, creds: creds})
  });
  const content = await registerRequest.json();
  if(content.success) {
      document.querySelector(".email").value = '';
      document.querySelector(".password").value = '';
      document.querySelector(".name").value = '';
      document.querySelector(".mobile").value = '';
      checkedElements.forEach( el => {
        el.checked = false;
      });
      document.querySelector(".alert-data").innerHTML = '<div class="alert alert-success" role="alert">Registered</div>';
  }else{
      document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again OR use another email</div>';
  }
}

function Register() {

    return (
        <>
            <Layout userCreds={['super-admin']} params={[]} modelName='' forNewUsers={0}>
                <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                    <div className="container px-3 py-3" style={{background: '#fff'}}>
                      <div className="box-form-signup">
                        <div className="alert-data">
                                    
                        </div>
                        <div className="form-group"><input className="form-control name" type="text" placeholder="Your name *" />
                        </div>
                        <div className="form-group"><input className="form-control mobile" type="text" placeholder="+966 55 555 5555" /></div>
                        <div className="form-group"><input className="form-control email" type="email" placeholder="user@example.com" /></div>
                        <div className="form-group"><input className="form-control password" type="password" placeholder="**********" /></div>
                          <p>
                            <input class="messageCheckbox" id="super-admin" type="checkbox" value="super-admin" name="userCreds[]" />
                            <label for="super-admin">Super Admin</label>
                          </p>
                          <p>
                            <input class="messageCheckbox" id="custom-clearance" type="checkbox" value="custom-clearance" name="userCreds[]" />
                            <label for="custom-clearance">Custom Clearance</label>
                          </p>
                          <p>
                            <input class="messageCheckbox" id="transportation" type="checkbox" value="transportation" name="userCreds[]" />
                            <label for="transportation">Transportation</label>
                          </p>
                          <p>
                            <input class="messageCheckbox" id="live-chat" type="checkbox" value="live-chat" name="userCreds[]" />
                            <label for="live-chat">Live Chat</label>
                          </p>
                          <p>
                            <input class="messageCheckbox" id="original-user" type="checkbox" value="original-user" name="userCreds[]" />
                            <label for="original-user">Original User</label>
                          </p>
                        <div className="form-group mt-10"><button onClick={handleRegister} className="btn btn-square text-heading-6">Save</button></div>
                      </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}
export default Register;