import React, { useEffect, useState } from 'react';
const handleTableReader = require('./../../handlers/handleTableReader');

const TableItem = ({content, id, row}) => {

    const [conValue, setConValue] = useState('Undefined');
    if(content.custom_clearance?.companyName){
    if(id == 'u_id'){}else{
        if(id == 'companyName' && content.custom_clearance[id]){
            handleTableReader(content.custom_clearance[id], 'id','/api/company/readById').then((result) => {
                setConValue(result.companies[0].companyName);
            })
          } else if (id == 'branch' && content.custom_clearance[id]){
            handleTableReader(content.custom_clearance[id], 'id','/api/branches/readById').then((result) => {
                setConValue(result.branches[0].name+' --- '+result.branches[0].address);
            })
          } else if ((id == 'expectedShipDate' || id == '_id' || id == 'created_at') && content.custom_clearance[id]){}else{
            handleTableReader(content.custom_clearance[id], 'id','/api/settings/readById').then((result) => {
              if(result?.settings[0]){
                setConValue(result.settings[0].content);
              }
            })
          }
    }
  }
    return (
        <>
            <tr>
                <th scope="row">{row}</th>
                <td id={id}>{(conValue == 'Undefined') ? ((id !== 'u_id') ? content.custom_clearance[id] : content.name ) : conValue }</td>
            </tr>
        </>
    )
}

export default TableItem;