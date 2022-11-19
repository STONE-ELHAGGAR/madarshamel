
const handleInsertCustomClearance = async (e) => {
  e.preventDefault();
  const companyName= document.querySelector('.companyName').value;
  const branch= document.querySelector('.branch').value;
  const transactionPlace= document.querySelector('.transactionPlace').value;
  const shippingPort= document.querySelector('.shippingPort').value;
  const recivingPort= document.querySelector('.recivingPort').value;
  const sourceCountry= document.querySelector('.sourceCountry').value;
  const expectedShipDate= document.querySelector('.expectedShipDate').value;
  const attachedFiles= '';//sessionStorage.getItem('attachedFiles');
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const requestBody = {
    companyName: companyName,
    branch: branch,
    transactionPlace: transactionPlace,
    shippingPort: shippingPort,
    recivingPort: recivingPort,
    sourceCountry: sourceCountry,
    expectedShipDate: expectedShipDate,
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

      document.querySelector('.companyName').value = 0;
      document.querySelector('.branch').value = 0;
      document.querySelector('.transactionPlace').value = 0;
      document.querySelector('.shippingPort').value = 0;
      document.querySelector('.recivingPort').value = 0;
      document.querySelector('.sourceCountry').value = 0;
      document.querySelector('.expectedShipDate').value = '';

      sessionStorage.setItem('attachedFiles','');
      window.location.href = process.env.NEXT_PUBLIC_BASE_URL+'/dashboard/custom-clearance-request/'+content.custom_clearance._id;  // this reloads

  }else{
      document.querySelector(".custom-alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please fill all fields correctly OR try again</div>';
      return content;
  }
}

module.exports = handleInsertCustomClearance;