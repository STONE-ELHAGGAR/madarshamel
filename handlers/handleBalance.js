const handleBalance = async (u_id) => {
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  const requestBody = {
    u_id: u_id
  };
  const transactionsRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/transactions/readBalance', {
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
      return content.currentBalance;
  }else{
      console.log(content);
  }
}
module.exports = handleBalance;