import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

const Banner = () => {
    let {t} = useTranslation();
    return( 
        <section className="section-box">
            <div className="banner-hero banner-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <h1 className="text-display-2">
                                {t("common:weAre")}
                                <span className="color-green-900"> {t("common:aweasomTeam")} </span>
                                {t("common:forYourBusinessDream")}
                            </h1>
                            <p className="text-body-lead-large color-gray-500 mt-40 pr-40">
                                {t("common:bannerDesc")}
                            </p>
                            <div className="mt-40">
                                <Link href="/page-signup"><a className="btn btn-black icon-arrow-right-white">{t("common:getStart")}</a></Link>
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