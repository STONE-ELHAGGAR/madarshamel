/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
const handleResetPassword = require("./../../handlers/handleResetPassword");


const handleEditHomePage = async () => {
  const bannerDesc = document.querySelector(".bannerDesc").value;
  const img1 = document.querySelector(".img1").value;
  const img2 = document.querySelector(".img2").value;
  const img3 = document.querySelector(".img3").value;
  const img4 = document.querySelector(".img4").value;
  const img5 = document.querySelector(".img5").value;
  const img6 = document.querySelector(".img6").value;
  const tabSec1 = document.querySelector(".tabSec1").value;
  const tabSec2 = document.querySelector(".tabSec2").value;
  const tabSec3 = document.querySelector(".tabSec3").value;
  const _1stname = document.querySelector("._1stname").value;
  const _1stcompany = document.querySelector("._1stcompany").value;
  const _1stquote = document.querySelector("._1stquote").value;
  const _2ndname = document.querySelector("._2ndname").value;
  const _2ndcompany = document.querySelector("._2ndcompany").value;
  const _2ndquote = document.querySelector("._2ndquote").value;
  const _3rdname = document.querySelector("._3rdname").value;
  const _3rdcompany = document.querySelector("._3rdcompany").value;
  const _3rdquote = document.querySelector("._3rdquote").value;
  const _4thname = document.querySelector("._4thname").value;
  const _4thcompany = document.querySelector("._4thcompany").value;
  const _4thquote = document.querySelector("._4thquote").value;
  const fb = document.querySelector(".fb").value;
  const twitter = document.querySelector(".twitter").value;
  const insta = document.querySelector(".insta").value;
  const address = document.querySelector(".address").value;
  const phone = document.querySelector(".phone").value;
  const email = document.querySelector(".email").value;

  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const EditHomePageRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/homes/update', {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': accessToken
  },
  body: JSON.stringify({bannerDesc,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    tabSec1,
    tabSec2,
    tabSec3,
    _1stname,
    _1stcompany,
    _1stquote,
    _2ndname,
    _2ndcompany,
    _2ndquote,
    _3rdname,
    _3rdcompany,
    _3rdquote,
    _4thname,
    _4thcompany,
    _4thquote,
    fb,
    twitter,
    insta,
    address,
    phone,
    email})
  });
  const content = await EditHomePageRequest.json();
  if(content.success) {
    document.querySelector(".alert-data").innerHTML = '<div class="alert alert-success" role="alert">Edited Successfully</div>';
    location.reload();
    return false;
  }else{
      document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again later.</div>';
  }
}

