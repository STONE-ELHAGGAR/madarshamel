const handleTableReader = require('./handleTableReader');

const handleAllUsers = async () => {
    if (typeof window !== 'undefined') {
        const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
        let newUsersCon = '';
        const allUsersRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/adminReadAllUsers', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': accessToken
              }
        });
    
        const content = await allUsersRequest.json();

        if(content.success){
            if(content.users.length > 0){
                return content;
            }else{
                console.log(content);
            }
        }else{
            console.log(content);
        }
    }
}

module.exports = handleAllUsers;