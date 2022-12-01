import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "./../../components/layout/Layout";
const handleChangePassword = require("./../../handlers/handleChangePassword");

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
                        <h4>Type your new password:</h4><br />
                        <input type="hidden" value={verifyCode} id="verifyCode" />
                        <input type="password" placeholder="********" id="password" className="form-control" />
                        <br />
                        <button type="submit" onClick={handleChangePassword} className="btn btn-square">Change Password</button>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default verifyPage;