function EditHomePage({homes}) {
    const [homesPhone, setHomesPhone] = useState(homes.homes[0].phone);
    const [bannerDesc, setbannerDesc] = useState(homes.homes[0].bannerDesc);
    const [img1, setimg1] = useState(homes.homes[0].img1);
    const [img2, setimg2] = useState(homes.homes[0].img2);
    const [img3, setimg3] = useState(homes.homes[0].img3);
    const [img4, setimg4] = useState(homes.homes[0].img4);
    const [img5, setimg5] = useState(homes.homes[0].img5);
    const [img6, setimg6] = useState(homes.homes[0].img6);
    const [tabSec1, settabSec1] = useState(homes.homes[0].tabSec1);
    const [tabSec2, settabSec2] = useState(homes.homes[0].tabSec2);
    const [tabSec3, settabSec3] = useState(homes.homes[0].tabSec3);
    const [_1stname, set_1stname] = useState(homes.homes[0]._1stname);
    const [_1stcompany, set_1stcompany] = useState(homes.homes[0]._1stcompany);
    const [_1stquote, set_1stquote] = useState(homes.homes[0]._1stquote);
    const [_2ndname, set_2ndname] = useState(homes.homes[0]._2ndname);
    const [_2ndcompany, set_2ndcompany] = useState(homes.homes[0]._2ndcompany);
    const [_2ndquote, set_2ndquote] = useState(homes.homes[0]._2ndquote);
    const [_3rdname, set_3rdname] = useState(homes.homes[0]._3rdname);
    const [_3rdcompany, set_3rdcompany] = useState(homes.homes[0]._3rdcompany);
    const [_3rdquote, set_3rdquote] = useState(homes.homes[0]._3rdquote);
    const [_4thname, set_4thname] = useState(homes.homes[0]._4thname);
    const [_4thcompany, set_4thcompany] = useState(homes.homes[0]._4thcompany);
    const [_4thquote, set_4thquote] = useState(homes.homes[0]._4thquote);
    const [fb, setfb] = useState(homes.homes[0].fb);
    const [insta, setinsta] = useState(homes.homes[0].insta);
    const [twitter, settwitter] = useState(homes.homes[0].twitter);
    const [address, setaddress] = useState(homes.homes[0].address);
    const [email, setemail] = useState(homes.homes[0].email);
    const onTodoChange = (value, input) => {
        if(input == 'phone'){
            setHomesPhone(value)
        }
        if(input == 'bannerDesc'){
            setbannerDesc(value)
        }
        if(input == 'img1'){
            setimg1(value)
        }
        if(input == 'img2'){
            setimg2(value)
        }
        if(input == 'img3'){
            setimg3(value)
        }
        if(input == 'img4'){
            setimg4(value)
        }
        if(input == 'img5'){
            setimg5(value)
        }
        if(input == 'img6'){
            setimg6(value)
        }
        if(input == 'tabSec1'){
            settabSec1(value)
        }
        if(input == 'tabSec2'){
            settabSec2(value)
        }
        if(input == 'tabSec3'){
            settabSec3(value)
        }
        if(input == '_1stname'){
            set_1stname(value)
        }
        if(input == '_1stcompany'){
            set_1stcompany(value)
        }
        if(input == '_1stquote'){
            set_1stquote(value)
        }
        if(input == '_2ndname'){
            set_2ndname(value)
        }
        if(input == '_2ndcompany'){
            set_2ndcompany(value)
        }
        if(input == '_2ndquote'){
            set_2ndquote(value)
        }
        if(input == '_3rdname'){
            set_3rdname(value)
        }
        if(input == '_3rdcompany'){
            set_3rdcompany(value)
        }
        if(input == '_3rdquote'){
            set_3rdquote(value)
        }
        if(input == '_4thname'){
            set_4thname(value)
        }
        if(input == '_4thcompany'){
            set_4thcompany(value)
        }
        if(input == '_4thquote'){
            set_4thquote(value)
        }
        if(input == 'fb'){
            setfb(value)
        }
        if(input == 'address'){
            setaddress(value)
        }
        if(input == 'twitter'){
            settwitter(value)
        }
        if(input == 'insta'){
            settwitter(value)
        }
        if(input == 'email'){
            setemail(value)
        }
    }
    return (
        <>
            <div className="container-fluid px-3 py-3 float-start backgrounded-con">
                <div className="container px-3 py-3" style={{background: '#fff'}}>
                    <div className="box-form-signup">
                    <div className="alert-data">
                                
                    </div>
                    <div className="form-group"><textarea className="form-control bannerDesc" onChange={e => onTodoChange(e.target.value,'bannerDesc')}>{bannerDesc}</textarea></div>
                    <div className="form-group"><input className="form-control img1" value={img1} onChange={e => onTodoChange(e.target.value,'img1')} type="text" placeholder="Company img1" /></div>
                    <div className="form-group"><input className="form-control img2" value={img2} onChange={e => onTodoChange(e.target.value,'img2')} type="text" placeholder="Company img2" /></div>
                    <div className="form-group"><input className="form-control img3" value={img3} onChange={e => onTodoChange(e.target.value,'img3')} type="text" placeholder="Company img3" /></div>
                    <div className="form-group"><input className="form-control img4" value={img4} onChange={e => onTodoChange(e.target.value,'img4')} type="text" placeholder="Company img4" /></div>
                    <div className="form-group"><input className="form-control img5" value={img5} onChange={e => onTodoChange(e.target.value,'img5')} type="text" placeholder="Company img5" /></div>
                    <div className="form-group"><input className="form-control img6" value={img6} onChange={e => onTodoChange(e.target.value,'img6')} type="text" placeholder="Company img6" /></div>
                    <div className="form-group"><textarea className="form-control tabSec1" onChange={e => onTodoChange(e.target.value,'tabSec1')} placeholder="Tab Section 1">{tabSec1}</textarea></div>
                    <div className="form-group"><textarea className="form-control tabSec2" onChange={e => onTodoChange(e.target.value,'tabSec2')} placeholder="Tab Section 2">{tabSec2}</textarea></div>
                    <div className="form-group"><textarea className="form-control tabSec3" onChange={e => onTodoChange(e.target.value,'tabSec3')} placeholder="Tab Section 3">{tabSec3}</textarea></div>
                    <div className="form-group"><input className="form-control _1stname" value={_1stname} onChange={e => onTodoChange(e.target.value,'_1stname')} type="text" placeholder="1st client review name" /></div>
                    <div className="form-group"><input className="form-control _1stcompany" value={_1stcompany} onChange={e => onTodoChange(e.target.value,'_1stcompany')} type="text" placeholder="1st client review company" /></div>
                    <div className="form-group"><input className="form-control _1stquote" value={_1stquote} onChange={e => onTodoChange(e.target.value,'_1stquote')} type="text" placeholder="1st client review quote" /></div>
                    <div className="form-group"><input className="form-control _2ndname" value={_2ndname} onChange={e => onTodoChange(e.target.value,'_2ndname')} type="text" placeholder="2nd client review name" /></div>
                    <div className="form-group"><input className="form-control _2ndcompany" value={_2ndcompany} onChange={e => onTodoChange(e.target.value,'_2ndcompany')} type="text" placeholder="2nd client review company" /></div>
                    <div className="form-group"><input className="form-control _2ndquote" value={_2ndquote} onChange={e => onTodoChange(e.target.value,'_2ndquote')} type="text" placeholder="2nd client review quote" /></div>
                    <div className="form-group"><input className="form-control _3rdname" value={_3rdname} onChange={e => onTodoChange(e.target.value,'_3rdname')} type="text" placeholder="3rd client review name" /></div>
                    <div className="form-group"><input className="form-control _3rdcompany" value={_3rdcompany} onChange={e => onTodoChange(e.target.value,'_3rdcompany')} type="text" placeholder="3rd client review company" /></div>
                    <div className="form-group"><input className="form-control _3rdquote" value={_3rdquote} onChange={e => onTodoChange(e.target.value,'_3rdquote')} type="text" placeholder="3rd client review quote" /></div>
                    <div className="form-group"><input className="form-control _4thname" value={_4thname} onChange={e => onTodoChange(e.target.value,'_4thname')} type="text" placeholder="4th client review name" /></div>
                    <div className="form-group"><input className="form-control _4thcompany" value={_4thcompany} onChange={e => onTodoChange(e.target.value,'_4thcompany')} type="text" placeholder="4th client review company" /></div>
                    <div className="form-group"><input className="form-control _4thquote" value={_4thquote} onChange={e => onTodoChange(e.target.value,'_4thquote')} type="text" placeholder="4th client review quote" /></div>
                    <div className="form-group"><input className="form-control phone" value={homesPhone} onChange={e => onTodoChange(e.target.value,'phone')} type="text" placeholder="+966 55 555 5555" /></div>
                    <div className="form-group"><input className="form-control fb" value={fb} onChange={e => onTodoChange(e.target.value,'fb')} type="text" placeholder="Facebook Account" /></div>
                    <div className="form-group"><input className="form-control insta" value={insta} onChange={e => onTodoChange(e.target.value,'insta')} type="text" placeholder="Instagram Account" /></div>
                    <div className="form-group"><input className="form-control twitter" value={twitter} onChange={e => onTodoChange(e.target.value,'twitter')} type="text" placeholder="Twitter Account" /></div>
                    <div className="form-group"><input className="form-control email" value={email} onChange={e => onTodoChange(e.target.value,'email')} type="text" placeholder="Email" /></div>
                    <div className="form-group"><input className="form-control address" value={address} onChange={e => onTodoChange(e.target.value,'address')} type="text" placeholder="Address" /></div>
                    <div className="form-group mt-10"><button onClick={handleEditHomePage} className="btn btn-square text-heading-6">Save</button></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditHomePage;