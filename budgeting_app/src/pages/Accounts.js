import React, {useEffect, useState} from 'react';
import MuiTransactionGrid from "../components/transaction/mui-TransactionGrid";
import {getUserTransactions} from "../components/transaction/mui-TransactionGrid"

const Accounts = ({loggedIn}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (loggedIn) {
            const userID = localStorage.getItem('UserID');
            getUserTransactions(userID).then((data) => setRows(data)).catch((error) => {
                console.log(error)
                alert('error retrieving UserTransactions')
            });
        }
    }, [loggedIn]);

  return (
      <div className="transaction">
          <MuiTransactionGrid rows={rows}/>
      </div>
  );
};

export default Accounts;