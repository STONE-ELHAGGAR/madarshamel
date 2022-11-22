const handleDashboardRequest = async (tableName) => {
        const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
        const customClearanceRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/'+tableName+'/readAll', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        });

      const content = await customClearanceRequest.json();
      console.log(content)
      return content;
}

module.exports = handleDashboardRequest;