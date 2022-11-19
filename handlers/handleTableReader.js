const handleTableReader = async (value, valueType, fetchPath) => {
    if (typeof window !== 'undefined') {
        const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
        const requestBody = {
            [valueType]: value
        };
          const Request = await fetch(process.env.NEXT_PUBLIC_BASE_URL+fetchPath, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(requestBody)
            });
          const contentReq = await Request.json();
          if(contentReq.success){
            return contentReq;
          }else{
            console.log(contentReq)
          }
        }
}
module.exports = handleTableReader;