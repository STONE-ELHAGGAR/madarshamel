const handleAllCC = async () => {
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const customClearanceRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/custom_clearance/readAllRequests', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    });

  const content = await customClearanceRequest.json();
  if(content.success){
    return content;
  }else{
    console.log(content.error)
  }
}

module.exports = handleAllCC;