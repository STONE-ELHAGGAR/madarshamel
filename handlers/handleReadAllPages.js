
const handleReadAllPages = async () => {
    if (typeof window !== 'undefined') {
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        let accessToken = getCookie('accessToken');
        const pagesRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/pages/read', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        });

        const content = await pagesRequest.json();
        if(content.success){
            return content;
        }
    }
}

module.exports = handleReadAllPages;