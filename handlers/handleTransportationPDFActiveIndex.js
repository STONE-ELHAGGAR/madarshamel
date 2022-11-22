const handleTableReader = require('./handleTableReader');

const handleTransportationPDFActiveIndex = async (id,movementId) => {
  if (typeof window !== 'undefined') {
    console.log('handle ' + id);
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const requestBody = {
      _id: id
    }
    const transportationActiveIndexRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/transportation/read', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': accessToken
          },
          body: JSON.stringify(requestBody)
    });

    const content = await transportationActiveIndexRequest.json();
    if(content.success){
      for(let fieldKey in content.transportation) {
        const requestConData = document.getElementById(fieldKey);
        const clientNumber = document.getElementById('clientNumber');

        let containerData;
        const driverName = document.getElementById('driverName');
        const driverMobile = document.getElementById('driverMobile');
        const driverTruck = document.getElementById('driverTruck');
        const driverNid = document.getElementById('driverNid');
          //Driver Data
          handleTableReader(content.transportation['drivers'], 'id','/api/driver/readById').then((result) => {
            driverName.innerHTML = result.drivers[0].name
            driverMobile.innerHTML = result.drivers[0].mobile
            driverTruck.innerHTML = result.drivers[0].truck
            driverNid.innerHTML = result.drivers[0].nid
          })


        handleTableReader(movementId, 'id','/api/movements/readById').then((result) => {
          containerData = JSON.parse(result.movements[0].content);
          document.getElementById('containerDetails').innerHTML = containerData.details;
          document.getElementById('containerNumber').innerHTML = containerData.containerNumber+' / Container Size:'+containerData.containerSize;
          document.getElementById('containerTemp').innerHTML = containerData.containerTemp;
          document.getElementById('containerQuantity').innerHTML = containerData.quantity+' / '+containerData.type;
          document.getElementById('containerWeight').innerHTML = containerData.weight+' / '+containerData.weightType;
        })

        if(requestConData){
          if(fieldKey == 'u_id'){
            requestConData.innerHTML = content.name;
          }else{
            if(fieldKey == 'companyName'){
              handleTableReader(content.transportation[fieldKey], 'id','/api/company/readById').then((result) => {
                requestConData.innerHTML = result.companies[0].companyName
                clientNumber.innerHTML = result.companies[0].companyMobile
              })
            } else if (fieldKey == 'branch'){
              handleTableReader(content.transportation[fieldKey], 'id','/api/branches/readById').then((result) => {
                requestConData.innerHTML = result.branches[0].name+' --- '+result.branches[0].address;
              })
            } else if (fieldKey == 'created_at'){
                const recordDate = new Date(content.transportation[fieldKey]);
                const toGetTime = recordDate.toLocaleString("en-US", {timeZone: "Asia/Riyadh"}).split(' ');
                requestConData.innerHTML =
                  toGetTime[1]+' '+toGetTime[2]+ ' --- '+
                  recordDate.getDay()+'/'+
                  (recordDate.getMonth()+1)+'/'+
                  recordDate.getFullYear();

            } else if (fieldKey == 'expectedShipDate' || fieldKey == '_id'){
                requestConData.innerHTML = content.transportation[fieldKey];
            }else{
              handleTableReader(content.transportation[fieldKey], 'id','/api/settings/readById').then((result) => {
                requestConData.innerHTML = result.settings[0].content;
              })
            }
          }
        }
      }
      console.log(content);
      return true;
    }else{
      console.log(content);
      return false;
    }
  }
}

module.exports = handleTransportationPDFActiveIndex;