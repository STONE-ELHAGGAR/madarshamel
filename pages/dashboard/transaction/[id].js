import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../../components/layout/Layout";
import Bank from "./../../../components/elements/Bank";


const Transaction = () => {

    let router = useRouter()
    
    const { id } = router.query;

    return (
        <>
            <Layout userCreds={['transportation','custom-clearance','super-admin']} params={[]} modelName='' forNewUsers={0}>
                <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                    <div className="container">
                        {id}
                    </div>
                </div>
            </Layout>
        </>
    );
};



export default Transaction;