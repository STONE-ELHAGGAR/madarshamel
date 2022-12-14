/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Layout from "../components/layout/Layout";
const checkIfLoggedIn = require('./../util/checkIfLoggedIn');
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";

function Signup() {
    const router = useRouter();
    let {t} = useTranslation();
    const [logged , setLogged] = useState(false);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        checkIfLoggedIn()
            .then((result) => {
                if(result){
                    setLogged(true);
                    router.push({ pathname: '/dashboard' })
                }else{
                    console.log('NOT Loggedin');
                    setLogged(false);
                }
            })
    });
    const handleShow = () => {
        let passToggle = document.getElementById('passToggle');
        if(passToggle.type == 'text'){
            passToggle.type = 'password';
        }else{
            passToggle.type = 'text';
        }
    }
    const handleShowCheck = () => {
        let passToggleCheck = document.getElementById('passToggleCheck');
        if(passToggleCheck.type == 'text'){
            passToggleCheck.type = 'password';
        }else{
            passToggleCheck.type = 'text';
        }
    }
    const LoggedInComponent = () => {
        return false;
    }
    const NotLoggedInComponent = () => {
        return (
            <section className="section-box">
                    <div className="bg-6-opacity-30 pt-90">
                        <div className="container">
                            <div className="box-signup">
                                <h1 className="text-heading-3 text-center">{t("page-signup:p1")}</h1>

                                <div className="text-center">
                                    <div className="mt-40 box-line-throught mb-40"><span className="text-body-text color-gray-500">{t("page-signup:p2")}</span></div>
                                </div>
                                <div className="box-form-signup mb-200">
                                    <div className="alert-data">
                                                
                                    </div>
                                    <div className="form-group"><input className="form-control name" type="text" placeholder={t("page-signup:p3")} />
                                    </div>
                                    <div className="form-group"><input className="form-control mobile" type="text" placeholder={t("page-signup:p4")} /></div>
                                    <div className="form-group"><input className="form-control email" type="email" placeholder={t("page-signup:p5")} /></div>
                                    <div className="form-group">
                                        <div className="form-field"><span className="text-body-small color-green-900 tag-top">{t("page-signup:p6")}</span><input type="password" id="passToggle" className="form-control password input-green-bd input-with-icon" placeholder="*******" /><span onClick={handleShow} className="icon-eye-right" /></div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-field"><span className="text-body-small color-green-900 tag-top">{t("page-signup:p6")}</span><input type="password" id="passToggleCheck" className="form-control passwordCheck input-green-bd input-with-icon" placeholder="*******" /><span onClick={handleShowCheck} className="icon-eye-right" /></div>
                                    </div>
                                    {/*<div className="form-group">
                                        <div className="form-field"><span className="text-body-small color-green-900 tag-top">Re-type Password</span><input className="form-control input-green-bd input-with-icon" placeholder /><span className="icon-eye-right" /></div>
                                    </div>
                                    <div className="form-group"><label className="text-body-small color-gray-500"><input className="chkbox" type="checkbox" /> Agree to
                                        <Link href="/#"><a>terms &amp; conditions</a></Link>
                                    </label></div>*/}
                                    <div className="form-group"><button onClick={handleRegister} className="btn btn-green-full text-heading-6">{t("page-signup:p7")}</button></div>
                                    <div><span className="text-body-text color-gray-500">{t("page-signup:p8")} </span>
                                        <Link href="/page-login"><a className="text-body-text color-green-900">{t("common:logIn")}</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="images-lists">
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-6 pl-0"><img className="img-responsive img-full img-1" src="/assets/imgs/page/signup/img-1.png" alt="Madarshamel" /></div>
                                <div className="col-lg-2 col-md-2 col-sm-6"><img className="img-responsive img-full img-2" src="/assets/imgs/page/signup/img-2.png" alt="Madarshamel" /></div>
                                <div className="col-lg-4 col-md-4 col-sm-12"><img className="img-responsive img-full img-3" src="/assets/imgs/page/signup/img-3.png" alt="Madarshamel" /></div>
                                <div className="col-lg-2 col-md-2 col-sm-6"><img className="img-responsive img-full img-4" src="/assets/imgs/page/signup/img-4.png" alt="Madarshamel" /></div>
                                <div className="col-lg-2 col-md-2 col-sm-6 pr-0"><img className="img-responsive img-full img-5" src="/assets/imgs/page/signup/img-5.png" alt="Madarshamel" /></div>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
    const handleRegister = async () => {
        const email = document.querySelector(".email").value;
        const password = document.querySelector(".password").value;
        const passwordCheck = document.querySelector(".passwordCheck").value;
        const name = document.querySelector(".name").value;
        const mobile = document.querySelector(".mobile").value;
        if(password == passwordCheck){
            const registerRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password, name: name, mobile: mobile})
            });
            const content = await registerRequest.json();
            if(content.success) {
                router.push({ pathname: '/page-login' })
            }else{
                document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again OR use another email</div>';
            }
        }else{
            document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Passwords are not equaled.</div>';
        }
    }

    return (
        <>

            <Layout>
                {((logged) ? <LoggedInComponent /> : <NotLoggedInComponent /> )}
            </Layout>

        </>
    )
}

export default Signup;