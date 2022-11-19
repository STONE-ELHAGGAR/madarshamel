import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../components/layout/Layout";
const handleAllUsers = require('./../../handlers/handleAllUsers');


const allUsers = () => {
    useEffect(() => {
        handleAllUsers();
    },[]);
return (
    <>
        <Layout userCreds={['super-admin']} params={[]} modelName='' forNewUsers={0}>
            <div className="container-fluid backgrounded-con float-start px-3 py-3">
                <div className="container">
                    <div className="col-12 px-3 py-3 float-start" style={{background: 'rgb(255, 255, 255)'}}>
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
                            <tbody id="allUsers"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    </>
    );
}

export default allUsers;