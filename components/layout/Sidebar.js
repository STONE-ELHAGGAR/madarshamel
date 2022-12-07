/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRouter } from 'next/router';

const Sidebar = ({ openClass ,logged }) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };
    const handleLogout = () => {
        sessionStorage.removeItem('loginData');
        router.push({ pathname: '/page-login' })
    }
    return (
        <>
            <div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${openClass}`}>
                <PerfectScrollbar className="mobile-header-wrapper-inner">
                    {(logged) ? (
                        <div className="col-12 px-3 py-3">
                            <div className="mobile-header-top">
                                <div className="user-account">
                                    <Image width="50px" height="50px" src="/assets/imgs/template/ava_1.png" alt="Madarshamel" />
                                    <div className="content">
                                        <h6 className="user-name">
                                            <span className="text-brand">{(sessionStorage.getItem('loginData')) ? JSON.parse(sessionStorage.getItem('loginData')).data.name : ''}</span>
                                        </h6>
                                        {/*<p className="font-xs text-muted">5 Notfications</p>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-account">
                                <ul className="mobile-menu font-heading">
                                    <li>
                                        <Link href="/"><a>Home</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard"><a>Dashboard</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard/settings"><a>Dashboard Settings</a></Link>
                                    </li>
                                    <li>
                                        <a onClick={handleLogout}>Log Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="mobile-header-content-area">
                            <div className="perfect-scroll">
                                <div className="mobile-menu-wrap mobile-header-border">
                                    <nav>
                                        <ul className="mobile-menu font-heading">
                                            <li className={isActive.key == 1 ? "active" : ""}>
                                                <Link href="/"><a className="active">Home</a></Link>
                                            </li>
                                            <li className={isActive.key == 1 ? "active" : ""}>
                                                <Link href="/page-signup"><a className="active">Sign Up</a></Link>
                                            </li>
                                            <li className={isActive.key == 1 ? "active" : ""}>
                                                <Link href="/page-login"><a className="active">Log In</a></Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                
                                <div className="site-copyright color-gray-400">
                                    Copyright 2022 © Madarshamel.
                                </div>
                            </div>
                        </div>
                    )}
                </PerfectScrollbar>
            </div>

        </>
    );
};

export default Sidebar;