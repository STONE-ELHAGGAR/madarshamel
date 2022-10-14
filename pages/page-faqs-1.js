/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Accordion from "../components/elements/Accordion";
import Layout from "../components/layout/Layout";

function Faq1() {
  
    return (
        <>

            <Layout headerStyle={"header-style-5"}>
                <div>
                    <section className="section-box">
                        <div className="banner-hero banner-faqs-1">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <h1 className="text-display-3 color-white mb-30">We are here to help you</h1>
                                        <div className="form-round">
                                            <form className="form-inline" action="#"><input className="form-control input-round"  placeholder="Ark a questions..." /><input className="btn btn-round-icon" type="submit"  /></form>
                                        </div>
                                        <p className="text-body-lead color-white mt-40">We are collect your searching keywords to improve our services</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2 col-sm-1 col-12" />
                                <div className="col-lg-8 col-sm-10 col-12 text-center">
                                    <h2 className="text-heading-1 color-gray-900">Replacable Text</h2>
                                    <p className="text-body-lead-large color-gray-600 mt-20">Replaceable text for later usage from admin panel.</p>
                                </div>
                                <div className="col-lg-2 col-sm-1 col-12" />
                            </div>
                        </div>
                        <div className="container mt-70">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                    <div className="card-grid-style-6 hover-up wow animate__animated animate__fadeIn" data-wow-delay=".1s">
                                        <div className="grid-6-img"><img src="/assets/imgs/page/homepage1/market.svg" alt="Agon" /></div>
                                        <h3 className="text-heading-5 mt-20">Replaceable</h3>
                                        <p className="text-body-text color-gray-600 mt-20">Replaceable text for later usage from admin panel.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                    <div className="card-grid-style-6 hover-up wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                                        <div className="grid-6-img"><img src="/assets/imgs/page/homepage1/consulting.svg" alt="Agon" /></div>
                                        <h3 className="text-heading-5 mt-20">Replaceable</h3>
                                        <p className="text-body-text color-gray-600 mt-20">Replaceable text for later usage from admin panel.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                    <div className="card-grid-style-6 hover-up wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                                        <div className="grid-6-img"><img src="/assets/imgs/page/homepage1/cognity.svg" alt="Agon" /></div>
                                        <h3 className="text-heading-5 mt-20">Replaceable</h3>
                                        <p className="text-body-text color-gray-600 mt-20">Replaceable text for later usage from admin panel.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box pt-140 pb-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5 mb-40">
                                    <h3 className="text-heading-1">Replacable</h3>
                                    <p className="text-body-text color-gray-600 mt-30">Feeling inquisitive? Have a read through some of our FAQs or contact our supporters for help</p>
                                    <div className="row">
                                        <div className="col-lg-12 mt-50">
                                            <h4 className="text-heading-6 icon-leaf">Replacable</h4>
                                            <p className="text-body-excerpt color-gray-600 mt-15">Replaceable text for later usage from admin panel.</p>
                                        </div>
                                        <div className="col-lg-12 mt-50">
                                            <h4 className="text-heading-6 icon-leaf">Replacable</h4>
                                            <p className="text-body-excerpt color-gray-600 mt-15">Replaceable text for later usage from admin panel.</p>
                                        </div>
                                    </div>
                                    <div className="mt-60">
                                        <Link href="/page-contact"><a className="btn btn-black icon-arrow-right-white">Contact Us</a></Link>

                                        <Link href="/page-login"><a className="btn btn-link text-heading-6">Support Center</a></Link>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                   <Accordion/>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section className="section-box mt-100">
                        <div className="container text-center">
                            <h3 className="text-heading-1 mb-10">Still have a questions?</h3>
                            <p className="text-body-lead-large color-gray-600 mt-30">If you cannot find answer to your question in our FAQ, you can always<br className="d-lg-block d-none" />contact us. We will answer to you shortly! Meet our Support team</p>
                        </div>
                        <div className="container mt-70">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="card-grid-style-3 hover-up wow animate__animated animate__fadeIn" data-wow-delay=".1s">
                                        <div className="grid-3-img"><img src="/assets/imgs/page/homepage1/user-1.png" alt="Agon" /></div>
                                        <h3 className="text-heading-6 mb-5 mt-20">Wade Warren</h3><span className="text-body-small d-block">Louis Vuitton</span>
                                        <p className="text-body-text text-desc color-gray-500 mt-20">Simple text that can be replaced later.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="card-grid-style-3 bd-bg-6 hover-up wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                                        <div className="grid-3-img"><img src="/assets/imgs/page/homepage1/user-2.png" alt="Agon" /></div>
                                        <h3 className="text-heading-5 mt-20">Brooklyn Simmons</h3><span className="text-body-small d-block">Nintendo</span>
                                        <p className="text-body-text text-desc color-gray-500 mt-20">Simple text that can be replaced later.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="card-grid-style-3 bd-bg-10 hover-up wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                                        <div className="grid-3-img"><img src="/assets/imgs/page/homepage1/user-3.png" alt="Agon" /></div>
                                        <h3 className="text-heading-6 mb-5 mt-20">Jenny Wilson</h3><span className="text-body-small d-block">Starbucks</span>
                                        <p className="text-body-text text-desc color-gray-500 mt-20">Simple text that can be replaced later.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="card-grid-style-3 bd-bg-9 hover-up wow animate__animated animate__fadeIn" data-wow-delay=".7s">
                                        <div className="grid-3-img"><img src="/assets/imgs/page/homepage1/user-4.png" alt="Agon" /></div>
                                        <h3 className="text-heading-5 mt-20">Albert Flores</h3><span className="text-body-small d-block">Bank of America</span>
                                        <p className="text-body-text text-desc color-gray-500 mt-20">Simple text that can be replaced later.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </Layout>

        </>
    )
}

export default Faq1;