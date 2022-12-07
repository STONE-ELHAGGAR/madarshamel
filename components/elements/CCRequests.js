import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import CcItem from "./CcItem";
const handleAllCC = require('./../../handlers/handleAllCC');


const CCRequests = ({content}) => {
return (
    <>
            <div className="container-fluid backgrounded-con float-start px-3 py-3">
                <div className="container">
                    <div className="col-12 px-3 py-3 float-start" style={{background: 'rgb(255, 255, 255)',overflowX: 'scroll'}}>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Company Mobile</th>
                                <th scope="col">Company Address</th>
                                <th scope="col">Postal Code</th>
                                <th scope="col">Fax</th>
                                <th scope="col">Commercial Registration No</th>
                                <th scope="col">Commercial Registration Date</th>
                                <th scope="col">Commercial Registration City</th>
                                <th scope="col">Chamber of Commerce Number</th>
                                <th scope="col">Transaction Place</th>
                                <th scope="col">Shipping Port</th>
                                <th scope="col">Reciving Port</th>
                                <th scope="col">Source Country</th>
                                <th scope="col">Expected Ship Date</th>
                                <th scope="col">Created At</th>
                            </tr>
                            </thead>
                            <tbody id="allRecords">
                                <CcItem content={content} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </>
    );
}

export default CCRequests;