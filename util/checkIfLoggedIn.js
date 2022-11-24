const checkIfLoggedIn = async (userCreds = [],params = [], modelName = '', itemId = '') => {
    const sessionContent = JSON.parse(sessionStorage.getItem('loginData'));
    let requestBody = {};
    if(sessionContent) {
        if(itemId){
            requestBody = {
                userCreds: userCreds,
                params: params,
                modelName: modelName,
                [params[0]]: itemId
            }
        }else{
            requestBody = {
                userCreds: userCreds,
                params: [],
                modelName: ''
            }
        }
        const jwtVerifyRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/loginCheck', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': sessionContent.data.accessToken
            },
            body: JSON.stringify(requestBody)
            });
        const content = await jwtVerifyRequest.json();
        if(content.success) {
            return true
        }else{
            //sessionStorage.removeItem('loginData');
            return false;
        }
    }else{
        return false;
    }
}

module.exports = checkIfLoggedIn;