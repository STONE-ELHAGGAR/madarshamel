
const handleVerifyAccount = async (e) => {
    e.preventDefault();
    let verifyCode = document.getElementById('verifyCode').value;
    const verifyRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/verifyAccount', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            verifyCode: verifyCode
        })
    });

  const content = await verifyRequest.json();
  console.log(content)
  return content;
}

module.exports = handleVerifyAccount;