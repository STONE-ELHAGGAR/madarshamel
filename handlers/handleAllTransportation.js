const handleAllTransportation = async () => {
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const transportationRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/transportation/readAllRequests', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    });

  const content = await transportationRequest.json();
  if(content.success){
    return content;
  }else{
    console.log(content.error)
  }
}

module.exports = handleAllTransportation;