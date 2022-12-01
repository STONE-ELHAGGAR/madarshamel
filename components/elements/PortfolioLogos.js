import Link from "next/link";
import Image from "next/image";

const PortfolioLogos = ({img1, img2, img3, img4, img5, img6}) => {
    return (
    <div className="section-box overflow-visible mt-70">
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <span className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src={img1} /></span>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <span className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src={img2} /></span>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <span className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src={img3} /></span>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <span className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src={img4} /></span>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <span className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src={img5} /></span>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <span className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src={img6} /></span>
                </div>
            </div>
        </div>
    </div>
)
}

export default PortfolioLogos;