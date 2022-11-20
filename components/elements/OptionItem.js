import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';

const OptionItem = ({content, property , table, internalItem, internalItemKey = ''}) => {
    let allItems = '';
    let optionContent = '';
    if(content){
        if(content[table]?.length > 0){
            allItems = content[table]?.map((item) => {
                optionContent = (internalItem) ? JSON.parse(item[property])[internalItemKey]+' / '+item._id : item[property]+' / '+item._id ;
                return(
                    <>
                        <option value={item._id}>{optionContent}</option>
                    </>
                )
            })
        }
    }
    return (
        <>
            {allItems}
        </>
    );
}

export default OptionItem;