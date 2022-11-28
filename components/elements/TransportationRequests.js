import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import TrItem from "./TrItem";
const handleAllTransportation = require('./../../handlers/handleAllTransportation');


const TransportationRequests = ({settingsTab}) => {
    const [trData, settrData] = useState([]);
    useEffect(() => {
        if(settingsTab == 'TransportationRequests'){
            handleAllTransportation().
                then((result) => {
                    settrData(result)
                });
        }
    },[settingsTab]);
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
                                <th scope="col">Transaction Place</th>
                                <th scope="col">From Date</th>
                                <th scope="col">To Date</th>
                                <th scope="col">Source Country</th>
                                <th scope="col">Driver</th>
                                <th scope="col">Car Cost</th>
                                <th scope="col">Transfer Date</th>
                                <th scope="col">Expected Ship Date</th>
                            </tr>
                            </thead>
                            <tbody id="allRecords">
                                <TrItem content={trData} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </>
    );
}

export default TransportationRequests;