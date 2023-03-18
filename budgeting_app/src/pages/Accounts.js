import React, {useEffect, useState} from 'react';
import MuiTransactionGrid from "../components/transaction/mui-TransactionGrid";
import {getUserTransactions} from "../components/transaction/mui-TransactionGrid"

const Accounts = ({loggedIn, addTransactionSuccess, setaddTransactionSuccess, toggleAlert, setMessage}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (loggedIn || addTransactionSuccess) {
            const userID = localStorage.getItem('UserID');
            getUserTransactions(userID).then((data) => setRows(data)).catch((error) => {
                console.log(error)
                alert('error retrieving UserTransactions')
            });
            setaddTransactionSuccess(false)
        }
    }, [loggedIn, addTransactionSuccess]);

  return (
      <div className="transaction">
          <MuiTransactionGrid rows={rows} setaddTransactionSuccess={setaddTransactionSuccess} toggleAlert={toggleAlert} setMessage={setMessage}/>
      </div>
  );
};

export default Accounts;