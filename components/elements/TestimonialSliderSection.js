import TestimonialSlider from "../slider/Testimonial";
import useTranslation from "next-translate/useTranslation";

const TestimonialSliderSection = ({_1st, _2nd, _3rd, _4th}) => {
    let {t} = useTranslation();
    return(
        <section className="section-box">
            <div className="container mt-110">
                <div className="row">
                    <div className="col-lg-9 col-sm-8">
                        <h3 className="text-heading-1 mb-10">
                            {t("common:ourHappyCustomers")}
                        </h3>
                        <p className="text-body-lead-large color-gray-600">
                            {t("common:ourHappyCustomersDesc")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mt-80">
                <TestimonialSlider _1st={_1st} _2nd={_2nd} _3rd={_3rd} _4th={_4th} />
            </div>
        </section>
    )
}

export default TestimonialSliderSection;