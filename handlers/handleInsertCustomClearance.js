
const handleInsertCustomClearance = async (e) => {
  e.preventDefault();
  const companyName= document.querySelector('.companyName').value;
  const companyMobile= document.querySelector('.companyMobile').value;
  const companyAddress= document.querySelector('.companyAddress').value;
  const transactionPlace= document.querySelector('.transactionPlace').value;
  const shippingPort= document.querySelector('.shippingPort').value;
  const recivingPort= document.querySelector('.recivingPort').value;
  const sourceCountry= document.querySelector('.sourceCountry').value;
  const expectedShipDate= document.querySelector('.expectedShipDate').value;
  const postalCode= document.querySelector('.postalCode').value;
  const fax= document.querySelector('.fax').value;
  const commercialRegistrationNo= document.querySelector('.commercialRegistrationNo').value;
  const commercialRegistrationDate= document.querySelector('.commercialRegistrationDate').value;
  const commercialRegistrationCity= document.querySelector('.commercialRegistrationCity').value;
  const chamberOfCommerceNumber= document.querySelector('.chamberOfCommerceNumber').value;
  const attachedFiles= '';//sessionStorage.getItem('attachedFiles');
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const requestBody = {
    companyName: companyName,
    companyMobile: companyMobile,
    companyAddress: companyAddress,
    transactionPlace: transactionPlace,
    shippingPort: shippingPort,
    recivingPort: recivingPort,
    sourceCountry: sourceCountry,
    expectedShipDate: expectedShipDate,
    postalCode: postalCode,
    fax: fax,
    commercialRegistrationNo: commercialRegistrationNo,
    commercialRegistrationDate: commercialRegistrationDate,
    commercialRegistrationCity: commercialRegistrationCity,
    chamberOfCommerceNumber: chamberOfCommerceNumber,
    attachedFiles: attachedFiles
  };
  const customClearanceRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/custom_clearance/create', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': accessToken
    },
    body: JSON.stringify(requestBody)
    });
  const content = await customClearanceRequest.json();
  if(content.success) {
      console.log(content);
      document.querySelector(".custom-alert-data").innerHTML = '';
      document.querySelector(".custom-alert-data").innerHTML = '<div class="alert alert-success" role="alert">Added Succesfully</div>';

      document.querySelector('.companyName').value = '';
      document.querySelector('.companyMobile').value = '';
      document.querySelector('.companyAddress').value = '';
      document.querySelector('.transactionPlace').value = '';
      document.querySelector('.shippingPort').value = '';
      document.querySelector('.recivingPort').value = '';
      document.querySelector('.sourceCountry').value = '';
      document.querySelector('.expectedShipDate').value = '';

      document.querySelector('.postalCode').value = '';
      document.querySelector('.fax').value = '';
      document.querySelector('.commercialRegistrationNo').value = '';
      document.querySelector('.commercialRegistrationDate').value = '';
      document.querySelector('.commercialRegistrationCity').value = '';
      document.querySelector('.chamberOfCommerceNumber').value = '';

      sessionStorage.setItem('attachedFiles','');
      window.location.href = process.env.NEXT_PUBLIC_BASE_URL+'/dashboard/custom-clearance-request/'+content.custom_clearance._id;  // this reloads

  }else{
      document.querySelector(".custom-alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please fill all fields correctly OR try again</div>';
      return content;
  }
}

module.exports = handleInsertCustomClearance;