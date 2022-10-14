import Link from "next/link";
import Question from "./Question";
import ServiceDetails from "./ServiceDetails";

const ServiceSection = () => {
    return (
        <section className="section-box">
        <Question q_1st_line='We create Greatness' q_2nd_line='by our work'>
            Interactive userface, The best service
            and We are her for you
        </Question>
        <div className="container mt-70">
            <div className="row">
                <ServiceDetails
                    titleTab="Free Consultants"
                    bgColor="5"
                    pageLink="/page-about-1"
                    imgSrc="/assets/imgs/page/homepage1/business-strategy.svg"
                >
                    Get a free consultation from our customer service available 24/7.
                </ServiceDetails>
                <ServiceDetails
                    titleTab="Customs clearance of your imports"
                    bgColor="9"
                    pageLink="/page-about-2"
                    imgSrc="/assets/imgs/page/homepage1/local.svg"
                >
                    The cheapest
                    solution to obtain customs clearance for
                    your imports.
                </ServiceDetails>
                <ServiceDetails
                    titleTab="Cargo transportation"
                    bgColor="2"
                    pageLink="/page-about-3"
                    imgSrc="/assets/imgs/page/homepage1/social.svg"
                >
                    Fastest and safest way to transport your
                    products and maintain their quality.
                </ServiceDetails>
            </div>
        </div>
    </section>
)
}

export default ServiceSection;