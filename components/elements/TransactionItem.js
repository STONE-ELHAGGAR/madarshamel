import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';

const TransactionItem = ({content, choosedUserData}) => {
    let transactionCreds = '';
    let allItems = '';
    if(content.transactions?.length > 0){
        allItems = content.transactions?.map((transaction) => {
            
            return(
                <>
                    <tr>
                        <td>{transaction._id}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.details}</td>
                        <td>{(transaction.status) ? 'Deposit' : 'Withdraw'}</td>
                        <td>{transaction.created_at}</td>
                        <td>{transaction.u_id}</td>
                        <td>{transaction.byUId}</td>
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

export default TransactionItem;