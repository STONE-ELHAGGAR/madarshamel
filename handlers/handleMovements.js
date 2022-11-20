
const handleMovements = async (requestId) => {
    if (typeof window !== 'undefined') {
        const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
        let newUsersCon = '';
        const allUsersRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/movements/readByRequestId', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': accessToken
              },
              body: JSON.stringify({
                requestId: requestId
              })
        });
    
        const content = await allUsersRequest.json();

        if(content.success){
            if(content.movements.length > 0){
                return content;
            }else{
                console.log(content);
            }
        }else{
            console.log(content);
        }
    }
}

module.exports = handleMovements;