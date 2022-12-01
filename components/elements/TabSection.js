import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Question from "./Question";
import TabDetails from "./TabDetails";

const TabSection = ({tabSec1, tabSec2, tabSec3}) => {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };
    return (
    <section className="section-box">
        <Question q_1st_line='See why we are trusted' q_2nd_line='all over the world'>
            We care about preserving your products by providing the appropriate
            temperatures if they are foods, or preserving them from damage if
            they are subject to breakage or cutting.
        </Question>
        <div className="container">
            <div className="text-center mt-90">
                <ul className="nav" role="tablist">
                    <li onClick={() => handleOnClick(1)}>
                        <span className={activeIndex === 1 ? "btn btn-default btn-bd-green-hover btn-select active" : "btn btn-default btn-bd-green-hover btn-select"}>Care</span>
                    </li>
                    <li onClick={() => handleOnClick(2)}>
                        <span className={activeIndex === 2 ? "btn btn-default btn-bd-green-hover btn-select active" : "btn btn-default btn-bd-green-hover btn-select"}>Honesty</span>
                    </li>
                    <li onClick={() => handleOnClick(3)}>
                        <span className={activeIndex === 3 ? "btn btn-default btn-bd-green-hover btn-select active" : "btn btn-default btn-bd-green-hover btn-select"}>Customer Service</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container">
            <div className="tab-content">
                <TabDetails
                    className={activeIndex === 1 ? "tab-pane fade  active show" : "tab-pane fade "}
                    bgColor="2"
                    titleTab="Care is our mission"
                    imageSrc="/assets/imgs/page/homepage1/img-1.png"
                >{tabSec1}</TabDetails>
                <TabDetails
                    className={activeIndex === 2 ? "tab-pane fade  active show" : "tab-pane fade "}
                    bgColor="1"
                    titleTab="Honesty is our aim"
                    imageSrc="/assets/imgs/page/homepage1/img-1-2.jpg"
                >{tabSec2}</TabDetails>
                <TabDetails
                    className={activeIndex === 3 ? "tab-pane fade  active show" : "tab-pane fade "}
                    bgColor="3"
                    titleTab="We will help you"
                    imageSrc="/assets/imgs/page/homepage1/img-1-3.jpg"
                >{tabSec3}</TabDetails>
            </div>
        </div>
    </section>
)
}

export default TabSection;