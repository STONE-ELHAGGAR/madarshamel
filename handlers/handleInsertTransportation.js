
const handleInsertTransportation = async (e) => {
  e.preventDefault();
  const companyName= document.querySelector('.companyName').value;
  const companyMobile= document.querySelector('.companyMobile').value;
  const companyAddress= document.querySelector('.companyAddress').value;
  const transactionPlace= document.querySelector('.transactionPlace').value;
  const fromDate= document.querySelector('.fromDate').value;
  const toDate= document.querySelector('.toDate').value;
  const sourceCountry= document.querySelector('.sourceCountry').value;
  const drivers= document.querySelector('.drivers').value;
  const carCost= document.querySelector('.carCost').value;
  const transferData= document.querySelector('.transferData').value;
  const expectedShipDate= document.querySelector('.expectedShipDate').value;
  const attachedFiles= '';//sessionStorage.getItem('attachedFiles');
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const requestBody = {
    companyName: companyName,
    companyMobile: companyMobile,
    companyAddress: companyAddress,
    fromDate: fromDate,
    transactionPlace: transactionPlace,
    toDate: toDate,
    sourceCountry: sourceCountry,
    drivers: drivers,
    expectedShipDate: expectedShipDate,
    carCost: carCost,
    transferData: transferData,
    attachedFiles: attachedFiles
  };
  const transportationRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/transportation/create', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': accessToken
    },
    body: JSON.stringify(requestBody)
    });
  const content = await transportationRequest.json();
  if(content.success) {
      console.log(content);
      document.querySelector(".custom-alert-data").innerHTML = '';
      document.querySelector(".custom-alert-data").innerHTML = '<div class="alert alert-success" role="alert">Added Succesfully</div>';

      document.querySelector('.companyName').value = '';
      document.querySelector('.companyMobile').value = '';
      document.querySelector('.companyAddress').value = '';
      document.querySelector('.transactionPlace').value = '';
      document.querySelector('.fromDate').value = '';
      document.querySelector('.toDate').value = '';
      document.querySelector('.drivers').value = 0;
      document.querySelector('.transferData').value = '';
      document.querySelector('.carCost').value = '';
      document.querySelector('.expectedShipDate').value = '';

      sessionStorage.setItem('attachedFiles','');
      window.location.href = process.env.NEXT_PUBLIC_BASE_URL+'/dashboard/transportation-request/'+content.transportation._id;  // this reloads
      
  }else{
      document.querySelector(".custom-alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please fill all fields correctly OR try again</div>';
  }
}

module.exports = handleInsertTransportation;