import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Question from "./Question";
import TabDetails from "./TabDetails";
import useTranslation from "next-translate/useTranslation";

const TabSection = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    let {t} = useTranslation();

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };
    return (
    <section className="section-box">
        <Question q_1st_line={t("common:whyTrusted")} q_2nd_line={t("common:allOverTheWorld")}>
            {t("common:weCareSec")}
        </Question>
        <div className="container">
            <div className="text-center mt-90">
                <ul className="nav" role="tablist">
                    <li onClick={() => handleOnClick(1)}>
                        <span className={activeIndex === 1 ? "btn btn-default btn-bd-green-hover btn-select active" : "btn btn-default btn-bd-green-hover btn-select"}>{t("common:care")}</span>
                    </li>
                    <li onClick={() => handleOnClick(2)}>
                        <span className={activeIndex === 2 ? "btn btn-default btn-bd-green-hover btn-select active" : "btn btn-default btn-bd-green-hover btn-select"}>{t("common:honesty")}</span>
                    </li>
                    <li onClick={() => handleOnClick(3)}>
                        <span className={activeIndex === 3 ? "btn btn-default btn-bd-green-hover btn-select active" : "btn btn-default btn-bd-green-hover btn-select"}>{t("common:customerService")}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container">
            <div className="tab-content">
                <TabDetails
                    className={activeIndex === 1 ? "tab-pane fade  active show" : "tab-pane fade "}
                    bgColor="2"
                    titleTab={t("common:careIsOurMission")}
                    imageSrc="/assets/imgs/page/homepage1/img-1.png"
                >{t("common:tabSec1")}</TabDetails>
                <TabDetails
                    className={activeIndex === 2 ? "tab-pane fade  active show" : "tab-pane fade "}
                    bgColor="1"
                    titleTab={t("common:honestyIsOurAim")}
                    imageSrc="/assets/imgs/page/homepage1/img-1-2.jpg"
                >{t("common:tabSec2")}</TabDetails>
                <TabDetails
                    className={activeIndex === 3 ? "tab-pane fade  active show" : "tab-pane fade "}
                    bgColor="3"
                    titleTab={t("common:weWillHelpYou")}
                    imageSrc="/assets/imgs/page/homepage1/img-1-3.jpg"
                >{t("common:tabSec3")}</TabDetails>
            </div>
        </div>
    </section>
)
}

export default TabSection;