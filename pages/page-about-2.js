/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import Accordion from "../components/elements/Accordion";
import Layout from "../components/layout/Layout";
import TestimonialSlider from "../components/slider/Testimonial";
import BlogPosts from "../components/elements/BlogPosts";
import HowItWorks from "../components/elements/HowItWorks";
import GameChanging from "../components/elements/GameChanging";
import Question from "../components/elements/Question";


function About2() {
    return (
        <>
            <Layout>
                <section className="section-box">
                    <div className="banner-hero bg-about-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 box-banner-left"><span className="tag-1 bg-6 color-green-900">What We Do, What You Get</span>
                                    <h1 className="text-display-3 mt-30">Develop your business today</h1>
                                    <p className="text-body-lead-large color-gray-500 mt-40 pr-40">Integrated workflow designed for logistics.<br className="d-lg-block d-none" />We do customs clearance, transportation,<br className="d-lg-block d-none" />shipping and warehousing for you.</p>
                                    <div className="mt-40">
                                        <Link href="/page-contact"><a className="btn btn-link color-gray-900 icon-arrow-right text-heading-6">Contact Us</a></Link>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-none d-lg-block">
                                    <div className="banner-imgs">
                                        <div className="block-1 shape-2"><Image width="500px" height="500px" src="/assets/imgs/page/about/2/banner.png" alt="madarshamel" /></div>
                                        <div className="float-end col-lg-6 mt-90">
                                            <div className="list-icons mt-50">
                                                <div className="item-icon none-bd"><span className="icon-left"><img src="/assets/imgs/page/about/2/icon-project-done.svg" alt="madarshamel" /></span>
                                                    <h4 className="text-heading-4"><span className="text-heading-3 color-green-900">+<span className="count">12</span>k</span></h4>
                                                    <p className="text-body-text color-gray-500">Projects done</p>
                                                </div>
                                                <div className="item-icon none-bd"><span className="icon-left"><img src="/assets/imgs/page/about/2/icon-officer.svg" alt="madarshamel" /></span>
                                                    <h4 className="text-heading-4"><span className="text-heading-3 color-green-900">+<span className="count">28</span>k</span></h4>
                                                    <p className="text-body-text color-gray-500">Offices</p>
                                                </div>
                                                <div className="item-icon none-bd"><span className="icon-left"><img src="/assets/imgs/page/about/2/icon-constant.svg" alt="madarshamel" /></span>
                                                    <h4 className="text-heading-4"><span className="text-heading-3 color-green-900">+<span className="count">15</span>k</span></h4>
                                                    <p className="text-body-text color-gray-500">Constant clients</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <HowItWorks />
                <GameChanging />
                <BlogPosts />
                <section className="section-box mt-100">
                    <Question q_1st_line='Frequently asked questions' q_2nd_line='Feeling inquisitive?'>
                        Have a read through some of our
                        FAQs or contact our supporters
                        for help.
                    </Question>
                    <div className="container mt-70">
                        <div className="row">
                            <div className="col-lg-1" />
                            <div className="col-lg-10">
                                <div className="row">
                                    <div className="col-lg-4 mb-50">
                                        <h4 className="text-heading-6 icon-leaf">People first</h4>
                                        <p className="text-body-excerpt color-gray-600 mt-15">You deserve the best service and we are here to offer it.</p>
                                    </div>
                                    <div className="col-lg-4 mb-50">
                                        <h4 className="text-heading-6 icon-leaf">Agile approach</h4>
                                        <p className="text-body-excerpt color-gray-600 mt-15">We take an AI-powered approach.</p>
                                    </div>
                                    <div className="col-lg-4 mb-50">
                                        <h4 className="text-heading-6 icon-leaf">New mindset</h4>
                                        <p className="text-body-excerpt color-gray-600 mt-15">All users get the same proffesional service using same platform.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mt-50">
                                        <Accordion/>
                                        <div className="mt-100 text-center">
                                            <Link href="/#"><a className="btn btn-black text-heading-6">Support Center</a></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-1" />
                        </div>
                    </div>
                </section>
                <section className="section-box box-gray-100 mt-120 mb-20">
                    <div className="container">
                        <div className="icon-wave">
                            <div className="row">
                                <div className="col-lg-12 mb-60"><span className="text-body-capitalized text-uppercase">Contact us</span>
                                    <h2 className="text-heading-3 color-gray-900 mt-10">Have an project in mind?</h2>
                                    <p className="text-body-text color-gray-600 mt-20">The right move at the right time saves your investment.<br className="d-lg-block d-none" />live the dream of expanding your business.</p>
                                </div>
                                <div className="col-lg-4 mb-40">
                                    <h4 className="text-heading-6 color-gray-900 icon-home mb-10 mt-10">Madar Shamel</h4>
                                    <p className="text-body-text color-gray-600">Jeddah<br />KSA</p>
                                    <p className="text-body-text color-gray-600">+(966) 556-565-564</p>
                                    <p className="text-body-text color-gray-600">cs@madarshamel.sa</p>
                                </div>
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group"><input className="form-control"  placeholder="Enter your name" /></div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input className="form-control"  placeholder="Comapy (optioanl)" /></div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input className="form-control"  placeholder="Your email" /></div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input className="form-control"  placeholder="Phone number" /></div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group"><textarea className="form-control" placeholder="Tell us about yourself" /></div>
                                        </div>
                                        <div className="col-lg-12 mt-15"><button className="btn btn-black icon-arrow-right-white mr-40 mb-20" type="submit">Send Message</button><br className="d-lg-none d-block" /><span className="text-body-text-md color-gray-500 mb-20">By clicking contact us button, you agree our terms and policy,</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box">
                    <div className="container mt-100">
                        <div className="row">
                            <div className="col-lg-9 col-sm-8">
                                <h3 className="text-heading-1 mb-10">Our Happy Customers</h3>
                                <p className="text-body-lead-large color-gray-600">Know about our clients, we are a woldwide corporate brand</p>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-80">
                        <TestimonialSlider />
                    </div>
                </section>

            </Layout>

        </>
    )
}

export default About2;