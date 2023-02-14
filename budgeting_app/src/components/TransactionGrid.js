import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import Axios from 'axios';
import {useEffect} from 'react';
import * as React from 'react';
import moment from 'moment/moment';


export default function TransactionGrid() {
  const [rows, setRows] = React.useState([]);

  const columns = [
      { key: 'TransactionDate', name: 'Date' },
    { key: 'TransactionName', name: 'TransactionName' },
    { key: 'Outflow', name: 'Outflow' },
    { key: 'Inflow', name: 'Inflow' },
    { key: 'Recipient', name: 'Recipient' },
    { key: 'TransactionRepeat', name: 'Repeat' },
    { key: 'Memo', name: 'Memo' },
  ];
  const getUserTransactions = (userID) => {
    const baseUrl = `http://localhost:3001/transaction/${userID}`
    const updatedArray = [];
    Axios.get(baseUrl
    ).then((function (response){
      for(let x = 0; x<response.data.length; x++){
        updatedArray.push(
            {TransactionDate: moment(response.data[x].TransactionDate).format('YYYY-MM-DD'),
            TransactionName: response.data[x].TransactionName,
            Outflow: response.data[x].Outflow,
            Inflow: response.data[x].Inflow,
            Recipient: response.data[x].Recipient,
            TransactionRepeat: response.data[x].TransactionRepeat,
            Memo: response.data[x].Memo}
        )
        setRows([])
        setRows(updatedArray)
      }
    })).catch((response) => {
      alert(response);
    })
  };

  useEffect(() => {
    const userID = localStorage.getItem("UserID")
    getUserTransactions(userID)
  }, [])


  return <DataGrid columns={columns} rows={rows} />;
}