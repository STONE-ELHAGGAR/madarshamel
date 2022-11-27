const handleAdminDashboard = async (modelName, _id) => {
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const getNumIdRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/settings/adminDashboard', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    });

  const content = await getNumIdRequest.json();
  if(content.success){
    return content;
  }else{
    return content;
  }
}

module.exports = handleAdminDashboard;