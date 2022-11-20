const handleTransaction = async (e) => {
    e.preventDefault();
    const u_id= document.querySelector('.u_id').value;
    const amount= document.querySelector('.amount').value;
    const status= document.querySelector('.status').value;
    const movementId= document.querySelector('.movementId').value;
    const details= document.querySelector('.details').value;
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const requestBody = {
      u_id: u_id,
      amount: amount,
      status: status,
      movementId: movementId,
      details: details
    };
    const transactionsRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/transactions/create', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      },
      body: JSON.stringify(requestBody)
      });
    const content = await transactionsRequest.json();
    if(content.success) {
        document.querySelector(".custom-alert-data").innerHTML = '';
        document.querySelector(".custom-alert-data").innerHTML = '<div class="alert alert-success" role="alert">Created Succesfully</div>';
  
        document.querySelector('.u_id').value = content.transaction.u_id;
        document.querySelector('.amount').value = '';
        document.querySelector('.status').value = 0;
        document.querySelector('.movementId').value = 0;
        document.querySelector('.details').value = '';
        return content.transaction.u_id;
    }else{
        document.querySelector(".custom-alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please fill all fields correctly OR try again</div>';
    }
}

module.exports = handleTransaction;