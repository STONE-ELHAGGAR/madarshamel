import Link from "next/link";

const ServiceDetails = ({children, bgColor, titleTab, pageLink, imgSrc}) => {
    const bgClass = "card-grid-1 bg-"+bgColor+" bg-business hover-up";
    return (
    <>
        <div className="col-lg-4 col-sm-12">
            <div className={bgClass}>
                <div className="grid-1-img">
                    <img src={imgSrc} alt="Almadar Alshamel" />
                </div>
                <h3 className="text-heading-3 mt-20">
                    {titleTab}
                </h3>
                <p className="text-body-excerpt mt-20">
                    {children}
                </p>
                {/*<div className="mt-30">
                    <Link href={pageLink}><a className="btn btn-default btn-white icon-arrow-right">Learn more</a></Link>
                </div>*/}
            </div>
        </div>
    </>
)}

export default ServiceDetails;