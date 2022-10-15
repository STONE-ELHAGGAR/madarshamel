import Link from "next/link";

const Banner = () => {
    return(
        <section className="section-box">
            <div className="banner-hero banner-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <h1 className="text-display-2">
                                We are
                                <span className="color-green-900"> awesome team </span>
                                for your business dream
                            </h1>
                            <p className="text-body-lead-large color-gray-500 mt-40 pr-40">
                                We can help you reach your distination and finish your papers in
                                your importation process.
                            </p>
                            <div className="mt-40">
                                <Link href="/page-service-1"><a className="btn btn-black icon-arrow-right-white">Get Start</a></Link>
                                <Link href="/page-about-1"><a className="btn btn-link icon-arrow-right color-gray-900 text-heading-6">Learn More</a></Link>
                            </div>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="banner-imgs">
                                <img className="img-responsive shape-2" alt="Madarshamel" src="/assets/imgs/page/homepage1/banner.webp" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
)
}

export default Banner;