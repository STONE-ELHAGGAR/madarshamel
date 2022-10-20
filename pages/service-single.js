/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../components/layout/Layout";


function BlogSingle() {
    return (
        <>
            <Layout>
                <div>
                    <section className="section-box">
                        <div className="banner-hero banner-head-image" style={{ background: 'url(assets/imgs/page/blog/single/shipping.jpg)' }}>
                            <div className="container">
                                <div className="text-center">
                                    <h1 className="text-heading-1 color-white mt-30">Replaceable Title (Custom Clearance, Transportation, International Shipping)</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-50 mb-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2" />
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-7 col-sm-7 col-7">
                                            <div className="blog-img-user">
                                                <div className="img-user img-user-round"><img src="/assets/imgs/template/ava_1.png" alt="Madarshamel" /></div>
                                                <h4 className="text-body-lead color-gray-900">Hossam</h4>
                                                <p className="text-body-small color-gray-500">August 25, 2022</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2" />
                                <div className="col-lg-8">
                                    <div className="single-detail mt-50">
                                        <p />
                                        <p>
                                            Replacable text you can edit later from admin panel
                                            replacable text you can edit later from admin panel
                                            replacable text you can edit later from admin panel
                                            replacable text you can edit later from admin panel
                                            replacable text you can edit later from admin panel
                                            replacable text you can edit later from admin panel
                                            replacable text you can edit later from admin panel
                                            replacable text you can edit later from admin panel.
                                        </p>
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

export default BlogSingle;