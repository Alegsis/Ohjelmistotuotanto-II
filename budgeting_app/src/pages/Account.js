import React, {useEffect} from 'react';
import Axios from 'axios';
import DataGrid from 'react-data-grid';

const Accounts = () => {

  const [rows, setRows] = React.useState([]);

  const columns = [
    {key: 'AccountName', name: 'Account Name'},
    {key: 'Balance', name: 'Balance'},
    {key: 'AccountType', name: 'Account Type'},
    {key: 'BalanceDate', name: 'Latest change on'},
    {key: 'Active', name: 'Active'},
  ];

  const getUserAccounts = () => {

    const userID = localStorage.getItem('UserID');
    const baseUrl = `http://localhost:3001/account/${userID}`;
    const updatedArray = [];

    Axios.get(baseUrl).then((res) => {
      for (let x = 0; x < res.data.length; x++) {
        updatedArray.push({
          AccountName: res.data[x].AccountName,
          Balance: res.data[x].Balance,
          AccountType: res.data[x].AccountType,
          BalanceDate: res.data[x].BalanceDate,
          Active: res.data[x].IsActive ? 'yes' : 'no',
        });
      }
      setRows([]);
      setRows(updatedArray);
    }).catch((res) => {
      alert(res);
    });
  };

  useEffect(() => {
    return () => {
      getUserAccounts();
    };
  });

  return (
      <div className="accountGrid">
        <DataGrid columns={columns} rows={rows}/>
      </div>
  );
};

export default Accounts;