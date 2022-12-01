import React, { useEffect, useState } from 'react';
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');
import { useRouter } from 'next/router';
import Link from 'next/link';
import Sidebar from "./Sidebar";

const Layout = ({ children, headerStyle, userCreds = [],params = [], modelName = '', forNewUsers = 1, itemId = ''}) => {
    const [openClass, setOpenClass] = useState('');
    const [adminCheck, setAdminCheck] = useState(false);
    checkIfLoggedIn(['transportation','custom-clearance','super-admin'],[],'','')
    .then((result) => {
        if(result){
          setAdminCheck(true);
        }else{
          setAdminCheck(false);
        }
    })
    const handleOpen = () => {
        document.body.classList.add("mobile-menu-active");
        setOpenClass("sidebar-visible")
    }

    const handleRemove = () => {
        if (openClass === "sidebar-visible") {
            setOpenClass("")
            document.body.classList.remove("mobile-menu-active");
        }
    }
    const router = useRouter();
    
    const [logged , setLogged] = useState(false);
    if(forNewUsers){
        // Similar to componentDidMount and componentDidUpdate:
        useEffect(() => {
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
        });
    }else{
        // Similar to componentDidMount and componentDidUpdate:
        useEffect(() => {
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
        });
    }
    
    const NotLoggedInComponent = () => {
        return (
            <>
                <div  className={openClass && "body-overlay-1"} onClick={handleRemove} />

                <Header handleOpen={handleOpen} headerStyle={headerStyle} />
                <Sidebar openClass={openClass} />
                <main className="main">
                    {(forNewUsers) ? children : 'Loading...' }
                </main>
                <Footer fb="#fb" twitter="#twitter" insta="#insta" address="Jeddah, KSA" phone="+(966) 556-565-564" email="cs@madarshamel.sa" />
                <BackToTop/>
            </>
        );
    }
    const LoggedInComponent = () => {
        return (
            <>
                <div  className={openClass && "body-overlay-1"} onClick={handleRemove} />

                <Header handleOpen={handleOpen} headerStyle={headerStyle} />
                <Sidebar openClass={openClass} />
                <main className="main">
                {(forNewUsers === 0) ? (<div className="container-fluid backgrounded-con float-start px-3 py-3">
                <div className="container">
                  <div className="col-12 px-3 py-3 float-start" style={{background: '#fff'}}>
                      <ul className="nav nav-pills nav-fill col-12 float-start">
                          <li className="nav-item">
                              <Link href="/dashboard"><a className="nav-link"><i className="fi fi-rr-user"></i> Dashboard</a></Link>
                          </li>
                          <li className="nav-item">
                              <Link href="/dashboard/controlCCRequests"><a className="nav-link"><i className="fi fi-rr-stats"></i> Custom Clearance</a></Link>
                          </li>
                          <li className="nav-item">
                              <Link href="/dashboard/controlTRRequests"><a className="nav-link"><i className="fi fi-rr-data-transfer"></i> Transportation</a></Link>
                          </li>
                          {(adminCheck) ? (
                            <li className="nav-item">
                              <Link href="/dashboard/bank"><a className="nav-link"><i className="fi fi-rr-dollar"></i> Bank</a></Link>
                            </li>
                          ) : ''}
                          
                          {/*<li className="nav-item">
                              <Link href="/dashboard/transportation-form"><a className="nav-link"><i className="fi fi-rr-data-transfer"></i> Add Transportation</a></Link>
                          </li>*/}
                          <li className="nav-item">
                              <Link href="/dashboard/settings"><a className="nav-link"><i className="fi fi-rr-edit"></i> Dashboard Settings</a></Link>
                          </li>
                      </ul>
                  </div>
                </div>
              </div>) : ''}
                    {children}
                </main>
                <Footer fb="#fb" twitter="#twitter" insta="#insta" address="Jeddah, KSA" phone="+(966) 556-565-564" email="cs@madarshamel.sa" />
                <BackToTop/>
            </>
        );
    }
    return (
        <>
            {((logged) ? <LoggedInComponent /> : <NotLoggedInComponent /> )}
        </>
      )
};

export default Layout;