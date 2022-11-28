import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleTableReader = require('./../../handlers/handleTableReader');
const handleGetNumId = require('./../../handlers/handleGetNumId');

const CcItem = ({content}) => {
    let userCreds = '';
    let allItems = '';
    if(content?.custom_clearances){
    if(content.custom_clearances?.length > 0){
        allItems = content.custom_clearances?.map((custom_clearance, index) => {
            return(
                    <tr key={custom_clearance._id}>
                        <th scope="row"><a href={"/dashboard/custom-clearance-request/"+custom_clearance._id}>{custom_clearance.id}</a></th>
                        <td>{custom_clearance.companyName}</td>
                        <td>{custom_clearance.companyMobile}</td>
                        <td>{custom_clearance.companyAddress}</td>
                        <td>{custom_clearance.transactionPlace}</td>
                        <td>{custom_clearance.shippingPort}</td>
                        <td>{custom_clearance.recivingPort}</td>
                        <td>{custom_clearance.sourceCountry}</td>
                        <td>{custom_clearance.expectedShipDate}</td>
                        <td>{custom_clearance.created_at}</td>
                    </tr>
            )
        })
    }
    return allItems;
    }else{
      return <h3>No Requests Yet.</h3>;
    }
}

export default CcItem;

