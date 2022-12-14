import React, { useEffect, useState } from 'react';
//import Uploader from "../../components/elements/Uploader";
import SettingSelector from "./SettingSelector";
import CompanySelector from "./CompanySelector";
import Image from 'next/image';
const handleInsertCustomClearance = require('./../../handlers/handleInsertCustomClearance');
import useTranslation from "next-translate/useTranslation";

const CustomClearanceForm = ({settingsTab}) => {
  let {t} = useTranslation();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      sessionStorage.setItem('files','');
      sessionStorage.setItem('attachedFiles','');
  });
  if(settingsTab){
  return (
    <>
        <div className="container-fluid backgrounded-con float-start px-3 py-3">
          <div className="container">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 float-start">
              <div>
                <h3 className="text-center">{t("common:addccrequest")}</h3>
                  <div className="custom-alert-data"> </div>
                
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">{t("common:companyDetails")}</h4>
                  <label className="mt-20">{t("common:companyName")}</label>
                  <input type="text" className="form-control display-1 companyName" name="companyName" id="companyName" placeholder={t("common:companyName")} />
                  <label className="mt-20">{t("common:companyMobile")}</label>
                  <input type="text" className="form-control display-1 companyMobile" name="companyMobile" id="companyMobile" placeholder={t("common:companyMobile")} />
                  <label className="mt-20">{t("common:companyAddress")}</label>
                  <input type="text" className="form-control display-1 companyAddress" name="companyAddress" id="companyAddress" placeholder={t("common:companyAddress")} />
                  <label className="mt-20">{t("common:postalCode")}</label>
                  <input type="text" className="form-control display-1 postalCode" name="postalCode" id="postalCode" placeholder={t("common:postalCode")} />
                  <label className="mt-20">{t("common:fax")}</label>
                  <input type="text" className="form-control display-1 fax" name="fax" id="fax" placeholder={t("common:fax")} />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">{t("common:commercialRegistrationInfo")}</h4>
                  <label className="mt-20">{t("common:commercialRegistrationNo")}</label>
                  <input type="text" className="form-control display-1 commercialRegistrationNo" name="commercialRegistrationNo" id="commercialRegistrationNo" placeholder={t("common:commercialRegistrationNo")} />
                  <label className="mt-20">{t("common:commercialRegistrationDate")}</label>
                  <input type="text" className="form-control display-1 commercialRegistrationDate" name="commercialRegistrationDate" id="commercialRegistrationDate" placeholder={t("common:commercialRegistrationDate")} />
                  <label className="mt-20">{t("common:commercialRegistrationCity")}</label>
                  <input type="text" className="form-control display-1 commercialRegistrationCity" name="commercialRegistrationCity" id="commercialRegistrationCity" placeholder={t("common:commercialRegistrationCity")} />
                  <label className="mt-20">{t("common:chamberOfCommerceNumber")}</label>
                  <input type="text" className="form-control display-1 chamberOfCommerceNumber" name="chamberOfCommerceNumber" id="chamberOfCommerceNumber" placeholder={t("common:chamberOfCommerceNumber")} />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">{t("common:requestDetails")}</h4>
                  <label className="mt-20">{t("common:transactionPlace")}</label>
                  <input type="text" className="form-control display-1 transactionPlace" name="transactionPlace" id="transactionPlace" placeholder={t("common:transactionPlace")} />
                  <label className="mt-20">{t("common:recivingPort")}</label>
                  <input type="text" className="form-control display-1 recivingPort" name="recivingPort" id="recivingPort" placeholder={t("common:recivingPort")} />
                  <label className="mt-20">{t("common:shippingPort")}</label>
                  <input type="text" className="form-control display-1 shippingPort" name="shippingPort" id="shippingPort" placeholder={t("common:shippingPort")} />
                  <label className="mt-20">{t("common:sourceCountry")}</label>
                  <input type="text" className="form-control display-1 sourceCountry" name="sourceCountry" id="sourceCountry" placeholder={t("common:sourceCountry")} />
                  <label className="mt-20">{t("common:expectedShipDate")}</label>
                  <input type="date" className="form-control display-1 expectedShipDate" name="expectedShipDate" />
                </div>

                {/*<Uploader />*/}

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-4 py-4 float-start">
                  <button className="btn btn-square" onClick={handleInsertCustomClearance}>{t("common:submitRequest")}</button>
                </div>

              </div>
            </div>
          </div>
        </div>
    </>
  )
  }else{
    return (
        <>
            <h3>Loading ....</h3>
        </>
    )
  }
}


export default CustomClearanceForm;