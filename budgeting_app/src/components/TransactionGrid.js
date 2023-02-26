import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import Axios from 'axios';
import {useEffect, useState} from 'react';
import moment from 'moment/moment';

export default function TransactionGrid() {
  const [rows, setRows] = useState([]);

  const columns = [
    {
      key: 'selected',
      name: '',
      formatter: ({row}) => (
          <input
              type="checkbox"
              checked={row.selected}
              onChange={() => {
                const updatedRows = rows.map((r) => {
                  if (r.id === row.id) {
                    return {...r, selected: !r.selected};
                  } else {
                    return r;
                  }
                });
                setRows(updatedRows);
              }}
          />
      ),
      width: 40,
      headerRenderer: () => (
          <input
              type="checkbox"
              checked={rows.every((r) => r.selected)}
              onChange={(event) => {
                const checked = event.target.checked;
                const updatedRows = rows.map(
                    (r) => ({...r, selected: checked}));
                setRows(updatedRows);
              }}
          />
      ),
    },
    {key: 'TransactionDate', name: 'DATE'},
    {key: 'TransactionName', name: 'Transaction Name'},
    {key: 'Outflow', name: 'Outflow'},
    {key: 'Inflow', name: 'Inflow'},
    {key: 'Recipient', name: 'Payee'},
    {key: 'TransactionRepeat', name: 'Repeat'},
    {key: 'Memo', name: 'Memo'},
  ];

  const getUserTransactions = (userID) => {
    const baseUrl = `http://localhost:3001/transaction/${userID}`;
    const updatedArray = [];
    Axios.get(baseUrl).then((function(response) {
      for (let x = 0; x < response.data.length; x++) {
        updatedArray.push(
            {
              id: x,
              selected: false,
              TransactionDate: moment(response.data[x].TransactionDate).
                  format('YYYY-MM-DD'),
              TransactionName: response.data[x].TransactionName,
              Outflow: response.data[x].Outflow,
              Inflow: response.data[x].Inflow,
              Recipient: response.data[x].Recipient,
              TransactionRepeat: response.data[x].TransactionRepeat,
              Memo: response.data[x].Memo,
            },
        );
      }
      setRows(updatedArray);
    })).catch((response) => {
      console.log(response);
      alert('catch transactionGrid');
    });
  };

  useEffect(() => {
    const userID = localStorage.getItem('UserID');
    getUserTransactions(userID);
  }, []);
  return (
      <DataGrid columns={columns} rows={rows} className="TransactionGrid"/>
  );
}
