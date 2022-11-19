import React, { useEffect, useState } from 'react';
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');
import { useRouter } from 'next/router';
import Sidebar from "./Sidebar";

const Layout = ({ children, headerStyle, userCreds = [],params = [], modelName = '', forNewUsers = 1}) => {
    const [openClass, setOpenClass] = useState('');

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
                        router.push({ pathname: '/dashboard' })
                    }else{
                        console.log('NOT Loggedin');
                        setLogged(false);
                    }
                })
        });
    }else{
        // Similar to componentDidMount and componentDidUpdate:
        useEffect(() => {
            checkIfLoggedIn(userCreds,params,modelName)
                .then((result) => {
                    if(result){
                        setLogged(true);
                        console.log('Loggedin');
                    }else{
                        setLogged(false);
                        console.log('Not Loggedin');
                        router.push({ pathname: '/page-login' })
                    }
                })
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
                <Footer />
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
                    {children}
                </main>
                <Footer />
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