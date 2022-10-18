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

const ModalVideo = dynamic(import("react-modal-video"), {
    ssr: false,
});

function Home() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            {/* <Link href="/#">
                <a>Link</a></Link>
            </Link> */}
            <Layout>
                <Banner />
                <PortfolioLogos />
                <TabSection />
                <ServiceSection />
                <WhatWeDo />
                <OfferSliderSection />
                <TestimonialSliderSection />
                <BlogPosts />
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
                                            <p className="text-body-text color-gray-500">
                                                By clicking the button, you are
                                                agreeing with our
                                            </p>
                                            <Link href="/page-terms"><a>Term &amp; Conditions</a></Link>
                                            <div className="box-form-newsletter mt-30">
                                                <form className="form-newsletter">
                                                    <input className="input-newsletter"  placeholder="Enter you mail .." /><button className="btn btn-send" />
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-5 mt-30 mt-lg-0 mt-md-30 mt-sm-30 position-relative text-end">
                                            <div className="block-chart shape-1">
                                                <img src="/assets/imgs/template/chart.png" alt="Almadar Alshamel" />
                                            </div>
                                            <img className="img-responsive img-newsletter" src="assets/imgs/template/img-newsletter.png" alt="Almadar Alshamel" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen}
                    videoId="7e90gBu4pas"
                    onClose={() => setOpen(false)}
                />
            </Layout>

        </>
    )
}
Home.layout = "L2";
export default Home;