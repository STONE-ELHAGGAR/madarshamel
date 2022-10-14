import TestimonialSlider from "../slider/Testimonial";

const TestimonialSliderSection = () => {
    return(
        <section className="section-box">
            <div className="container mt-110">
                <div className="row">
                    <div className="col-lg-9 col-sm-8">
                        <h3 className="text-heading-1 mb-10">
                            Our Happy Customers
                        </h3>
                        <p className="text-body-lead-large color-gray-600">
                            Know about our clients, we are a woldwide
                            corporate brand
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mt-80">
                <TestimonialSlider />
            </div>
        </section>
    )
}

export default TestimonialSliderSection;