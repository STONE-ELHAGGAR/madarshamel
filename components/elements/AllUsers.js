import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleAllUsers = require('./../../handlers/handleAllUsers');
import UserItem from "./UserItem";


const AllUsers = () => {
    const [allUsersData, setAllUsersData] = useState([]);
    useEffect(() => {
        handleAllUsers().
            then((result) => {
                setAllUsersData(result);
            });
    },[]);
return (
    <>
        <div className="col-12 px-3 py-3 float-start" style={{background: 'rgb(255, 255, 255)',maxWidth: '100%',overflowX: 'scroll'}}>
            
                    <UserItem content={allUsersData} />
                
        </div>
    </>
    );
}

export default AllUsers;