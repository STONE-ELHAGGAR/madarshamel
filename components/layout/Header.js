/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
const Header = ({ handleOpen, headerStyle }) => {
    const [scroll, setScroll] = useState(0)
    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
    })
    return (
        <>
            <header className={scroll ? `${headerStyle} header sticky-bar stick ` : `${headerStyle} header sticky-bar`}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                            <div className="header-logo">
                                <Link href="/">
                                    <a className="d-flex">
                                        {headerStyle ? <Image width="200px" height="136px" alt="Madarshamel" src="/assets/imgs/template/logo-white.png" /> : <Image width="200px" height="136px" alt="Agon" src="/assets/imgs/template/logo.png" />}

                                    </a>
                                </Link>
                            </div>
                            <div className="header-nav">
                                <nav className="nav-main-menu d-none d-xl-block">
                                    <ul className="main-menu">
                                        <li>
                                            <Link href="/"><a className="active">Home</a></Link>
                                        </li>
                                        <li>
                                            <Link href="/page-about-2"><a>About</a></Link>
                                        </li>
                                        <li>
                                            <Link href="/page-faqs-1"><a>FAQs</a></Link>
                                        </li>
                                        <li className="has-children">
                                            <Link href="#"><a>Pages</a></Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/page-contact"><a><i className="fi fi-rr-paper-plane" />Contact</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/page-signup"><a><i className="fi fi-rr-user-add" />Sign Up</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/page-login"><a><i className="fi fi-rr-fingerprint" />Log In</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/page-career-detail"><a><i className="fi fi-rr-list" />Career Detail</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/page-reset"><a><i className="fi fi-rr-settings" />Reset Password</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/404"><a><i className="fi fi-rr-exclamation" />Error 404</a></Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="has-children">
                                            <Link href="#"><a>Blog</a></Link>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/blog-1"><a className="closer"><i className="fi fi-rr-edit" />Blog</a></Link>
                                                </li>
                                                <li className="hr"><span /></li>
                                                <li>
                                                    <Link href="/blog-single"><a><i className="fi fi-rr-document-signed" />Blog Post</a></Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="has-children">
                                            <div className="mobile-header-top float-start px-3 py-3 logged-in-user">
                                                <div className="user-account">
                                                    <img src="/assets/imgs/template/ava_1.png" alt="Madarshamel" />
                                                    <div className="content">
                                                        <h6 className="user-name">
                                                            <span className="text-brand">Hossam</span>
                                                        </h6>
                                                        <p className="font-xs text-muted">5 messages</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="sub-menu">
                                                <li>
                                                    <Link href="/dashboard"><a className="closer"><i className="fi fi-rr-user" />Dashboard</a></Link>
                                                </li>
                                                <li>
                                                    <Link href="/settings"><a><i className="fi fi-rr-settings" />Settings</a></Link>
                                                </li>
                                                <li className="hr"><span /></li>
                                                <li>
                                                    <Link href="/page-login"><a><i className="fi fi-rr-sign-out" />Logout</a></Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="burger-icon burger-icon-white" onClick={handleOpen}>
                                    <span className="burger-icon-top" /><span className="burger-icon-mid" /><span className="burger-icon-bottom" />
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="block-signin">
                                <Link href="/page-service-1"><a className="btn btn-default hover-up icon-arrow-right">Get Started</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    );
};

export default Header;