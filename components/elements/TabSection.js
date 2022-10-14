import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Question from "./Question";
import TabDetails from "./TabDetails";

const TabSection = () => {
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
                        <Link href="/#tab-1">
                            <a className={activeIndex === 1 ? "btn btn-default btn-bd-green-hover btn-select active" : "btn btn-default btn-bd-green-hover btn-select"}>Care</a>
                        </Link>
                    </li>
                    <li onClick={() => handleOnClick(2)}>
                        <Link href="/#tab-2">
                            <a className={activeIndex === 2 ? "btn btn-default btn-bd-green-hover btn-select active" : "btn btn-default btn-bd-green-hover btn-select"}>Honesty</a>
                        </Link>
                    </li>
                    <li onClick={() => handleOnClick(3)}>
                        <Link href="/#tab-3">
                            <a className={activeIndex === 3 ? "btn btn-default btn-bd-green-hover btn-select active" : "btn btn-default btn-bd-green-hover btn-select"}>Customer Service</a>
                        </Link>
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
                >
                    We care about preserving your products
                    by providing the appropriate temperatures
                    if they are foods, or preserving them from
                    damage if they are subject to breakage or
                    cutting, By offering the best service in
                    storages while we finish your papers.
                </TabDetails>
                <TabDetails
                    className={activeIndex === 2 ? "tab-pane fade  active show" : "tab-pane fade "}
                    bgColor="1"
                    titleTab="Honesty is our aim"
                    imageSrc="/assets/imgs/page/homepage1/img-1-2.jpg"
                >
                    We pledge to keep your shipments completely
                    safe as we received them without shortages
                    or damages.
                </TabDetails>
                <TabDetails
                    className={activeIndex === 3 ? "tab-pane fade  active show" : "tab-pane fade "}
                    bgColor="3"
                    titleTab="We will help you"
                    imageSrc="/assets/imgs/page/homepage1/img-1-3.jpg"
                >
                    We need you to rest in safe We have live chat service
                    24/7 for our customers and if you are new you can get
                    a FREE Consoultant with our free chat service.
                </TabDetails>
            </div>
        </div>
    </section>
)
}

export default TabSection;