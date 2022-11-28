import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import OptionItem from "./OptionItem";
const handleAllUsers = require('./../../handlers/handleAllUsers');
const handleMovements = require('./../../handlers/handleMovements');
const handleBalance = require('./../../handlers/handleBalance');
const handleTableReader = require('./../../handlers/handleTableReader');

const Bank = ({requestId, tableName}) => {
    const [choosedUserBalance, setChoosedUserBalance] = useState('');
    const [choosedUserDebt, setChoosedUserDebt] = useState('');
    const [choosedUserDebtLimit, setChoosedUserDebtLimit] = useState('');
    const [choosedUser, setChoosedUser] = useState('');
    const [allUsersData, setAllUsersData] = useState([]);
    const [allMovementsData, setAllMovementsData] = useState([]);

    const handleTransaction = async (e) => {
        e.preventDefault();
        const u_id= document.querySelector('.u_id').value;
        const amount= document.querySelector('.amount').value;
        const status= document.querySelector('.status').value;
        const movementId= document.querySelector('.movementId').value;
        const details= document.querySelector('.details').value;
        const accessToken = JSON.parse(sessionStorage.getItem('loginData')).data.accessToken;
        const requestBody = {
          u_id: u_id,
          amount: amount,
          status: status,
          movementId: movementId,
          details: details
        };
        const transactionsRequest = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/transactions/create', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': accessToken
          },
          body: JSON.stringify(requestBody)
          });
        const content = await transactionsRequest.json();
        if(content.success) {
            document.querySelector(".custom-alert-data").innerHTML = '';
            document.querySelector(".custom-alert-data").innerHTML = '<div class="alert alert-success" role="alert">Created Succesfully</div>';
      
            document.querySelector('.u_id').value = content.transaction.u_id;
            document.querySelector('.amount').value = '';
            document.querySelector('.status').value = 0;
            document.querySelector('.movementId').value = 0;
            document.querySelector('.details').value = '';
            handleBalance(choosedUser).
                then((result) => {
                    setChoosedUserBalance(result?.currentBalance);
                    setChoosedUserDebt(result?.currentDebt);
                    setChoosedUserDebtLimit(result?.debtLimit);
                })
        }else{
            document.querySelector(".custom-alert-data").innerHTML = '<div class="alert alert-danger" role="alert">Something went wrong, User haven`t enough Balance. (And his debt is/will Maximum)</div>';
        }
    }
    const userChanged = () => {
        const u_id= document.querySelector('.u_id').value;
        setChoosedUser(u_id);
    }
    useEffect(() => {
        handleAllUsers().
            then((result) => {
                setAllUsersData(result);
            });
        handleMovements(requestId).
            then((result) => {
                setAllMovementsData(result);
            });
        handleBalance(choosedUser).
            then((result) => {
                setChoosedUserBalance(result?.currentBalance);
                setChoosedUserDebt(result?.currentDebt);
                setChoosedUserDebtLimit(result?.debtLimit);
            })
        handleTableReader(requestId, '_id','/api/'+tableName+'/read').then((result) => {
            setChoosedUser(result[tableName].u_id);
        })
    },[]);

    useEffect(() => {
        handleBalance(choosedUser).
            then((result) => {
                setChoosedUserBalance(result?.currentBalance);
                setChoosedUserDebt(result?.currentDebt);
                setChoosedUserDebtLimit(result?.debtLimit);
                document.querySelector('.u_id').value = choosedUser;
            })
    },[choosedUser]);
    return (
    <div className="col-12 px-3 py-3 mt-3 float-start" style={{background: '#fff'}}>
        <h5>Bank Request</h5>
        <div className="custom-alert-data"></div>
        <select name="u_id" onChange={userChanged} className="u_id my-2 h6" style={{width: '100%', padding: '10px'}}>
            <OptionItem content={allUsersData} property="name" table="users" />
        </select><br />
        <h5>Balance: <code>{choosedUserBalance}</code> SAR | Debt: <code>{choosedUserDebt}</code> SAR</h5><br />
        <h5>Debt Limit: <code>{choosedUserDebtLimit}</code> SAR | Remaining: <code>{choosedUserDebtLimit-choosedUserDebt}</code> SAR</h5><br />
        
        <label>Transaction Amount</label>
        <input type="text" placeholder="amount" name="amount" className="form-control amount"/><br />
        <label>Choose Status</label>
        <select name="status" className="status my-2 h6" style={{width: '100%', padding: '10px'}}>
            <option value="0">Withdraw</option>
            <option value="1">Deposit</option>
        </select><br />
        <label>Choose Connected Policy</label>
        <select name="movementId" className="movementId my-2 h6" style={{width: '100%', padding: '10px'}}>
            <option value="0">Not Connected</option>
            <OptionItem content={allMovementsData}
                property="content"
                table="movements"
                internalItem={true}
                internalItemKey="mainPolicy"
            />
        </select><br />
        <textarea placeholder="Additional Details" className="form-control details" id="details"></textarea><br />
        <button className="btn btn-square" onClick={handleTransaction}>Create</button>
    </div>
    )
}

export default Bank;