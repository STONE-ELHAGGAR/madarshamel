/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Layout from "../components/layout/Layout";

function PriceRequest() {
    const [isOpen, setOpen] = useState(false);
    const handleSendRequest = async (e) => {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let company = document.getElementById('company').value;
        let mobile = document.getElementById('mobile').value;
        let email = document.getElementById('email').value;
        let goodsDetails = document.getElementById('goodsDetails').value;
        let hts = document.getElementById('hts').value;
        let sourceCountry = document.getElementById('sourceCountry').value;
        let senderAddress = document.getElementById('senderAddress').value;
        let consigneeCity = document.getElementById('consigneeCity').value;
        let consigneeAddress = document.getElementById('consigneeAddress').value;
        let cond = document.querySelectorAll('input[type=checkbox]:checked');
        let checkedElementsArray = [];
        cond.forEach( el => {
            checkedElementsArray.push(el.value);
        });
        let shipment = JSON.stringify(checkedElementsArray);
        let bodyRequest = {
            name: name,
            company: company,
            mobile: mobile,
            email: email,
            goodsDetails: goodsDetails,
            hts: hts,
            sourceCountry: sourceCountry,
            senderAddress: senderAddress,
            consigneeCity: consigneeCity,
            consigneeAddress: consigneeAddress,
            cond: shipment
            };
        const priceRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/prices/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyRequest)
        });

    const content = await priceRequest.json();
    if(content.success){
        document.getElementById('name').value = '';
        document.getElementById('company').value = '';
        document.getElementById('email').value = '';
        document.getElementById('goodsDetails').value = '';
        document.getElementById('hts').value = '';
        document.getElementById('sourceCountry').value = '';
        document.getElementById('senderAddress').value = '';
        document.getElementById('consigneeCity').value = '';
        document.getElementById('consigneeAddress').value = '';
        cond.forEach( el => {
            el.checked = false;
        });
        document.querySelector(".alert-data").innerHTML = '<div class="alert alert-success" role="alert">We have recived your request ... You`ll reach a call or an email from us ASAP.</div>';
        document.getElementById('scrollerReq').scrollIntoView();
    }else{
        document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again later.</div>';
        document.getElementById('scrollerReq').scrollIntoView();
    }
    }
    return (
        <>
            <Layout>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-3 py-3 backgrounded-con float-start" id="scrollerReq">
                    <div className="alert-data">
                                
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-3 py-3 float-start">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-3 py-3 float-start" style={{border: '1px solid #333', background: '#fff'}}>
                            <h4>Company Personal Details</h4>
                            <h5>Your full name:</h5>
                            <input type="text" id="name" className="form-control" placeholder="Your Full Name" />
                            <h5>Company name:</h5>
                            <input type="text" id="company" className="form-control" placeholder="Company Name" />
                            <h5>Email:</h5>
                            <input type="text" id="email" className="form-control" placeholder="Email" />
                            <h5>Mobile:</h5>
                            <input type="text" id="mobile" className="form-control" placeholder="Mobile" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-3 py-3 float-start">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-3 py-3 float-start" style={{border: '1px solid #333', background: '#fff'}}>
                            <h4>Shipment Details</h4>
                            <h5>Goods Details</h5>
                            <textarea id="goodsDetails" className="form-control" placeholder="Goods Details"></textarea>
                            <h5>HTS Code:</h5>
                            <input id="hts" type="text" className="form-control" placeholder="HTS Code" />
                        </div>
                    </div>


                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-3 py-3 float-start">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-3 py-3 float-start">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-3 py-3 float-start" style={{border: '1px solid #333', background: '#fff'}}>
                                <h4>Source Country information</h4>
                                <h5>Source Country:</h5>
                                <input id="sourceCountry" type="text" className="form-control" placeholder="Source Country" />
                                <h5>Sender Address</h5>
                                <textarea id="senderAddress" className="form-control" placeholder="Sender Address"></textarea>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-3 py-3 float-start">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-3 py-3 float-start" style={{border: '1px solid #333', background: '#fff'}}>
                                <h4>Consignee information</h4>
                                <h5>Consignee City:</h5>
                                <input id="consigneeCity" type="text" className="form-control" placeholder="Consignee City" />
                                <h5>Consignee Address</h5>
                                <textarea id="consigneeAddress" className="form-control" placeholder="Consignee Address"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-3 py-3 float-start" style={{border: '1px solid #333', background: '#fff'}}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="air" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Air Shipping
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="plane" id="flexCheckChecked" />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                Plane Shipping
                            </label>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-3 py-3 float-start">
                        <button type="submit" onClick={handleSendRequest} className="btn btn-square">Request</button>
                    </div>

                </div>
            </Layout>

        </>
    )
}
export default PriceRequest;