import Image from "next/image";

const TabDetails = ({children, bgColor, titleTab, imageSrc, className}) => {
    const bgClass = "bg-"+bgColor+" panel-box mt-50";
    return (
        <div className={className}>
            <div className={bgClass}>
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <div className="box-optimized">
                            <h3 className="text-heading-2">
                                {titleTab}
                            </h3>
                            <p className="text-body-excerpt mt-30">
                                {children}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="block-video icon-pattern">
                            <Image width="635px" height="500px" className="img-responsive" src={imageSrc} alt={titleTab} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
)}

export default TabDetails;