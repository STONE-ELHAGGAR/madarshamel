/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { useRouter } from 'next/router';

function Login() {
    const router = useRouter();
    const handleLogin = async () => {
        const email = document.querySelector(".email").value;
        const password = document.querySelector(".password").value;
        const loginRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
        });
        const content = await loginRequest.json();
        if(content.success) {
            sessionStorage.setItem('loginData', JSON.stringify(content));
            function setCookie(cname, cvalue, exdays) {
                const d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                let expires = "expires="+ d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
              }
              setCookie('accessToken',content.data.accessToken,10)
            console.log(JSON.parse(sessionStorage.getItem('loginData')));
            router.push({ pathname: '/dashboard' })
        }else{
            document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please activate your account Or and type your password correctly then try again (You may found Activation Message into email Spam folder)</div>';
        }
    }

    return (
        <>
            <Layout userCreds={[]} params={[]} modelName='' forNewUsers={1}>
                <section className="section-box">
                    <div className="bg-2-opacity-80">
                        <div className="box-login">
                            <div className="row">
                                <div className="col-xxl-7 col-xl-6 col-lg-6 col-md-12 login-left pl-0 d-none d-lg-flex" />
                                <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-12 login-right pr-0">
                                    <div className="box-login-form">
                                        <div className="box-signup mt-90">
                                            <h1 className="text-heading-3 mb-10 text-center">Welcome back.</h1>
                                            <div className="text-center">
                                                <div className="mt-40 box-line-throught mb-40"><span className="text-body-text color-gray-500">Sign in with your email</span></div>
                                            </div>
                                            <div className="box-form-signup">
                                            <div className="alert-data">
                                                
                                            </div>
                                                <div className="form-group">
                                                    <input className="form-control email" name="email" type="email" placeholder="Your email *" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="form-field"><span className="text-body-small color-green-900 tag-top">Password</span><input name="password" type="password" className="form-control password input-with-icon" placeholder="*********" /><span className="icon-eye-right" /></div>
                                                </div>
                                                <div className="form-group">
                                                    <Link href="/page-reset"><a className="text-body-text">Forgot password?</a></Link>
                                                </div>
                                                <div className="form-group"><button className="btn btn-green-full text-heading-6" onClick={handleLogin}>Continue</button></div>
                                                <div><span className="text-body-text color-gray-500">Don’t have an account?</span>
                                                    <Link href="/page-signup"><a className="text-body-text color-green-900">Sign up</a></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>

        </>
    )
}

export default Login;