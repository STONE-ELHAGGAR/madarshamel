import Link from "next/link";
import Image from "next/image";

const Banner = ({bannerDesc}) => {
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
                                {bannerDesc}
                            </p>
                            <div className="mt-40">
                                <Link href="/page-signup"><a className="btn btn-black icon-arrow-right-white">Get Start</a></Link>
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