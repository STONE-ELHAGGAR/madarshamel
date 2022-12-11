/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import Layout from "../components/layout/Layout";
import Banner from "../components/elements/Banner";
import PortfolioLogos from "../components/elements/PortfolioLogos";
import Question from "../components/elements/Question";
import TabSection from "../components/elements/TabSection";
import TestimonialSliderSection from "../components/elements/TestimonialSliderSection";
import ServiceSection from "../components/elements/ServiceSection";
import WhatWeDo from "../components/elements/WhatWeDo";
import BlogPosts from "../components/elements/BlogPosts";
import OfferSliderSection from "../components/elements/OfferSliderSection";

/*const ModalVideo = dynamic(import("react-modal-video"), {
    ssr: false,
});*/

function Home({content}) {
    const router = useRouter();
    const [isOpen, setOpen] = useState(false);
    let {t} = useTranslation();
    return (
        <>
            {/* <Link href="/#">
                <a>Link</a></Link>
            </Link>router.locale */}
            <Layout>
                <Banner />
                <PortfolioLogos
                    img1={t("common:img1")}
                    img2={t("common:img2")}
                    img3={t("common:img3")}
                    img4={t("common:img4")}
                    img5={t("common:img5")}
                    img6={t("common:img6")}
                />
                <TabSection />
                <ServiceSection />
                <WhatWeDo />
                <OfferSliderSection />
                <TestimonialSliderSection
                _1st={{
                    name: t("common:_1stname"),
                    company: t("common:_1stcompany"),
                    quote: t("common:_1stquote"),
                    bg: ""
                }}
                _2nd={{
                    name: t("common:_2ndname"),
                    company: t("common:_2ndcompany"),
                    quote: t("common:_2ndquote"),
                    bg: "bd-bg-6"
                }}
                _3rd={{
                    name: t("common:_3rdname"),
                    company: t("common:_3rdcompany"),
                    quote: t("common:_3rdquote"),
                    bg: "bd-bg-10"
                }}
                _4th={{
                    name: t("common:_4thname"),
                    company: t("common:_4thcompany"),
                    quote: t("common:_4thquote"),
                    bg: "bd-bg-6"
                }} />
                <section className="section-box overflow-visible mb-100">
                    <div className="container mt-100">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="bg-2 box-newsletter position-relative">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-7">
                                            <span className="text-body-capitalized color-gray-500 text-uppercase">{t("common:newsletter")}</span>
                                            <h4 className="text-heading-2 mb-10 mt-10">
                                                {t("common:subscribeOurNewsletter")}
                                            </h4>
                                            <Link href="/page-signup"><a className="btn btn-square">{t("common:signUp")}</a></Link>
                                        </div>
                                        <div className="col-lg-7 col-md-5 mt-30 mt-lg-0 mt-md-30 mt-sm-30 position-relative text-end">
                                            <div className="block-chart shape-1">
                                                <Image width="255px" height="193px" src="/assets/imgs/template/chart.png" alt="Almadar Alshamel" />
                                            </div>
                                            <Image width="332px" height="403px" className="img-responsive img-newsletter" src="/assets/imgs/template/img-newsletter.png" alt="Almadar Alshamel" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen}
                    videoId="7e90gBu4pas"
                    onClose={() => setOpen(false)}
                />*/}
            </Layout>

        </>
    )
}
Home.layout = "L2";
export default Home;

export async function getServerSideProps(context) {
    const homesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/homes/read', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
    });
  
    let resultData = await homesRequest.json();
    return {
      props:{
        content: resultData
      }
    }
  } 