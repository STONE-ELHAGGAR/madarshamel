import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';

const UserItem = ({content}) => {
    let userCreds = '';
    let allItems = '';
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
                            <a href={"/dashboard/editUser/"+user._id} className="btn btn-square">
                                <i className="fi fi-rr-edit"></i> Edit
                            </a>
                        </td>
                    </tr>
                </>
            )
        })
    }
    return (
        <>
            {allItems}
        </>
    );
}

export default UserItem;