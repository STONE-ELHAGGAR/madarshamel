import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../components/layout/Layout";
import CcItem from "./../../components/elements/CcItem";
const handleAllCC = require('./../../handlers/handleAllCC');


const AllRecords = () => {
    const [ccData, setCcData] = useState([]);

    useEffect(() => {
        handleAllCC().
            then((result) => {
                setCcData(result)
            });
    },[]);
return (
    <>
        <Layout userCreds={['super-admin']} params={[]} modelName='' forNewUsers={0}>
            <div className="container-fluid backgrounded-con float-start px-3 py-3">
                <div className="container">
                    <div className="col-12 px-3 py-3 float-start" style={{background: 'rgb(255, 255, 255)',overflowX: 'scroll'}}>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Branch</th>
                                <th scope="col">Transaction Place</th>
                                <th scope="col">Shipping Port</th>
                                <th scope="col">Reciving Port</th>
                                <th scope="col">Source Country</th>
                                <th scope="col">Expected Ship Date</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Remove</th>
                            </tr>
                            </thead>
                            <tbody id="allRecords">
                                <CcItem content={ccData} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    </>
    );
}

export default AllRecords;