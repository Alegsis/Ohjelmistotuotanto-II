import Axios from 'axios';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import CustomToolbar from "../helpers/GridToolbar";
import moment from "moment";

const AccountTransactionGrid = () => {
    const [rows, setRows] = useState([]);

    const columns = [
        {field: 'TransactionDate', headerName: 'DATE', width: 150},
        {field: 'TransactionName', headerName: 'Transaction Name', width: 200},
        {field: 'Outflow', headerName: 'Outflow', type: 'number', width: 150},
        {field: 'Inflow', headerName: 'Inflow', type: 'number', width: 150},
        {field: 'Recipient', headerName: 'Payee', width: 150},
        {field: 'TransactionRepeat', headerName: 'Repeat', width: 150},
        {field: 'Memo', headerName: 'Memo', width: 400}
    ];
    const getAccountTransactions = (userID, accountName) => {
        const baseUrl = `http://localhost:3001/account/user-${userID}/account-id/account-${accountName}`;
        const updatedArray = [];
        Axios.get(baseUrl).then(((response) => {
            for (let x = 0; x < response.data.length; x++) {
                updatedArray.push(
                    {
                        id: x,
                        TransactionDate: moment(response.data[x].TransactionDate).format('YYYY-MM-DD'),
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
            alert('catch AccountTransactionGrid');
        });
    };

    useEffect(() => {
        const userID = localStorage.getItem('UserID')
        const AccountName = window.location.href.split('/').pop()
        localStorage.setItem("AccountName", AccountName)
        console.log(AccountName)
        getAccountTransactions(userID, AccountName)
    }, []);

    return(
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                experimentalFeatures={{ columnGrouping: true }}
                columns={columns}
                rows={rows}
                checkboxSelection
                disableSelectionOnClick
                components={{
                    Toolbar: CustomToolbar,
                }}
                className="TransactionGrid"
            />
        </div>
    )
}

export default AccountTransactionGrid