/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Sidebar = ({ openClass }) => {
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
    return (
        <>
            <div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${openClass}`}>
                <PerfectScrollbar className="mobile-header-wrapper-inner">
                    <div className="mobile-header-top">
                        <div className="user-account">
                            <img src="/assets/imgs/template/ava_1.png" alt="Madarshamel" />
                            <div className="content">
                                <h6 className="user-name">
                                    Hi <span className="text-brand">Hossam !</span>
                                </h6>
                                <p className="font-xs text-muted">
                                    You have 5 new messages
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-header-content-area">
                        <div className="perfect-scroll">
                            <div className="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul className="mobile-menu font-heading">
                                        <li className={isActive.key == 1 ? "active" : ""}>
                                            <Link href="/"><a className="active">Home</a></Link>
                                        </li>
                                        <li className={isActive.key == 2 ? "active" : "s"}>
                                            <Link href="/page-about-2"><a>About</a></Link>
                                        </li>
                                        <li className={isActive.key == 3 ? "active" : ""}>
                                            <Link href="/page-faqs-1"><a>FAQs</a></Link>
                                        </li>
                                        <li className={isActive.key == 4 ? "has-children active" : "has-children"}>
                                            <span onClick={() => handleToggle(4)}  className="menu-expand"><i className="fi-rr-angle-small-down"></i></span>

                                            <Link href="/#"><a>Pages</a></Link>
                                            <ul className={isActive.key == 4 ? "sub-menu d-block" : "sub-menu d-none"}>
                                                <li>

                                                    <Link href="/page-contact"><a>Contact</a></Link>
                                                </li>
                                                <li>

                                                    <Link href="/page-signup"><a>Sign Up</a></Link>
                                                </li>
                                                <li>

                                                    <Link href="/page-login"><a>Log In</a></Link>
                                                </li>
                                                <li>

                                                    <Link href="/page-career-detail"><a>Career Detail</a></Link>
                                                </li>
                                                <li>

                                                    <Link href="/page-reset"><a>Reset Password</a></Link>
                                                </li>
                                                <li>

                                                    <Link href="/404"><a>Error 404</a></Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className={isActive.key == 5 ? "has-children active" : "has-children"}>
                                            <span onClick={() => handleToggle(5)}  className="menu-expand"><i className="fi-rr-angle-small-down"></i></span>

                                            <Link href="/blog-1"><a>Blog</a></Link>
                                            <ul className={isActive.key == 5 ? "sub-menu d-block" : "sub-menu d-none"}>
                                                <li>

                                                    <Link href="/blog-1"><a className="closer">Blog</a></Link>
                                                </li>
                                                <li className="hr"><span /></li>
                                                <li>

                                                    <Link href="/blog-single"><a>Blog Post</a></Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="mobile-account">
                                <h6 className="mb-10">Your Account</h6>
                                <ul className="mobile-menu font-heading">
                                    <li>
                                        <Link href="/#"><a>Profile</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/#"><a>Account Settings</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/page-login"><a>Sign Out</a></Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="site-copyright color-gray-400">
                                Copyright 2022 © Madarshamel.
                            </div>
                        </div>
                    </div>
                </PerfectScrollbar>
            </div>

        </>
    );
};

export default Sidebar;