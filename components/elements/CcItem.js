import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleTableReader = require('./../../handlers/handleTableReader');
const handleGetNumId = require('./../../handlers/handleGetNumId');

const CcItem = ({content}) => {
    const router = useRouter();
    const currentLang =  router.locale;
    let userCreds = '';
    let allItems = '';
    if(content?.custom_clearances){
    if(content.custom_clearances?.length > 0){
        allItems = content.custom_clearances?.map((custom_clearance, index) => {
            return(
                    <tr key={custom_clearance._id}>
                        <th scope="row"><a href={"/"+currentLang+"/dashboard/custom-clearance-request/"+custom_clearance._id}>{custom_clearance.id}</a></th>
                        <td>{custom_clearance.companyName}</td>
                        <td>{custom_clearance.companyMobile}</td>
                        <td>{custom_clearance.companyAddress}</td>
                        <td>{custom_clearance.postalCode}</td>
                        <td>{custom_clearance.fax}</td>
                        <td>{custom_clearance.commercialRegistrationNo}</td>
                        <td>{custom_clearance.commercialRegistrationDate}</td>
                        <td>{custom_clearance.commercialRegistrationCity}</td>
                        <td>{custom_clearance.chamberOfCommerceNumber}</td>
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

