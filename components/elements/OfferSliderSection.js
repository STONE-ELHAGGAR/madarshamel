import OfferSlider from "../slider/Offer";
import useTranslation from "next-translate/useTranslation";

const OfferSliderSection = () => {
    let {t} = useTranslation();
return(
    <section className="section-box">
        <div className="container mt-120">
            <div className="bg-2 bdrd-58 pattern-white pb-60">
                <div className="row">
                    <div className="col-lg-2 col-sm-1 col-12" />
                    <div className="col-lg-8 col-sm-10 col-12 text-center mt-70">
                        <h2 className="text-heading-1 color-gray-900">
                            {t("common:whatWeOffer")}
                        </h2>
                        <p className="text-body-lead-large color-gray-600 mt-20">
                            {t("common:whatWeOfferDesc")}
                        </p>
                    </div>
                    <div className="col-lg-2 col-sm-1 col-12" />
                </div>
                <div className="container mt-70">
                    <OfferSlider/>
                </div>
            </div>
        </div>
    </section>
)
}

export default OfferSliderSection;