import Link from 'next/link';

const GameChanging = () => {return(
    <section className="section-box mt-100 bg-green-900 pt-90 pb-90">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-sm-12 col-12 block-gallery-1">
                    <div className="row">
                        <div className="col-lg-6"><img className="img-responsive mb-10" src="assets/imgs/page/about/2/img-2.png" alt="madarshamel" /><img className="img-responsive" src="assets/imgs/page/about/2/img-3.png" alt="madarshamel" /></div>
                        <div className="col-lg-6"><img className="img-responsive" src="assets/imgs/page/about/2/img-1.png" alt="madarshamel" /></div>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12 block-pl">
                    <h2 className="text-heading-1 color-white mb-30 mt-20">Our game-changing approach to working together</h2>
                    <p className="text-inter-lg">Check out stories from companies to get inspired by how much you can save using our platform that uses AI.</p>
                    <div className="mt-30">
                        <Link href="/page-service-1"><a className="btn btn-black text-body-text">Keep Reading</a></Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
)}

export default GameChanging;