const handleGetNumId = async (modelName, _id) => {
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const getNumIdRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/getNumId', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify({
          modelName: modelName,
          _id: _id
        })
    });

  const content = await getNumIdRequest.json();
  if(content.success){
    return content;
  }else{
    return content;
  }
}

module.exports = handleGetNumId;