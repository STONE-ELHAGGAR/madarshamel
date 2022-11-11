const handleCustomClearanceActiveIndex = async (id) => {
  if (typeof window !== 'undefined') {
    console.log('handle ' + id);
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
    const requestBody = {
      _id: id
    }
    const customClearanceActiveIndexRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/custom_clearance/read', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': accessToken
          },
          body: JSON.stringify(requestBody)
    });

    const content = await customClearanceActiveIndexRequest.json();
    const fileNames = '';
    if(content.success){
      for(let fieldKey in content.custom_clearance) {
        const requestConData = document.getElementById(fieldKey);
        if(requestConData){
          if(fieldKey == 'u_id'){
            requestConData.innerHTML = content.name;
          }else{
            requestConData.innerHTML = content.custom_clearance[fieldKey];
          }
        }
      };
      const ccFiles = document.getElementById('ccFiles');
      ccFiles.innerHTML = '';
      for(let i=0; i < content.files.length; i++){
        fileNames = '';
        Object.values(JSON.parse(content.files[i].files)).map((fileName) => {
          fileNames += '<a href="#">\
                            <div class="text-center">\
                                <i class="fi fi-rr-file h4"></i>\
                            </div>\
                            <div class="compare-tip h6">\
                                <span class="success" style="word-break: break-all;">'+fileName+'</span>\
                            </div>\
                        </a>';
        })
        ccFiles.innerHTML += '<div class="col-12 col-lg-4 col-md-4 col-sm-12 col-xs-12 float-start px-3 py-3">\
                            <div class="product-item-2 hover-up">\
                                <table class="table table-striped">\
                                      <thead>\
                                          <tr>\
                                              <th scope="col">Field</th>\
                                              <th scope="col">Value</th>\
                                          </tr>\
                                      </thead>\
                                      <tbody>\
                                          <tr>\
                                              <th scope="row">Main Policy</th>\
                                              <td>'+content.files[i].mainPolicy+'</td>\
                                          </tr>\
                                          <tr>\
                                              <th scope="row">Quantity</th>\
                                              <td>'+content.files[i].quantity+'</td>\
                                          </tr>\
                                          <tr>\
                                              <th scope="row">Type</th>\
                                              <td>'+content.files[i].type+'</td>\
                                          </tr>\
                                          <tr>\
                                              <th scope="row">Weight</th>\
                                              <td>'+content.files[i].weight+'</td>\
                                          </tr>\
                                          <tr>\
                                              <th scope="row">Weight Type</th>\
                                              <td>'+content.files[i].weightType+'</td>\
                                          </tr>\
                                          <tr>\
                                              <th scope="row">Container Size</th>\
                                              <td>'+content.files[i].containerSize+'</td>\
                                          </tr>\
                                          <tr>\
                                              <th scope="row">Container Temprature</th>\
                                              <td>'+content.files[i].containerTemp+'</td>\
                                          </tr>\
                                          <tr>\
                                              <th scope="row">Details</th>\
                                              <td>'+content.files[i].details+'</td>\
                                          </tr>\
                                      </tbody>\
                                </table><br />'+fileNames+'</div>\
                        </div>';
      }
      return true;
    }else{
      console.log(content);
      return false;
    }
  }
}

module.exports = handleCustomClearanceActiveIndex;