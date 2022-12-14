import React, { useEffect, useState } from 'react';
//import Uploader from "../../components/elements/Uploader";
import Image from 'next/image';
const handleInsertTransportation = require('./../../handlers/handleInsertTransportation');
import SettingSelector from "./SettingSelector";
import CompanySelector from "./CompanySelector";
import DriverSelector from "./DriverSelector";
import useTranslation from "next-translate/useTranslation";

const Transportation = () => {
  let {t} = useTranslation();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      sessionStorage.setItem('files','');
      sessionStorage.setItem('attachedFiles','');
  });
  return (
    <>
        <div className="container-fluid backgrounded-con float-start px-3 py-3">
          <div className="container">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 float-start">
              <form action="#">
                <h3 className="text-center">{t("common:trrequest")}</h3>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <h4 className="text-center">{t("common:requestDetails")}</h4>
                  <div className="custom-alert-data"> </div>
                  <label className="mt-20">{t("common:companyName")}</label>
                  <input type="text" className="form-control display-1 companyName" name="companyName" id="companyName" placeholder={t("common:companyName")} />
                  <label className="mt-20">{t("common:companyMobile")}</label>
                  <input type="text" className="form-control display-1 companyMobile" name="companyMobile" id="companyMobile" placeholder={t("common:companyMobile")} />
                  <label className="mt-20">{t("common:companyAddress")}</label>
                  <input type="text" className="form-control display-1 companyAddress" name="companyAddress" id="companyAddress" placeholder={t("common:companyAddress")} />
                  <label className="mt-20">{t("common:transactionPlace")}</label>
                  <input type="text" className="form-control display-1 transactionPlace" name="transactionPlace" id="transactionPlace" placeholder={t("common:transactionPlace")} />
                  <label className="mt-20">{t("common:from")}</label>
                  <input type="text" className="form-control display-1 fromDate" name="fromDate" id="fromDate" placeholder={t("common:from")} />
                  <label className="mt-20">{t("common:to")}</label>
                  <input type="text" className="form-control display-1 toDate" name="toDate" id="toDate" placeholder={t("common:to")} />
                  <label className="mt-20">{t("common:sourceCountry")}</label>
                  <input type="text" className="form-control display-1 sourceCountry" name="sourceCountry" id="sourceCountry" placeholder={t("common:sourceCountry")} />
                  <DriverSelector />
                  <label className="mt-20">{t("common:expectedShipDate")}</label>
                  <input type="date" className="form-control display-1 expectedShipDate" name="expectedShipDate" />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start">
                    <h4 className="text-center">{t("common:otherDetails")}</h4>
                    <label className="mt-20">{t("common:carCost")}</label>
                    <input className="form-control mt-20 display-1 carCost" name="carCost" placeholder={t("common:carCost")} />
                    <label className="mt-20">{t("common:transferData")}</label>
                    <input className="form-control display-1 transferData" type="date" name="transferData" placeholder={t("common:transferData")} />
                  </div>
                </div>
                
                {/*<Uploader />*/}

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-4 py-4 float-start">
                  <button className="btn btn-square" onClick={handleInsertTransportation}>{t("common:submitRequest")}</button>
                </div>

              </form>
            </div>
          </div>
        </div>
    </>
  )
}


export default Transportation;