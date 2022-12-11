import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

const WhatWeDo = () => {
    let {t} = useTranslation();
    return(
    <section className="section-box">
        <div className="container mt-100">
            <div className="row">
                <div className="col-lg-6 col-sm-12 block-img-we-do">
                    <Image width="618px" height="716px" className="bdrd-16 img-responsive" src="/assets/imgs/page/homepage1/img-2.png" alt="Almadar Alshamel" />
                </div>
                <div className="col-lg-6 col-sm-12 block-we-do">
                    <span className="tag-1">{t("common:whatWeDoWhatYouGet")}</span>
                    <h3 className="text-heading-1 mt-30">{t("common:weBelieve")}</h3>
                    <p className="text-body-lead-large color-gray-600 mt-30">{t("common:weBelieveDesc")}</p>
                    <div className="line-bd-green mt-50" />
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-12 mt-50">
                            <h4 className="text-heading-6 icon-leaf">
                                {t("common:boostYourSale")}
                            </h4>
                            <p className="text-body-excerpt color-gray-600 mt-15">
                                {t("common:keepSafe")}
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-12 mt-50">
                            <h4 className="text-heading-6 icon-leaf">
                                {t("common:smartTools")}
                            </h4>
                            <p className="text-body-excerpt color-gray-600 mt-15">
                                {t("common:smartToolsDesc")}
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-12 mt-50">
                            <h4 className="text-heading-6 icon-leaf">
                                {t("common:experts")}
                            </h4>
                            <p className="text-body-excerpt color-gray-600 mt-15">
                                {t("common:freeAdvice")}
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-12 mt-50">
                            <h4 className="text-heading-6 icon-leaf">
                                {t("common:dynamicBoosting")}
                            </h4>
                            <p className="text-body-excerpt color-gray-600 mt-15">
                                {t("common:dynamicBoostingDesc")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)}

export default WhatWeDo;