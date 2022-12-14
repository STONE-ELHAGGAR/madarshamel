import React, { useEffect, useState } from 'react';
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from "next-translate/useTranslation";
import Head from "next/head"

const Layout = ({ children, headerStyle, userCreds = [],params = [], modelName = '', forNewUsers = 1, itemId = ''}) => {
    let {t} = useTranslation();
    const [adminCheck, setAdminCheck] = useState(false);
    checkIfLoggedIn(['transportation','custom-clearance','super-admin'],[],'','')
    .then((result) => {
        if(result){
          setAdminCheck(true);
        }else{
          setAdminCheck(false);
        }
    })

    const router = useRouter();
    
    const [logged , setLogged] = useState(false);
        // Similar to componentDidMount and componentDidUpdate:
        useEffect(() => {
            if(forNewUsers){
                checkIfLoggedIn()
                .then((result) => {
                    if(result){
                        setLogged(true);
                        if(router.pathname == '/page-login' || router.pathname == '/page-signup'){
                            router.push({ pathname: '/dashboard' })
                        }
                    }else{
                        console.log('NOT Loggedin');
                        setLogged(false);
                    }
                })
            }else{
                if(modelName && itemId){
                    //Need to check u_id for item so wait until modelName && itemId ready together
                    checkIfLoggedIn(userCreds,params,modelName,itemId)
                        .then((result) => {
                            if(result){
                                setLogged(true);
                                console.log('Loggedin');
                            }else{
                                setLogged(false);
                                console.log('Not Loggedin Needed to check u_id for item so wait until Model Name && Item Id ready together');
                                router.push({ pathname: '/page-login' })
                            }
                        })
                }else if(params.length === 0 && modelName == '' && itemId == ''){
                    //No Need to check u_id for item
                    checkIfLoggedIn(userCreds,params,modelName,itemId)
                        .then((result) => {
                            if(result){
                                setLogged(true);
                                console.log('Loggedin');
                            }else{
                                setLogged(false);
                                console.log('Not Loggedin No Need to check u_id for item');
                                router.push({ pathname: '/page-login' })
                            }
                        })
                }
            }
        });
        /*/ Similar to componentDidMount and componentDidUpdate:
        useEffect(() => {
            
        });*/


    
    const NotLoggedInComponent = () => {
        return (
            <main className="main">
                {(forNewUsers) ? children : (
                    <div id="preloader-active">
                        <div className="preloader d-flex align-items-center justify-content-center">
                            <div className="preloader-inner position-relative">
                                <div className="text-center">
                                    <div className="loader" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) }
            </main>
        );
    }
    const LoggedInComponent = () => {
        return (
                <main className="main">
                {(forNewUsers === 0) ? (<div className="container-fluid backgrounded-con float-start px-3 py-3">
                <div className="container">
                  <div className="col-12 px-3 py-3 float-start" style={{background: '#fff'}}>
                      <ul className="nav nav-pills nav-fill col-12 float-start">
                          <li className="nav-item">
                              <Link href="/dashboard"><a className="nav-link"><i className="fi fi-rr-user"></i> {t("common:dashboard")}</a></Link>
                          </li>
                          <li className="nav-item">
                              <Link href="/dashboard/controlCCRequests"><a className="nav-link"><i className="fi fi-rr-stats"></i> {t("common:customsClearance")}</a></Link>
                          </li>
                          <li className="nav-item">
                              <Link href="/dashboard/controlTRRequests"><a className="nav-link"><i className="fi fi-rr-data-transfer"></i> {t("common:cargoTransportation")}</a></Link>
                          </li>
                          {(adminCheck) ? (
                            <li className="nav-item">
                              <Link href="/dashboard/bank"><a className="nav-link"><i className="fi fi-rr-dollar"></i> {t("common:bank")}</a></Link>
                            </li>
                          ) : ''}
                          
                          {/*<li className="nav-item">
                              <Link href="/dashboard/transportation-form"><a className="nav-link"><i className="fi fi-rr-data-transfer"></i> Add Transportation</a></Link>
                          </li>*/}
                          <li className="nav-item">
                              <Link href="/dashboard/settings"><a className="nav-link"><i className="fi fi-rr-edit"></i> {t("common:settings")}</a></Link>
                          </li>
                      </ul>
                  </div>
                </div>
              </div>) : ''}
                    {children}
                </main>
        );
    }
    return (
        <>
            <Head>
                <html lang={t("common:langHtml")} dir={t("common:dir")} />
            </Head>
            <Header headerStyle={headerStyle} />
            {((logged) ? <LoggedInComponent /> : <NotLoggedInComponent /> )}
            <Footer fb="#fb" logged={logged} twitter="#twitter" insta="#insta" address="Jeddah, KSA" phone="+(966) 556-565-564" email="cs@madarshamel.sa" />
            <BackToTop/>
        </>
      )
};

export default Layout;