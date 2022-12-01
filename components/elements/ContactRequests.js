import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleAllUsers = require('./../../handlers/handleAllUsers');
import ContactItem from "./ContactItem";


const ContactRequests = ({contactResultData}) => {
    console.log(contactResultData)
    const [contactRequests , setContactRequests] = useState(contactResultData);
return (
    <>
        <div className="col-12 px-3 py-3 float-start" style={{background: 'rgb(255, 255, 255)',maxWidth: '100%',overflowX: 'scroll'}}>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Name</th>
                    <th scope="col">Message</th>
                    <th scope="col">Created At</th>
                </tr>
                </thead>
                <tbody>
                    <ContactItem content={contactRequests} />
                </tbody>
            </table>
        </div>
    </>
    );
}

export default ContactRequests;