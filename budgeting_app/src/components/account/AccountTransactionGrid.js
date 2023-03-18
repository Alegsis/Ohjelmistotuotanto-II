import Axios from 'axios';
import {useEffect, useState} from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import moment from "moment";
import AddTransaction from "../transaction/AddTransaction";

const AccountTransactionGrid = ({AccountName}) => {
    const [rows, setRows] = useState([]);

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <AddTransaction />
            </GridToolbarContainer>
        );
    }

    const columns = [
        {field: 'TransactionDate', headerName: 'DATE', width: 150, editable: true},
        {field: 'TransactionName', headerName: 'Transaction Name', width: 200, editable: true},
        {field: 'Outflow', headerName: 'Outflow', type: 'number', width: 150, editable: true},
        {field: 'Inflow', headerName: 'Inflow', type: 'number', width: 150, editable: true},
        {field: 'Recipient', headerName: 'Payee', width: 150, editable: true},
        {field: 'TransactionRepeat', headerName: 'Repeat', width: 150, editable: true},
        {field: 'Memo', headerName: 'Memo', width: 300, editable: true}
    ];
    const getAccountTransactions = (userID, accountName) => {
        const baseUrl = `http://localhost:3001/transaction/user-${userID}/accounts-transactions/account-${accountName}`;
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
            alert(response.response.data);
        });
    };

    useEffect(() => {
        const userID = localStorage.getItem('UserID')
        getAccountTransactions(userID, AccountName)
    }, [AccountName]);

    return(
        <div style={{ width: '100%' }}>
            <DataGrid
                experimentalFeatures={{ columnGrouping: true }}
                autoHeight {...columns}
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