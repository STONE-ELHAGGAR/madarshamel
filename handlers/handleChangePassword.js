
const handleChangePassword = async (e) => {
    e.preventDefault();
    let verifyCode = document.getElementById('verifyCode').value;
    let password = document.getElementById('password').value;
    const verifyRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/changePassword', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            verifyCode: verifyCode,
            password: password
        })
    });

  const content = await verifyRequest.json();
  if(content.success){
    const alertCon = document.getElementById('alert-section');
    alertCon.innerHTML = '<div class="alert alert-primary" role="alert">'+content.message+'</div>';
    }
}

module.exports = handleChangePassword;