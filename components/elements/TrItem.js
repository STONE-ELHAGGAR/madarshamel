import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleTableReader = require('./../../handlers/handleTableReader');
const handleGetNumId = require('./../../handlers/handleGetNumId');

const TrItem = ({content}) => {
    const router = useRouter();
    const currentLang =  router.locale;
    let userCreds = '';
    let allItems = '';
    if(content?.transportations){
    if(content.transportations?.length > 0){
        allItems = content.transportations?.map((transportation, index) => {
            for(let fieldKey in transportation) {
                const requestConData = document.getElementById(fieldKey+'_'+transportation._id);
                const idConData = document.getElementById('_'+transportation._id);
                if(requestConData){
                  handleGetNumId('transportation',transportation._id).
                    then((result) => {
                      idConData.innerHTML = '<a href="/'+currentLang+'/dashboard/transportation-request/'+transportation._id+'">'+result.numId+'</a>';
                    })
                  if(fieldKey == 'u_id'){
                    transportation.u_id = transportation.u_id;
                  }else{
                    if (fieldKey == 'drivers'){
                      handleTableReader(transportation[fieldKey], 'id','/api/driver/readById').then((result) => {
                        requestConData.innerHTML = result.drivers[0].name+' --- '+result.drivers[0].mobile;
                      })
                    } else if (fieldKey == 'expectedShipDate' || fieldKey == 'companyName' || fieldKey == 'companyMobile' || fieldKey == 'fromDate' || fieldKey == 'toDate' || fieldKey == 'companyAddress' || fieldKey == '_id' || fieldKey == 'carCost' || fieldKey == 'transferData' || fieldKey == 'created_at'){
                        requestConData.innerHTML = transportation[fieldKey];
                    }else{
                      handleTableReader(transportation[fieldKey], 'id','/api/settings/readById').then((result) => {
                        (result?.settings[0]) ? requestConData.innerHTML = result.settings[0].content : '';
                      })
                    }
                  }
                }
              }
            return(
                <>
                    <tr key={index}>
                        <th scope="row" id={'_'+transportation._id}></th>
                        <td id={'companyName_'+transportation._id}>{transportation.companyName}</td>
                        <td id={'companyMobile_'+transportation._id}>{transportation.companyMobile}</td>
                        <td id={'companyAddress_'+transportation._id}>{transportation.companyAddress}</td>
                        <td id={'transactionPlace_'+transportation._id}></td>
                        <td id={'fromDate_'+transportation._id}>{transportation.fromDate}</td>
                        <td id={'toDate_'+transportation._id}>{transportation.toDate}</td>
                        <td id={'sourceCountry_'+transportation._id}></td>
                        <td id={'drivers_'+transportation._id}></td>
                        <td id={'carCost_'+transportation._id}>{transportation.carCost}</td>
                        <td id={'transferData_'+transportation._id}>{transportation.transferData}</td>
                        <td id={'expectedShipDate_'+transportation._id}></td>
                    </tr>
                </>
            )
        })
    }
    return (
        <>
            {allItems}
        </>
    );
  }else{
    return (
      <>
          <h3>No Requests Yet.</h3>
      </>
  );
  }
}

export default TrItem;