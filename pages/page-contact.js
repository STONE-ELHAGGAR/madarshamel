import Layout from "../components/layout/Layout";


function Contact() {
    const handleSendRequest = async (e) => {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let company = document.getElementById('company').value;
        let mobile = document.getElementById('mobile').value;
        let email = document.getElementById('email').value;
        let desc = document.getElementById('desc').value;
        let bodyRequest = {
            name: name,
            company: company,
            mobile: mobile,
            email: email,
            desc: desc
            };
        const contactRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/contact/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyRequest)
        });

    const content = await contactRequest.json();
    if(content.success){
        document.getElementById('name').value = '';
        document.getElementById('company').value = '';
        document.getElementById('email').value = '';
        document.getElementById('desc').value = '';
        document.getElementById('mobile').value = '';
        document.querySelector(".alert-data").innerHTML = '<div class="alert alert-success" role="alert">We have recived your message ... You`ll reach a call or an email from us ASAP.</div>';
    }else{
        document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again later.</div>';
    }
    }
    return (
        <>
            <Layout>
                <section className="section-box">
                    <div className="banner-hero banner-breadcrums">
                        <div className="container text-center">
                            <h1 className="text-heading-2 color-gray-1000 mb-20">Contact Us</h1>
                        </div>
                    </div>
                </section>
                <section className="section-box">
                    <div className="container mb-20 mt-140">
                        <div className="bdrd-58 box-gray-100 icon-wave">
                            <div className="row">
                                <div className="col-lg-12 mb-60"><span className="text-body-capitalized text-uppercase">Contact us</span>
                                    <h2 className="text-heading-3 color-gray-900 mt-10">Have an prject in mind?</h2>
                                    <p className="text-body-text color-gray-600 mt-20">The right move at the right time saves your investment.<br className="d-lg-block d-none" />live the dream of expanding your business.</p>
                                </div>
                                <div className="col-lg-4 mb-40">
                                    <h4 className="text-heading-6 color-gray-900 icon-home mb-10 mt-10">Madarshamel</h4>
                                    <p className="text-body-text color-gray-600">Jeddah<br />KSA</p>
                                    <p className="text-body-text color-gray-600">+(966) 556-565-564</p>
                                    <p className="text-body-text color-gray-600">cs@madarshamel.sa</p>
                                </div>
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="alert-data"></div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input id="name" className="form-control"  placeholder="Enter your name" /></div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input id="company" className="form-control"  placeholder="Company (optioanl)" /></div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input id="email" className="form-control"  placeholder="Your email" /></div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group"><input id="mobile" className="form-control"  placeholder="Phone number" /></div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group"><textarea id="desc" className="form-control" placeholder="Tell us about yourself" /></div>
                                        </div>
                                        <div className="col-lg-12 mt-15"><button onClick={handleSendRequest} className="btn btn-black icon-arrow-right-white mr-40 mb-20" type="submit">Send Message</button><br className="d-lg-none d-block" /><span className="text-body-text-md color-gray-500 mb-20">By clicking contact us button, you agree our terms and policy,</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>

        </>
    )
}

export default Contact;