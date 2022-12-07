/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
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
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            {/* <Link href="/#">
                <a>Link</a></Link>
            </Link> */}
            <Layout>
                <Banner bannerDesc={content.homes[0].bannerDesc} />
                <PortfolioLogos
                    img1={content.homes[0].img1}
                    img2={content.homes[0].img2}
                    img3={content.homes[0].img3}
                    img4={content.homes[0].img4}
                    img5={content.homes[0].img5}
                    img6={content.homes[0].img6}
                />
                <TabSection
                  tabSec1={content.homes[0].tabSec1}
                  tabSec2={content.homes[0].tabSec2}
                  tabSec3={content.homes[0].tabSec3}  />
                <ServiceSection />
                <WhatWeDo />
                <OfferSliderSection />
                <TestimonialSliderSection
                _1st={{
                    name: content.homes[0]._1stname,
                    company: content.homes[0]._1stcompany,
                    quote: content.homes[0]._1stquote,
                    bg: ""
                }}
                _2nd={{
                    name: content.homes[0]._2ndname,
                    company: content.homes[0]._2ndcompany,
                    quote: content.homes[0]._2ndquote,
                    bg: "bd-bg-6"
                }}
                _3rd={{
                    name: content.homes[0]._3rdname,
                    company: content.homes[0]._3rdcompany,
                    quote: content.homes[0]._3rdquote,
                    bg: "bd-bg-10"
                }}
                _4th={{
                    name: content.homes[0]._4thname,
                    company: content.homes[0]._4thcompany,
                    quote: content.homes[0]._4thquote,
                    bg: "bd-bg-6"
                }} />
                <section className="section-box overflow-visible mb-100">
                    <div className="container mt-100">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="bg-2 box-newsletter position-relative">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-7">
                                            <span className="text-body-capitalized color-gray-500 text-uppercase">newsletter</span>
                                            <h4 className="text-heading-2 mb-10 mt-10">
                                                Subscribe our newsletter
                                            </h4>
                                            <Link href="/page-signup"><a className="btn btn-square">Register</a></Link>
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