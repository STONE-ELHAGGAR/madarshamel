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
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Permisions</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Remove</th>
                </tr>
                </thead>
                <tbody>
                    <UserItem content={allUsersData} />
                </tbody>
            </table>
        </div>
    </>
    );
}

export default AllUsers;