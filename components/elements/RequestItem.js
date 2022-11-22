import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleTableReader = require('./../../handlers/handleTableReader');

const OptionItem = ({content, table, internalItem = false, internalItemKey = ''}) => {
    let allItems = '';
    const [optionContent, setOptionContent] = useState('');
    if(content){
        if(content[table]?.length > 0){
            allItems = content[table]?.map((item) => {
                return(
                    <>
                        <div className="container-fluid float-start">
                            <div className="container-fluid h5 px-3 py-3 float-start">
                                <a href={'/dashboard/'+((table === 'transportations') ? 'transportation': 'custom-clearance' )+'-request/'+item._id} className="container-fluid float-start companyName">
                                    {item._id}
                                    <i className="fi-rr-caret-right float-end"></i>
                                </a>
                            </div>
                        </div>
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