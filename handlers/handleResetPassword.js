
const handleResetPassword = async (e, email = '') => {
    e.preventDefault();
    if(email == ''){
        let emailData = document.getElementById('email');
        email = (emailData) ? emailData.value : '';
    }
    const resetRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/rememberPass', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    });

  const content = await resetRequest.json();
  if(content.success){
        const alertCon = document.getElementById('alert-section');
        alertCon.innerHTML = '<div class="alert alert-'+content.case+'" role="alert">'+content.message+'</div>';
    }
}

module.exports = handleResetPassword;