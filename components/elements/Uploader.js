const attachedFilesFullData = [];
const previousFiles = [];

const handleSaveFile = async (e) => {
  e.preventDefault();
  const mainPolicy= document.querySelector('.mainPolicy').value;
  const quantity= document.querySelector('.quantity').value;
  const type= document.querySelector('.type').value;
  const weight= document.querySelector('.weight').value;
  const weightType= document.querySelector('.weightType').value;
  const containerSize= document.querySelector('.containerSize').value;
  const containerTemp= document.querySelector('.containerTemp').value;
  const details= document.querySelector('.details').value;
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;

  const fileRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/files/create', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': accessToken
    },
    body: JSON.stringify({
      mainPolicy: mainPolicy,
      quantity: quantity,
      type: type,
      weight: weight,
      weightType: weightType,
      containerSize: containerSize,
      containerTemp: containerTemp,
      details: details,
      files: sessionStorage.getItem('files')
    })
    });
  const content = await fileRequest.json();
  if(content.success) {
      console.log(content);
      document.querySelector(".alert-data").innerHTML = '';
      document.querySelector(".alert-data").innerHTML = '<div class="alert alert-success" role="alert">Added Succesfully</div>';
      document.querySelector('.mainPolicy').value = '';
      document.querySelector('.quantity').value = '';
      document.querySelector('.type').value = '';
      document.querySelector('.weight').value = '';
      document.querySelector('.weightType').value = '';
      document.querySelector('.containerSize').value = '';
      document.querySelector('.containerTemp').value = '';
      document.querySelector('.details').value = '';
      document.getElementById('fileUploadData').value = null;
      document.querySelector(".uploadedFiles").innerHTML = '';
      sessionStorage.setItem('files','');
      
      document.getElementById('noFilesMsg').innerHTML = '';

      const attachedFiles = '';

      if(content.file.files){
        Object.values(JSON.parse(content.file.files)).map((attachedFile) => {
          attachedFiles += '<p><h6><i class="fi fi-rr-file"></i> ' + attachedFile + '</h6></p>';
        });
      }
      attachedFilesFullData.push(content.file._id);
      const attachedFilesFullDataJson = { ...attachedFilesFullData };
      sessionStorage.setItem('attachedFiles',JSON.stringify(attachedFilesFullDataJson));
      console.log(sessionStorage.getItem('attachedFiles'));
      document.getElementById('tableBodyData').innerHTML =
      document.getElementById('tableBodyData').innerHTML +
      '<tr><th scope="row">'+content.file._id+'</th>\
      <td>'+content.file.mainPolicy+'</td>\
      <td>'+content.file.quantity+'</td>\
      <td>'+content.file.type+'</td>\
      <td>'+content.file.weight+'</td>\
      <td>'+content.file.weightType+'</td>\
      <td>'+content.file.containerSize+'</td>\
      <td>'+content.file.containerTemp+'</td>\
      <td>'+content.file.details+'</td>\
      <td>'+attachedFiles+'</td>\
      </tr>';
      previousFiles = [];
  }else{
      document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please fill all fields correctly OR try again</div>';
  }
}

const handleUploader = async (e) => {
    e.preventDefault();
    const file = document.getElementById('fileUploadData');
    var data = new FormData()
    data.append('file', file.files[0])
    const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
  
    const fileRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/uploader/upload', {
      method: 'POST',
      headers: {
        'Authorization': accessToken
      },
      body: data
    })
    const content = await fileRequest.json();
    console.log(content);
    
      if(content.success) {
          previousFiles.push(content.filename);
          const previousFilesJson = { ...previousFiles };
          //console.log(previousFilesJson);
          sessionStorage.setItem('files',JSON.stringify(previousFilesJson));
          console.log(JSON.parse(sessionStorage.getItem('files')));
          document.getElementById('fileUploadData').value = null;
          document.querySelector(".alert-data").innerHTML = '<div class="alert alert-success" role="alert">Uploaded Succesfully</div>';
          document.querySelector(".uploadedFiles").innerHTML = document.querySelector(".uploadedFiles").innerHTML+'<p><h6><i class="fi fi-rr-file"></i> '+content.filename+'</h6></p>';
      }else{
          document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please try again later.</div>';
          content.error.map((err) => {
            document.querySelector(".alert-data").innerHTML = document.querySelector(".alert-data").innerHTML+'<div class="alert alert-danger" role="alert">'+err+'</div>';
          });
          document.getElementById('fileUploadData').value = null;
      }
}

const Uploader = () => {
    return (
        
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start px-5 py-5 mt-50">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start">
          <h4 className="text-center">Files</h4>
          <div className="alert-data"> </div>
          <input className="form-control mt-20 display-1 mainPolicy" name="mainPolicy" placeholder="Main Policy" />
          <input className="form-control mt-20 display-1 quantity" name="quantity" placeholder="Quantity" />
          <input className="form-control mt-20 display-1 type" name="type" placeholder="Type" />
          <input className="form-control mt-20 display-1 weight" name="weight" placeholder="Weight" />
          <input className="form-control mt-20 display-1 weightType" name="weightType" placeholder="Weight Type" />
          <input className="form-control mt-20 display-1 containerSize" name="containerSize" placeholder="Container Size" />
          <input className="form-control mt-20 display-1 containerTemp" name="containerTemp" placeholder="Container Temprature" />
          <textarea className="form-control mt-20 display-1 details" name="details" placeholder="Additional Details"></textarea>
          <br />
          <form encType="multipart/form-data" action={process.env.NEXT_PUBLIC_BASE_URL+'/api/files/upload'} method="POST">
            <div className="uploadedFiles col-12 float-start">
              
            </div>
            <input type="file" name="file" accept=".png, .jpeg, .jpg, .pdf" onChange={handleUploader} id="fileUploadData" />
          </form>
          <br /><br />
          <button className="btn btn-square" onClick={handleSaveFile}>Add</button>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-2 py-2 float-start tableCon">
          <table className="table table-bordered col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Main Policy</th>
                <th scope="col">Quantity</th>
                <th scope="col">Type</th>
                <th scope="col">Weight</th>
                <th scope="col">Weight Type</th>
                <th scope="col">Container Size</th>
                <th scope="col">Container Temprature</th>
                <th scope="col">Additional Details</th>
                <th scope="col">Attached Files</th>
              </tr>
            </thead>
            <tbody id="tableBodyData">
            </tbody>
          </table>
          <h5 id="noFilesMsg">No Files Attached</h5>
        </div>
      </div>
    )
};

export default Uploader;