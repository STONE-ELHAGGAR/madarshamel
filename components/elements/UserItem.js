import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import EditUserByAdmin from "./EditUserByAdmin";

const UserItem = ({content}) => {
    let userCreds = '';
    let allItems = '';
    const [userData, setUserData] = useState('');
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userDebtLimit, setUserDebtLimit] = useState('');
    const [userCredsData, setUserCredsData] = useState('');
    const handleChangeUser = (id, name, email, debtLimit, mobile, creds, e) => {
        setUserData(id);
        setUserName(name);
        setUserMobile(mobile);
        setUserEmail(email);
        setUserDebtLimit(debtLimit);
        setUserCredsData(creds);
        console.log(id, name, email, debtLimit, e)
    }
    if(content.users?.length > 0){
        allItems = content.users?.map((user) => {
            
                userCreds = JSON.parse(user.creds).join(',');
            return(
                <>
                    <tr>
                        <th scope="row">{user._id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{userCreds}</td>
                        <td>
                            <button onClick={(e) => {handleChangeUser(user._id, user.name, user.email, user.debtLimit, user.mobile, user.creds, e)}} className="btn btn-square">
                                <i className="fi fi-rr-edit"></i> Edit
                            </button>
                        </td>
                    </tr>
                </>
            )
        })
    }
    return (
        <>
            <div className="col-12 float-start"><button onClick={(e) => {setUserData('')}} className="btn btn-square float-start text-heading-6">X Close User Editor</button><br /></div>
            {(userData !== '') ? <EditUserByAdmin userData={userData} userNameData={userName} userEmailData={userEmail} userMobileData={userMobile} userCredsData={userCredsData} userDebtLimit={userDebtLimit} /> : <h5>Please choose user to edit</h5>}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Permisions</th>
                    <th scope="col">Edit</th>
                </tr>
                </thead>
                <tbody>
                    {allItems}
                </tbody>
            </table>
        </>
    );
}

export default UserItem;