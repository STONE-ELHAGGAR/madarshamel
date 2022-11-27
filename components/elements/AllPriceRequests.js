import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleAllUsers = require('./../../handlers/handleAllUsers');
import PriceItem from "./PriceItem";


const AllPriceRequests = ({requests}) => {
    const [priceRequests , setPriceRequests] = useState(requests);
return (
    <>
        <div className="col-12 px-3 py-3 float-start" style={{background: 'rgb(255, 255, 255)',maxWidth: '100%',overflowX: 'scroll'}}>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Consignee Address</th>
                    <th scope="col">Consignee City</th>
                    <th scope="col">Email</th>
                    <th scope="col">Goods Details</th>
                    <th scope="col">HTS Code</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Name</th>
                    <th scope="col">Sender Address</th>
                    <th scope="col">Source Country</th>
                    <th scope="col">Shipping Method</th>
                </tr>
                </thead>
                <tbody>
                    <PriceItem content={priceRequests} />
                </tbody>
            </table>
        </div>
    </>
    );
}

export default AllPriceRequests;