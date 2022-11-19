const checkIfLoggedIn = async (userCreds = [],params = [], modelName = '') => {
    const sessionContent = JSON.parse(sessionStorage.getItem('loginData'));
    if(sessionContent) {
        const jwtVerifyRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/loginCheck', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': sessionContent.data.accessToken
            },
            body: JSON.stringify({
                userCreds: userCreds,
                params: params,
                modelName: modelName
            })
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