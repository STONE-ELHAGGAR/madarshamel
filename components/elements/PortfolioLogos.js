import Link from "next/link";
import Image from "next/image";

const PortfolioLogos = () => {
    return (
    <div className="section-box overflow-visible mt-70">
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <Link href="/#"><a className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src="/assets/imgs/slider/logo/sample-logo-1.png" /></a></Link>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <Link href="/#"><a className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src="/assets/imgs/slider/logo/sample-logo-2.png" /></a></Link>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <Link href="/#"><a className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src="/assets/imgs/slider/logo/sample-logo-3.png" /></a></Link>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <Link href="/#"><a className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src="/assets/imgs/slider/logo/sample-logo-4.png" /></a></Link>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <Link href="/#"><a className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src="/assets/imgs/slider/logo/sample-logo-5.png" /></a></Link>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                    <Link href="/#"><a className="item-logo box-hover-shadow hover-up"><Image width="166px" height="38px" alt="Almadar Alshamel" src="/assets/imgs/slider/logo/sample-logo-6.png" /></a></Link>
                </div>
            </div>
        </div>
    </div>
)
}

export default PortfolioLogos;