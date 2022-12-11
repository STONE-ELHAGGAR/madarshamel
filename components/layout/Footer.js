/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import React, {useState, useEffect} from 'react';
import useTranslation from "next-translate/useTranslation";

const Footer = ({fb, twitter, insta, address, phone, email, logged}) => {
    let {t} = useTranslation();
    const [fbData, setfbData] = useState('');
    const [twitterData, settwitterData] = useState('');
    const [instaData, setinstaData] = useState('');
    const [addressData, setaddressData] = useState('');
    const [phoneData, setphoneData] = useState('');
    const [emailData, setemailData] = useState('');

    const getSettings = async () => {
    const homesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/homes/read', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
      });
    
      let resultData = await homesRequest.json();
      return resultData;
    }
    getSettings().
        then((result) => {
            setfbData(result.homes[0].fb);
            setinstaData(result.homes[0].insta);
            settwitterData(result.homes[0].twitter);
            setaddressData(result.homes[0].address);
            setphoneData(result.homes[0].phone);
            setemailData(result.homes[0].email);
        });
    return (
        <>
            <footer className="footer col-12 float-start mt-50">
                <div className="container">
                    {(!logged) ? (
                    <div className="footer-top">
                        <div className="row">
                            <div className="col-md-4 col-sm-6 text-center text-md-start">
                            </div>
                            <div className="col-md-8 col-sm-6 text-center text-md-end">
                                <span className="color-gray-900 text-heading-6 mr-30 text-mb-sm-20">{t("common:readyStart")}</span>
                                <Link href="/page-signup">
                                    <a className="btn btn-square">{t("common:signUp")}</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    ) : ''}
                    <div className="row">
                        <div className="col-lg-3 width-20 mb-30">
                            <h4 className="text-heading-5">{t("common:contact")}</h4>
                            <div className="mt-20 text-body-text color-gray-600 mb-20">{t("common:address")}</div>
                            <div className="mt-20 text-body-text color-gray-600">{t("common:phone")}</div>
                            <div className="text-body-text color-gray-600">{t("common:email")}</div>
                        </div>
                        <div className="col-lg-6 width-20 mb-30">
                            <h4 className="text-heading-5">{t("common:support")}</h4>
                            <ul className="menu-footer mt-20">
                                <li>
                                    <Link href="/page-contact">
                                        <a>{t("common:contact")}</a>
                                    </Link>
                                </li>
                                <p>{t("common:orlogintostartlivechatwithourteam")}</p>
                            </ul>
                        </div>
                        <div className="col-lg-6 width-16">
                            <h4 className="text-heading-5">{t("common:usefulLinks")}</h4>
                            <ul className="menu-footer mt-20">
                                <li>
                                    <Link href="/page-signup">
                                        <a>{t("common:signUp")}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/page-login">
                                        <a>{t("common:logIn")}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/page-reset">
                                        <a>{t("common:resetPassword")}</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom mt-20">
                        <div className="row">
                            <div className="col-md-6">
                                <span className="color-gray-400 text-body-lead">© Madarshamel 2022</span>
                            </div>
                            <div className="col-md-6 text-center text-lg-end text-md-end">
                                <div className="footer-social">
                                    <Link href={fbData}>
                                        <a className="icon-socials icon-facebook"></a>
                                    </Link>
                                    <Link href={twitterData}>
                                        <a className="icon-socials icon-twitter"></a>
                                    </Link>
                                    <Link href={instaData}>
                                        <a className="icon-socials icon-instagram"></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;