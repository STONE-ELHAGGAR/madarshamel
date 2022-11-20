const handleTableReader = require('./handleTableReader');

const handleCustomClearanceActiveIndex = async (id) => {
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
    const fileNames = '';
    if(content.success){
      for(let fieldKey in content.custom_clearance) {
        const requestConData = document.getElementById(fieldKey);
        if(requestConData){
          if(fieldKey == 'u_id'){
            requestConData.innerHTML = content.name;
          }else{
            if(fieldKey == 'companyName'){
              handleTableReader(content.custom_clearance[fieldKey], 'id','/api/company/readById').then((result) => {
                requestConData.innerHTML = result.companies[0].companyName;
              })
            } else if (fieldKey == 'branch'){
              handleTableReader(content.custom_clearance[fieldKey], 'id','/api/branches/readById').then((result) => {
                requestConData.innerHTML = result.branches[0].name+' --- '+result.branches[0].address;
              })
            } else if (fieldKey == 'expectedShipDate' || fieldKey == '_id' || fieldKey == 'created_at'){
                requestConData.innerHTML = content.custom_clearance[fieldKey];
            }else{
              handleTableReader(content.custom_clearance[fieldKey], 'id','/api/settings/readById').then((result) => {
                requestConData.innerHTML = result.settings[0].content;
              })
            }
          }
        }
      }
      return true;
    }else{
      console.log(content);
      return false;
    }
  }
}

module.exports = handleCustomClearanceActiveIndex;