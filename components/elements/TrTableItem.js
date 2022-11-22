import React, { useEffect, useState } from 'react';
const handleTableReader = require('./../../handlers/handleTableReader');

const TrTableItem = ({content, id, row}) => {

    const [conValue, setConValue] = useState('Undefined');

    if(id == 'u_id'){}else{
      if(id == 'companyName'){
        handleTableReader(content.transportation[id], 'id','/api/company/readById').then((result) => {
          (result?.companies[0]) ? setConValue(result.companies[0].companyName) : false ;
        })
      } else if (id == 'branch'){
        handleTableReader(content.transportation[id], 'id','/api/branches/readById').then((result) => {
          (result?.branches[0]) ? setConValue(result.branches[0].name+' --- '+result.branches[0].address) : false ;
        })
      } else if (id == 'drivers'){
        handleTableReader(content.transportation[id], 'id','/api/driver/readById').then((result) => {
          (result?.drivers[0]) ? setConValue(result.drivers[0].name+' --- '+result.drivers[0].mobile) : false ;
        })
      }else{
        handleTableReader(content.transportation[id], 'id','/api/settings/readById').then((result) => {
          (result?.settings[0]) ? setConValue(result.settings[0].content) : false ;
        })
      }
    }

    return (
        <>
            <tr>
                <th scope="row">{row}</th>
                <td id={id}>{(conValue == 'Undefined') ? ((id !== 'u_id') ? content.transportation[id] : content.name ) : conValue }</td>
            </tr>
        </>
    )
}

export default TrTableItem;