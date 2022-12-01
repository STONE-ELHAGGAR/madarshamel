import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleAllUsers = require('./../../handlers/handleAllUsers');
import TransactionItem from "./TransactionItem";


const AllPriceRequests = ({requests, choosedUserData}) => {
    const [transactions , setTransactions] = useState(requests);
return (
    <>
        <div className="col-12 px-3 py-3 float-start" style={{background: 'rgb(255, 255, 255)',maxWidth: '100%',overflowX: 'scroll'}}>
            <table className="table table-striped">
                <thead>
                <tr>
                    <td>Transaction ID</td>
                    <td>Amount</td>
                    <td>Details</td>
                    <td>Status</td>
                    <td>Created at</td>
                    <td>For User</td>
                    <td>By</td>
                </tr>
                </thead>
                <tbody>
                    <TransactionItem content={transactions} choosedUserData={choosedUserData} />
                </tbody>
            </table>
        </div>
    </>
    );
}

export default AllPriceRequests;