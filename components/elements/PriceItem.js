import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';

const PriceItem = ({content}) => {
    console.log('sssss',content)
    let priceCreds = '';
    let allItems = '';
    if(content.prices?.length > 0){
        allItems = content.prices?.map((price) => {
            
            priceCreds = (price.cond) ? JSON.parse(price.cond).join(',') : '';
            return(
                <>
                    <tr>
                        <td>{price.company}</td>
                        <td>{price.consigneeAddress}</td>
                        <td>{price.consigneeCity}</td>
                        <td>{price.email}</td>
                        <td>{price.goodsDetails}</td>
                        <td>{price.hts}</td>
                        <td>{price.mobile}</td>
                        <td>{price.name}</td>
                        <td>{price.senderAddress}</td>
                        <td>{price.sourceCountry}</td>
                        <td>{priceCreds}</td>
                    </tr>
                </>
            )
        })
    }
    return (
        <>
            {allItems}
        </>
    );
}

export default PriceItem;