import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleAllUsers = require('./../../handlers/handleAllUsers');
const handleResetPassword = require("./../../handlers/handleResetPassword");

const handleEditUser = async (e, id) => {
  e.preventDefault();
  let checkedElements = document.querySelectorAll('.messageCheckbox:checked');
  let checkedElementsArray = [];
  checkedElements.forEach( el => {
    checkedElementsArray.push(el.value);
  });
  const name = document.querySelector(".name").value;
  const email = document.querySelector(".email").value;
  const mobile = document.querySelector(".mobile").value;
  const debtLimit = document.querySelector(".debtLimit").value;
  const creds = JSON.stringify(checkedElementsArray);
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const EditUserRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/updateUser', {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': accessToken
  },
  body: JSON.stringify({id: id, name: name, mobile: mobile, email: email, debtLimit: debtLimit, creds: creds})
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
const EditUserByAdmin = ({userData, userNameData, userEmailData, userMobileData, userDebtLimit, userCredsData}) => {
    const [choosedUser, setChoosedUser] = useState('');
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userCreds, setUserCreds] = useState([]);
    const [debtLimit, setdebtLimit] = useState('');
    useEffect(() => {
        setChoosedUser(userData);
        setUserName(userNameData);
        setUserMobile(userMobileData);
        setUserEmail(userEmailData);
        setUserCreds(JSON.parse(userCredsData));
        (userDebtLimit) ? setdebtLimit(userDebtLimit) : setdebtLimit('');
    },[userData,userNameData,userEmailData,userDebtLimit,userCredsData])
    const onTodoChange = (value, input) => {
        if(input == 'name'){
            setUserName(value)
        }
        if(input == 'mobile'){
            setUserMobile(value)
        }
        if(input == 'email'){
            setUserEmail(value)
        }
        if(input == 'debtLimit'){
            setdebtLimit(value)
        }
    }
return (
    <>
        <div className="col-12 px-3 py-3 mt-3 mb-3 float-start" style={{background: 'rgb(255, 255, 255)',maxWidth: '100%',border: '3px solid #333'}}>
            <div className="container px-3 py-3" style={{background: '#fff'}}>
                <div className="box-form-signup">
                <div className="alert-data">
                            
                </div>
                <div className="form-group"><input className="form-control name" type="text" value={userName} onChange={e => onTodoChange(e.target.value,'name')} placeholder="Your name *" />
                </div>
                {/*<div className="form-group"><input className="form-control debtLimit" type="text" placeholder="Debt Limit" /></div>*/}
                <div className="form-group"><input className="form-control mobile" value={userMobile} onChange={e => onTodoChange(e.target.value,'mobile')} type="text" placeholder="+966 55 555 5555" /></div>
                <div className="form-group"><input className="form-control debtLimit" value={debtLimit} onChange={e => onTodoChange(e.target.value,'debtLimit')} type="text" placeholder="Debt Limit" /></div>
                <div className="form-group"><input className="form-control email" value={userEmail} onChange={e => onTodoChange(e.target.value,'email')} type="text" placeholder="abcd@xyz.com" /></div>
                {/*<div className="form-group"><input className="form-control email" type="email" placeholder="user@example.com" /></div>*/}
                {/*<div className="form-group"><input className="form-control password" type="password" placeholder="**********" /></div>*/}
                <p>
                <h5 className="float-start">Current user Permisions: {userCreds.join(' and ')}</h5>
                </p>
                <p>
                <input className="messageCheckbox" id="super-admin" type="checkbox" value="super-admin" name="userCreds[]" />
                <label htmlFor="super-admin">Super Admin</label>
                </p>
                <p>
                <input className="messageCheckbox" id="custom-clearance" type="checkbox" value="custom-clearance" name="userCreds[]" />
                <label htmlFor="custom-clearance">Custom Clearance</label>
                </p>
                <p>
                <input className="messageCheckbox" id="transportation" type="checkbox" value="transportation" name="userCreds[]" />
                <label htmlFor="transportation">Transportation</label>
                </p>
                <p>
                <input className="messageCheckbox" id="live-chat" type="checkbox" value="live-chat" name="userCreds[]" />
                <label htmlFor="live-chat">Live Chat</label>
                </p>
                <p>
                <input className="messageCheckbox" id="original-user" type="checkbox" value="original-user" name="userCreds[]" />
                <label htmlFor="original-user">Original User</label>
                </p>
                <div className="form-group mt-10"><button onClick={(e) => {handleEditUser(e,choosedUser)}} className="btn btn-square text-heading-6">Save</button></div>
                </div>
            </div>
            <div className="container px-3 py-3 mt-3" style={{background: '#fff'}}>
                <div id="alert-section"></div>
                <div className="form-group mt-10"><button onClick={(e) => {handleResetPassword(e, userData.users[0]._id)}} className="btn btn-square text-heading-6">Change Password</button></div>
            </div>
        </div>
    </>
    );
}

export default EditUserByAdmin;