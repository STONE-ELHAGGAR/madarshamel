import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';

const ContactItem = ({content}) => {
    let contactCreds = '';
    let allItems = '';
    if(content.contacts?.length > 0){
        allItems = content.contacts?.map((contact) => {
            return(
                <>
                    <tr>
                        <td>{contact.company}</td>
                        <td>{contact.email}</td>
                        <td>{contact.mobile}</td>
                        <td>{contact.name}</td>
                        <td>{contact.desc}</td>
                        <td>{contact.created_at}</td>
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

export default ContactItem;