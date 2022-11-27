import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../../components/layout/Layout";
const handleVerifyAccount = require("./../../../handlers/handleVerifyAccount");

const verifyPage = () => {
    let router = useRouter()
    const {verify} = router.query;

    const [verifyCode , setVerifyCode] = useState('');

    useEffect(() => {
        setVerifyCode(verify)
    },[verify]);

    return(
        <>
            <Layout userCreds={[]} params={[]} modelName=''>
                <div className="container-fluid backgrounded-con float-start">
                    <div className="col-5 my-3 px-3 py-3 text-center" style={{background: '#fff',margin: 'auto'}}>
                        <div id="alert-section"></div>
                        <h4>Verfication Code:</h4>
                        <input type="hidden" value={verifyCode} id="verifyCode" />
                        <h5>{verifyCode}</h5><br />
                        <button type="submit" onClick={handleVerifyAccount} className="btn btn-square">Verify Now</button>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default verifyPage;