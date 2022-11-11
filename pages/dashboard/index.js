import React, { useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import LineChart from "../../components/elements/LineChart";
import PieChart from "../../components/elements/PieChart";
import Link from 'next/link';
import Image from 'next/image';
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');
import { useRouter } from 'next/router';


const options = {
  responsive: true,
  plugins: {
  legend: {
      position: 'top',
  },
  title: {
      display: true,
      text: 'Chart.js Line Chart',
  },
  },
}

const ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
  {
      label: 'Dataset 1',
      data: [5, 6, 7,20,20,3,7],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
  },
  {
      label: 'Dataset 2',
      data: [42, 30, 1,77,25,0,50],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
  ],
}

const ChartDataPie = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const App = () => {
  const router = useRouter();
  const [logged , setLogged] = useState(false);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      checkIfLoggedIn()
          .then((result) => {
              if(result){
                setLogged(true);
                console.log('Loggedin');
              }else{
                setLogged(false);
                console.log('Not Loggedin');
                router.push({ pathname: '/page-login' })
              }
          })
  });
  const NotLoggedInComponent = () => {
    return false;
  }
  const LoggedInComponent = () => {
    return (
      <>
      <div className="container-fluid backgrounded-con float-start px-3 py-3">
        <div className="container">
          <div className="col-12 px-3 py-3 float-start" style={{background: '#fff'}}>
              <ul className="nav nav-pills nav-fill col-12 float-start">
                  <li className="nav-item">
                      <Link href="/dashboard"><a className="nav-link h5"><i className="fi fi-rr-user"></i> Dashboard</a></Link>
                  </li>
                  <li className="nav-item">
                      <Link href="/dashboard/custom-clearance-form"><a className="nav-link h5"><i className="fi fi-rr-stats"></i> Add Custom Clearance</a></Link>
                  </li>
                  <li className="nav-item">
                      <Link href="/dashboard/transportation-form"><a className="nav-link h5"><i className="fi fi-rr-data-transfer"></i> Add Transportation</a></Link>
                  </li>
              </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start">
          <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12 float-start px-3 py-3">
            <div className="product-item-2 hover-up">
              <div className="text-center">
                <Image width="50px" height="50px" src="/assets/imgs/template/icons/money.svg" alt="money" />
              </div>
              <h5 className="text-center">TODAY'S MONEY</h5>
              <h4 className="text-center">5619562 SAR</h4>
              <div className="compare-tip">
                <span className="danger">-13% </span>
                decrease than yesterday
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12 float-start px-3 py-3">
            <div className="product-item-2 hover-up">
              <div className="text-center">
                <Image width="50px" height="50px" src="/assets/imgs/template/icons/users.svg" alt="money" />
              </div>
              <h5 className="text-center">TODAY'S USERS</h5>
              <h4 className="text-center">561 USER</h4>
              <div className="compare-tip">
                <span className="success">+53% </span>
                increase than yesterday
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12 float-start px-3 py-3">
            <div className="product-item-2 hover-up">
              <div className="text-center">
                <Image width="50px" height="50px" src="/assets/imgs/template/icons/money-bills.svg" alt="money" />
              </div>
              <h5 className="text-center">All Money</h5>
              <h4 className="text-center">15619562 SAR</h4>
              <div className="compare-tip">
                <span className="danger">45113 </span>
                SAR is 
                <span className="danger"> DEBT </span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12 float-start px-3 py-3">
            <div className="product-item-2 hover-up">
              <div className="text-center">
                <Image width="50px" height="50px" src="/assets/imgs/template/icons/all-users.svg" alt="money" />
              </div>
              <h5 className="text-center">All USERS</h5>
              <h4 className="text-center">1561 USER</h4>
              <div className="compare-tip">
                <span className="success">45 </span>
                are Clients 
                <span className="success"> (Made Transactions) </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-fluid backgrounded-con float-start px-3 py-3">
        <div className="container">
          <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 px-2 py-2 float-start">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white px-5 py-5 float-start">
              <LineChart options={options} ChartData={ChartData} />
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 px-2 py-2 float-start">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white px-5 py-5 float-start">
              <PieChart options={options} ChartData={ChartDataPie} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid backgrounded-con float-start px-3 py-3">
        <div className="container">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-2 py-2 float-start">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white px-3 py-3 float-start">
              <h5>
                Custom Clearance Requests
                <Link href="/dashboard/custom-clearance-form">
                  <a className="btn btn-square float-end">
                    Add New
                  </a>
                </Link>
              </h5>

              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>

              <Link href="#">
                <a className="btn btn-square container-fluid float-end">
                  View All
                </a>
              </Link>

            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 px-2 py-2 float-start">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white px-3 py-3 float-start">
              <h5>
                Transportation Requests
                <Link href="/dashboard/transportation-form">
                  <a className="btn btn-square float-end">
                    Add New
                  </a>
                </Link>
              </h5>

              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="container-fluid float-start">
                <div className="container-fluid h5 px-3 py-3 float-start">
                  <Link href="/dashboard/custom-clearance-request/636668dc786b5747c96b0202">
                    <a className="container-fluid float-start">
                      Request title example
                      <i className="fi-rr-caret-right float-end"></i>
                    </a>
                  </Link>
                </div>
              </div>

              <Link href="#">
                <a className="btn btn-square container-fluid float-end">
                  View All
                </a>
              </Link>

            </div>
          </div>
        </div>
      </div>
      </>
)
  }
  return (
    <>
    <Layout>
      {((logged) ? <LoggedInComponent /> : <NotLoggedInComponent /> )}
    </Layout>
  </>
  );
}


export default App;