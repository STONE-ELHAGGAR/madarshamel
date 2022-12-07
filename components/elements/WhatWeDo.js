import Image from "next/image";

const WhatWeDo = () => {
    return(
    <section className="section-box">
        <div className="container mt-100">
            <div className="row">
                <div className="col-lg-6 col-sm-12 block-img-we-do">
                    <Image width="618px" height="716px" className="bdrd-16 img-responsive" src="/assets/imgs/page/homepage1/img-2.png" alt="Almadar Alshamel" />
                </div>
                <div className="col-lg-6 col-sm-12 block-we-do">
                    <span className="tag-1">What We Do, What You Get</span>
                    <h3 className="text-heading-1 mt-30">
                        We believe that our works can contribute to a
                        better world.
                    </h3>
                    <p className="text-body-lead-large color-gray-600 mt-30">
                        Necessary to deliver your products in the best
                        case without any damage + fastest way and
                        and help you improve your business.
                    </p>
                    <div className="line-bd-green mt-50" />
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-12 mt-50">
                            <h4 className="text-heading-6 icon-leaf">
                                Boost your sale
                            </h4>
                            <p className="text-body-excerpt color-gray-600 mt-15">
                                By keeping your products safe.
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-12 mt-50">
                            <h4 className="text-heading-6 icon-leaf">
                                Smart Tools
                            </h4>
                            <p className="text-body-excerpt color-gray-600 mt-15">
                                Using our platform we will
                                offer you smart the best tracking
                                process using AI.
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-12 mt-50">
                            <h4 className="text-heading-6 icon-leaf">
                                Experts
                            </h4>
                            <p className="text-body-excerpt color-gray-600 mt-15">
                                Free advice from our experts.
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-12 mt-50">
                            <h4 className="text-heading-6 icon-leaf">
                                Dynamic Boosting
                            </h4>
                            <p className="text-body-excerpt color-gray-600 mt-15">
                                We will help you organize your shipments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)}

export default WhatWeDo;