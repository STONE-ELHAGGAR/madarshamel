/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Layout from "../components/layout/Layout";
const checkIfLoggedIn = require('./../util/checkIfLoggedIn');
import { useRouter } from 'next/router';

function Signup() {
    const router = useRouter();
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
    const LoggedInComponent = () => {
        return false;
    }
    const NotLoggedInComponent = () => {
        return (
            <section className="section-box">
                    <div className="bg-6-opacity-30 pt-90">
                        <div className="container">
                            <div className="box-signup">
                                <h1 className="text-heading-3 text-center">Let’s join us</h1>

                                <div className="text-center">
                                    <div className="mt-40 box-line-throught mb-40"><span className="text-body-text color-gray-500">Sign up with your email</span></div>
                                </div>
                                <div className="box-form-signup mb-200">
                                    <div className="alert-data">
                                                
                                    </div>
                                    <div className="form-group"><input className="form-control name" type="text" placeholder="Your name *" />
                                    </div>
                                    <div className="form-group"><input className="form-control mobile" type="text" placeholder="+966 55 555 5555" /></div>
                                    <div className="form-group"><input className="form-control email" type="email" placeholder="user@example.com" /></div>
                                    <div className="form-group">
                                        <div className="form-field"><span className="text-body-small color-green-900 tag-top">Password</span><input type="password" className="form-control password input-green-bd input-with-icon" placeholder /><span className="icon-eye-right" /></div>
                                    </div>
                                    {/*<div className="form-group">
                                        <div className="form-field"><span className="text-body-small color-green-900 tag-top">Re-type Password</span><input className="form-control input-green-bd input-with-icon" placeholder /><span className="icon-eye-right" /></div>
                                    </div>
                                    <div className="form-group"><label className="text-body-small color-gray-500"><input className="chkbox" type="checkbox" /> Agree to
                                        <Link href="/#"><a>terms &amp; conditions</a></Link>
                                    </label></div>*/}
                                    <div className="form-group"><button onClick={handleRegister} className="btn btn-green-full text-heading-6">Continue</button></div>
                                    <div><span className="text-body-text color-gray-500">Already have an account? </span>
                                        <Link href="/page-login"><a className="text-body-text color-green-900">Sign in now</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="images-lists">
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-6 pl-0"><img className="img-responsive img-full img-1" src="assets/imgs/page/signup/img-1.png" alt="Agon" /></div>
                                <div className="col-lg-2 col-md-2 col-sm-6"><img className="img-responsive img-full img-2" src="assets/imgs/page/signup/img-2.png" alt="Agon" /></div>
                                <div className="col-lg-4 col-md-4 col-sm-12"><img className="img-responsive img-full img-3" src="assets/imgs/page/signup/img-3.png" alt="Agon" /></div>
                                <div className="col-lg-2 col-md-2 col-sm-6"><img className="img-responsive img-full img-4" src="assets/imgs/page/signup/img-4.png" alt="Agon" /></div>
                                <div className="col-lg-2 col-md-2 col-sm-6 pr-0"><img className="img-responsive img-full img-5" src="assets/imgs/page/signup/img-5.png" alt="Agon" /></div>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
    const handleRegister = async () => {
        const email = document.querySelector(".email").value;
        const password = document.querySelector(".password").value;
        const name = document.querySelector(".name").value;
        const mobile = document.querySelector(".mobile").value;
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