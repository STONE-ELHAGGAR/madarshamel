const attachedFilesFullData = [];
const previousFiles = [];

const handleSaveFile = async (e,tableName) => {
  if (typeof window !== 'undefined') {
  e.preventDefault();
  const mainPolicy= document.querySelector('.mainPolicy').value;
  const quantity= document.querySelector('.quantity').value;
  const type= document.querySelector('.type').value;
  const weight= document.querySelector('.weight').value;
  const weightType= document.querySelector('.weightType').value;
  const containerNumber= document.querySelector('.containerNumber').value;
  const containerSize= document.querySelector('.containerSize').value;
  const containerTemp= document.querySelector('.containerTemp').value;
  const details= document.querySelector('.details').value;
  const activeIndex= document.querySelector('.activeIndex').value;
  const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;

  let requestContent = {
    mainPolicy: mainPolicy,
    quantity: quantity,
    type: type,
    weight: weight,
    weightType: weightType,
    containerNumber: containerNumber,
    containerSize: containerSize,
    containerTemp: containerTemp,
    details: details,
    files: sessionStorage.getItem('files')
  };
  console.log(requestContent);
  const fileRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/movements/create', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': accessToken
    },
    body: JSON.stringify({
      content: JSON.stringify(requestContent),
      type: 'attachedFile',
      requestType: tableName,
      requestId: activeIndex,
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
      document.querySelector('.containerNumber').value = '';
      document.querySelector('.containerSize').value = '';
      document.querySelector('.containerTemp').value = '';
      document.querySelector('.details').value = '';
      document.getElementById('fileUploadData').value = null;
      document.querySelector(".uploadedFiles").innerHTML = '';
      sessionStorage.setItem('files','');
      
      previousFiles = [];
  }else{
      document.querySelector(".alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, please fill all fields correctly OR try again</div>';
  }
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

const MovementUploader = ({id,tableName = 'custom-clearance'}) => {
    return (
        
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-2 py-2 bg-white float-start">
          <h4 className="text-center">Files</h4>
          <div className="alert-data"> </div>
          <input className="form-control mt-20 display-1 mainPolicy" name="mainPolicy" placeholder="Main Policy" />
          <input className="form-control mt-20 display-1 quantity" name="quantity" placeholder="Quantity" />
          <input className="form-control mt-20 display-1 type" name="type" placeholder="Type" />
          <input className="form-control mt-20 display-1 weight" name="weight" placeholder="Weight" />
          <input className="form-control mt-20 display-1 weightType" name="weightType" placeholder="Weight Type" />
          <input className="form-control mt-20 display-1 containerNumber" name="containerNumber" placeholder="Container Number" />
          <input className="form-control mt-20 display-1 containerSize" name="containerSize" placeholder="Container Size" />
          <input className="form-control mt-20 display-1 containerTemp" name="containerTemp" placeholder="Container Temprature" />
          <textarea className="form-control mt-20 display-1 details" name="details" placeholder="Additional Details"></textarea>
          <br />
          <form encType="multipart/form-data" action={process.env.NEXT_PUBLIC_BASE_URL+'/api/files/upload'} method="POST">
            <div className="uploadedFiles col-12 float-start">
              
            </div>
            <input type="hidden" name="activeIndex" className="activeIndex" value={id} id="activeIndex" />
            <input type="file" name="file" accept=".png, .jpeg, .jpg, .pdf" onChange={handleUploader} id="fileUploadData" />
          </form>
          <br /><br />
          <button className="btn btn-square" onClick={(e) => {handleSaveFile(e,tableName)}}>Attach</button>
        </div>
      </div>
    )
};

export default MovementUploader;