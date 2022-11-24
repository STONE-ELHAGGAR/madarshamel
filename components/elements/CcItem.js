import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleTableReader = require('./../../handlers/handleTableReader');
const handleGetNumId = require('./../../handlers/handleGetNumId');

const CcItem = ({content}) => {
    let userCreds = '';
    let allItems = '';
    if(content?.custom_clearances){
    if(content.custom_clearances?.length > 0){
        allItems = content.custom_clearances?.map((custom_clearance, index) => {
            for(let fieldKey in custom_clearance) {
                const requestConData = document.getElementById(fieldKey+'_'+custom_clearance._id);
                const idConData = document.getElementById('_'+custom_clearance._id);
                if(requestConData){
                  
                  handleGetNumId('custom_clearance',custom_clearance._id).
                    then((result) => {
                      idConData.innerHTML = '<a href="/dashboard/custom-clearance-request/'+custom_clearance._id+'">'+result.numId+'</a>';
                    })

                  if(fieldKey == 'u_id'){
                    custom_clearance.u_id = custom_clearance.u_id;
                  }else{
                    if(fieldKey == 'companyName'){
                      handleTableReader(custom_clearance[fieldKey], 'id','/api/company/readById').then((result) => {
                        requestConData.innerHTML = result.companies[0].companyName;
                      })
                    } else if (fieldKey == 'branch'){
                      handleTableReader(custom_clearance[fieldKey], 'id','/api/branches/readById').then((result) => {
                        requestConData.innerHTML = result.branches[0].name+' --- '+result.branches[0].address;
                      })
                    } else if (fieldKey == 'expectedShipDate' || fieldKey == '_id' || fieldKey == 'created_at'){
                        requestConData.innerHTML = custom_clearance[fieldKey];
                    }else{
                      handleTableReader(custom_clearance[fieldKey], 'id','/api/settings/readById').then((result) => {
                        requestConData.innerHTML = result.settings[0].content;
                      })
                    }
                  }
                }
              }
            return(
                <>
                    <tr key={index}>
                        <th scope="row" id={'_'+custom_clearance._id}></th>
                        <td id={'companyName_'+custom_clearance._id}></td>
                        <td id={'branch_'+custom_clearance._id}></td>
                        <td id={'transactionPlace_'+custom_clearance._id}></td>
                        <td id={'shippingPort_'+custom_clearance._id}></td>
                        <td id={'recivingPort_'+custom_clearance._id}></td>
                        <td id={'sourceCountry_'+custom_clearance._id}></td>
                        <td id={'expectedShipDate_'+custom_clearance._id}></td>
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

export default CcItem;