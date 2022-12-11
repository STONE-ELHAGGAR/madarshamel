import Link from "next/link";
import Question from "./Question";
import ServiceDetails from "./ServiceDetails";
import useTranslation from "next-translate/useTranslation";

const ServiceSection = () => {
    let {t} = useTranslation();
    return (
        <section className="section-box">
        <Question q_1st_line={t("common:weCreateGreatness")} q_2nd_line={t("common:byOurWork")}>
            {t("common:uiSec")}
        </Question>
        <div className="container mt-70">
            <div className="row">
                <ServiceDetails
                    titleTab={t("common:freeConsultants")}
                    bgColor="5"
                    pageLink="/#"
                    imgSrc="/assets/imgs/page/homepage1/business-strategy.svg"
                >{t("common:freeConsultantsDesc")}</ServiceDetails>
                <ServiceDetails
                    titleTab={t("common:customsClearanceOfYourImports")}
                    bgColor="9"
                    pageLink="/#"
                    imgSrc="/assets/imgs/page/homepage1/local.svg"
                >{t("common:customsClearanceOfYourImportsDesc")}</ServiceDetails>
                <ServiceDetails
                    titleTab={t("common:cargoTransportation")}
                    bgColor="2"
                    pageLink="/#"
                    imgSrc="/assets/imgs/page/homepage1/social.svg"
                >{t("common:cargoTransportationDesc")}</ServiceDetails>
            </div>
        </div>
    </section>
)
}

export default ServiceSection;