import React, { useEffect, useState } from 'react';
import Layout from "../../components/layout/Layout";
import LineChart from "../../components/elements/LineChart";
import PieChart from "../../components/elements/PieChart";
import RequestItem from "../../components/elements/RequestItem";
const handleDashboardRequest = require("../../handlers/handleDashboardRequest");
const checkIfLoggedIn = require('./../../util/checkIfLoggedIn');
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';


const options1 = {
  responsive: true,
  plugins: {
  legend: {
      position: 'top',
  },
  title: {
      display: true,
      text: 'Custom Clearance and Transportation Requests',
  },
  },
}
const options2 = {
  responsive: true,
  plugins: {
  legend: {
      position: 'top',
  },
  title: {
      display: true,
      text: 'Custom Clearance and Transportation Requests',
  },
  },
}





const App = ({adminDashboardData}) => {

  const [customClearanceData, setCustomClearanceData] = useState([]);
  const [transportationsData, setTransportationsData] = useState([]);
  const ChartDataPie = {
    labels: ['Custom Clearance', 'Transportation'],
    datasets: [
      {
        label: '# of Requests',
        data: [adminDashboardData.data.customClearanceData, adminDashboardData.data.transportationData],
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
  const previousDay = (minus) => {
    return new Date(Date.now() - minus * 864e5 - new Date(Date.now() - minus * 864e5).getTimezoneOffset() * 6e4).toISOString().split('T')[0];
  }
  
  const ChartData = {
    labels: [previousDay(7), previousDay(6), previousDay(5), previousDay(4), previousDay(3), previousDay(2), previousDay(1)],
    datasets: [
    {
        label: 'Custom Clearance',
        data: adminDashboardData.data.customClearanceDataArr,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        label: 'Transportation',
        data: adminDashboardData.data.transportationDataArr,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    ],
  }
  const UsersAnlatics = () => {
    return (
      <div className="col-12 col-lg-6 col-md-6 col-sm-12 col-xs-12 float-start">
        <div className="col-12 col-lg-6 col-md-6 col-sm-12 col-xs-12 float-start px-3 py-3">
          <div className="product-item-2 hover-up">
            <div className="text-center">
              <Image width="50px" height="50px" src="/assets/imgs/template/icons/users.svg" alt="money" />
            </div>
            <h5 className="text-center">TODAY'S USERS</h5>
            <h4 className="text-center">{adminDashboardData.data.todayUsersData} USER</h4>
            <div className="compare-tip">
              <span className={(adminDashboardData.data.todayUsersData > adminDashboardData.data.yesterdayUsersData) ? 'danger' : 'success'}>{adminDashboardData.data.yesterdayUsersData} </span>
              user registered yesterday
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-md-6 col-sm-12 col-xs-12 float-start px-3 py-3">
          <div className="product-item-2 hover-up">
            <div className="text-center">
              <Image width="50px" height="50px" src="/assets/imgs/template/icons/all-users.svg" alt="money" />
            </div>
            <h5 className="text-center">All USERS</h5>
            <h4 className="text-center">{adminDashboardData.data.allUsersData} USER</h4>
            <div className="compare-tip">
              All 
              <span className="success"> Registered </span>
              Users
            </div>
          </div>
        </div>
      </div>
    )
  }
  const DebtComp = () => {
    return (
      <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12 float-start px-3 py-3">
        <div className="product-item-2 hover-up">
          <div className="text-center">
            <Image width="50px" height="50px" src="/assets/imgs/template/icons/money-bills.svg" alt="money" />
          </div>
          <h5 className="text-center">Total Debt</h5>
          <h4 className="text-center">{adminDashboardData.data.allWithdrawBalance-adminDashboardData.data.allDepositBalance} SAR</h4>
          <div className="compare-tip">
            Please,
            <span className="danger"> PAY </span>
            Them ASAP
          </div>
        </div>
      </div>
    )
  }
  useEffect(() => {
    handleDashboardRequest('custom_clearance').
      then((result) => {
        setCustomClearanceData(result);
      })
    handleDashboardRequest('transportation').
      then((result) => {
        setTransportationsData(result);
      })
  }, [])
  
  return (
    <>
    <Layout userCreds={['original-user','custom-clearance','super-admin']} params={[]} modelName='' forNewUsers={0}>
      
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 float-start">
          <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12 float-start px-3 py-3">
            <div className="product-item-2 hover-up">
              <div className="text-center">
                <Image width="50px" height="50px" src="/assets/imgs/template/icons/money.svg" alt="money" />
              </div>
              <h5 className="text-center">TODAY'S Withdraw</h5>
              <h4 className="text-center">{adminDashboardData.data.currentDayWithdrawBalance} SAR</h4>
              <div className="compare-tip">
                <span className="success">{adminDashboardData.data.currentDayDepositBalance} </span>
                SAR is 
                <span className="success"> TODAY'S Deposit to Users </span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12 float-start px-3 py-3">
            <div className="product-item-2 hover-up">
              <div className="text-center">
                <Image width="50px" height="50px" src="/assets/imgs/template/icons/money-bills.svg" alt="money" />
              </div>
              <h5 className="text-center">All Withdraws</h5>
              <h4 className="text-center">{adminDashboardData.data.allWithdrawBalance} SAR</h4>
              <div className="compare-tip">
                <span className="success">{adminDashboardData.data.allDepositBalance} </span>
                SAR is 
                <span className="success"> All Deposits </span>
              </div>
            </div>
          </div>
          {(adminDashboardData.data.super_admin) ? <UsersAnlatics /> : <DebtComp />}
        </div>
      </div>
      
      <div className="container-fluid backgrounded-con float-start px-3 py-3">
        <div className="container">
          <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 px-2 py-2 float-start">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white px-5 py-5 float-start">
              <LineChart options={options1} ChartData={ChartData} />
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 px-2 py-2 float-start">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white px-5 py-5 float-start">
              <PieChart options={options2} ChartData={ChartDataPie} />
            </div>
          </div>
        </div>
      </div>

      {/*<div className="container-fluid backgrounded-con float-start px-3 py-3">
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

              <RequestItem
                content={customClearanceData}
                table="custom_clearances"
              />

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

              <RequestItem
                content={transportationsData}
                table="transportations"
              />

              <Link href="#">
                <a className="btn btn-square container-fluid float-end">
                  View All
                </a>
              </Link>

            </div>
          </div>
        </div>
      </div>*/}
    </Layout>
  </>
  );
}


export default App;


export async function getServerSideProps(context) {
  let accessToken = context.req.cookies['accessToken'];
  const getNumIdRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/settings/adminDashboard', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': accessToken
      }
  });

  let content = await getNumIdRequest.json();
  return {
    props:{
      adminDashboardData: content
    }
  }
} 