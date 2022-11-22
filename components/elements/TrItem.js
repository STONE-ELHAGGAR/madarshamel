import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
const handleTableReader = require('./../../handlers/handleTableReader');

const TrItem = ({content}) => {
    let userCreds = '';
    let allItems = '';
    if(content.transportations?.length > 0){
        allItems = content.transportations?.map((transportation, index) => {
            for(let fieldKey in transportation) {
                const requestConData = document.getElementById(fieldKey+'_'+transportation._id);
                if(requestConData){
                  if(fieldKey == 'u_id'){
                    transportation.u_id = transportation.u_id;
                  }else{
                    if(fieldKey == 'companyName'){
                      handleTableReader(transportation[fieldKey], 'id','/api/company/readById').then((result) => {
                        requestConData.innerHTML = result.companies[0].companyName;
                      })
                    } else if (fieldKey == 'branch'){
                      handleTableReader(transportation[fieldKey], 'id','/api/branches/readById').then((result) => {
                        requestConData.innerHTML = result.branches[0].name+' --- '+result.branches[0].address;
                      })
                    } else if (fieldKey == 'drivers'){
                      handleTableReader(transportation[fieldKey], 'id','/api/driver/readById').then((result) => {
                        requestConData.innerHTML = result.drivers[0].name+' --- '+result.drivers[0].mobile;
                      })
                    } else if (fieldKey == 'expectedShipDate' || fieldKey == '_id' || fieldKey == 'carCost' || fieldKey == 'transferData' || fieldKey == 'created_at'){
                        requestConData.innerHTML = transportation[fieldKey];
                    }else{
                      handleTableReader(transportation[fieldKey], 'id','/api/settings/readById').then((result) => {
                        requestConData.innerHTML = result.settings[0].content;
                      })
                    }
                  }
                }
              }
            return(
                <>
                    <tr key={index}>
                        <th scope="row">{transportation._id}</th>
                        <td id={'companyName_'+transportation._id}></td>
                        <td id={'branch_'+transportation._id}></td>
                        <td id={'transactionPlace_'+transportation._id}></td>
                        <td id={'fromDate_'+transportation._id}></td>
                        <td id={'toDate_'+transportation._id}></td>
                        <td id={'sourceCountry_'+transportation._id}></td>
                        <td id={'drivers_'+transportation._id}></td>
                        <td id={'carCost_'+transportation._id}>{transportation.carCost}</td>
                        <td id={'transferData_'+transportation._id}>{transportation.transferData}</td>
                        <td id={'expectedShipDate_'+transportation._id}></td>
                        <td>
                            <div className="btn btn-square">
                                <i className="fi fi-rr-edit"></i> Edit
                            </div>
                        </td>
                        <td>
                            <div className="btn btn-square">
                                <i className="fi fi-rr-trash"></i> Remove
                            </div>
                        </td>
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
}

export default TrItem;