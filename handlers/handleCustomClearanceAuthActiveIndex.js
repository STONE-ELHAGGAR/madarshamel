const handleTableReader = require('./handleTableReader');

const handleCustomClearancePDFActiveIndex = async (id) => {
  if (typeof window !== 'undefined') {
    console.log('handle ' + id);
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const requestBody = {
      _id: id
    }
    const customClearanceActiveIndexRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/custom_clearance/read', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': accessToken
          },
          body: JSON.stringify(requestBody)
    });

    const content = await customClearanceActiveIndexRequest.json();
    if(content.success){
      for(let fieldKey in content.custom_clearance) {
        const requestConData = document.getElementById(fieldKey);
        const clientNumber = document.getElementById('clientNumber');

        let containerData;
        /*const driverName = document.getElementById('driverName');
        const driverMobile = document.getElementById('driverMobile');
        const driverTruck = document.getElementById('driverTruck');
        const driverNid = document.getElementById('driverNid');
        //Driver Data
        handleTableReader(content.custom_clearance[fieldKey], 'id','/api/driver/readById').then((result) => {
          driverName.innerHTML = result.drivers[0].name
          driverMobile.innerHTML = result.drivers[0].mobile
          driverTruck.innerHTML = result.drivers[0].truck
          driverNid.innerHTML = result.drivers[0].nid
        })*/


        if(requestConData){
          if(fieldKey == 'u_id'){
            requestConData.innerHTML = content.name;
          }else{
            if (fieldKey == 'created_at'){
                const recordDate = new Date(content.custom_clearance[fieldKey]);
                const toGetTime = recordDate.toLocaleString("en-US", {timeZone: "Asia/Riyadh"}).split(' ');
                requestConData.innerHTML =
                  recordDate.getDay()+'/'+
                  (recordDate.getMonth()+1)+'/'+
                  recordDate.getFullYear();
                  document.getElementById('c_to_date').innerHTML =
                  recordDate.getDay()+'/'+
                  (recordDate.getMonth()+1)+'/'+
                  (recordDate.getFullYear()+1);

            } else if (fieldKey == 'expectedShipDate' || fieldKey == 'chamberOfCommerceNumber'  || fieldKey == 'commercialRegistrationCity'  || fieldKey == 'commercialRegistrationDate' || fieldKey == 'commercialRegistrationNo' || fieldKey == 'fax' || fieldKey == 'postalCode' || fieldKey == 'companyName' || fieldKey == 'companyMobile' || fieldKey == 'companyAddress' || fieldKey == 'recivingPort' || fieldKey == 'shippingPort' || fieldKey == '_id'){
                if(fieldKey == 'fax'){
                  if(content.custom_clearance['fax'] == ''){
                    requestConData.innerHTML = '-لايوجد-';
                  }else{
                    requestConData.innerHTML = content.custom_clearance[fieldKey];
                  }
                }else{
                  requestConData.innerHTML = content.custom_clearance[fieldKey];
                }
            }else{
              handleTableReader(content.custom_clearance[fieldKey], 'id','/api/settings/readById').then((result) => {
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

module.exports = handleCustomClearancePDFActiveIndex;