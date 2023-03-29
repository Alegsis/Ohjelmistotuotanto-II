import Axios from 'axios';
import {
    DataGrid, GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import moment from "moment";
import AddTransaction from "../transaction/AddTransaction";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const MuiTransactionGrid = ({rows, setaddTransactionSuccess, setMessage, setEffectOpen}) => {

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <AddTransaction setaddTransactionSuccess={setaddTransactionSuccess} setMessage={setMessage} setEffectOpen={setEffectOpen}/>
            </GridToolbarContainer>
        );
    }

    const handleSaveClick = (id) => () => {
        console.log(id)
    };

    const handleDeleteClick = (id) => () => {
        console.log(id)
    };

    const columns = [
        {field: 'TransactionDate', headerName: 'DATE', width: 150, editable: true},
        {field: 'AccountName', headerName: 'AccountName', width: 150, editable: true},
        {field: 'TransactionName', headerName: 'Transaction Name', width: 200, editable: true},
        {field: 'Outflow', headerName: 'Outflow', type: 'number', width: 100, editable: true},
        {field: 'Inflow', headerName: 'Inflow', type: 'number', width: 100, editable: true},
        {field: 'Recipient', headerName: 'Payee', width: 100, editable: true},
        {field: 'TransactionRepeat', headerName: 'Repeat', width: 100, editable: true},
        {field: 'Memo', headerName: 'Memo', width: 100, editable: true},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
            },
        },
    ];

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

export const getUserTransactions = (userID) => {
    const baseUrl = `http://localhost:3001/transaction/${userID}`;
    const updatedArray = [];
    return Axios.get(baseUrl).then(((response) => {
        for (let x = 0; x < response.data.length; x++) {
            updatedArray.push(
                {
                    id: x,
                    TransactionDate: moment(response.data[x].TransactionDate).format('YYYY-MM-DD'),
                    AccountName: response.data[x].AccountName,
                    TransactionName: response.data[x].TransactionName,
                    Outflow: response.data[x].Outflow,
                    Inflow: response.data[x].Inflow,
                    Recipient: response.data[x].Recipient,
                    TransactionRepeat: response.data[x].TransactionRepeat,
                    Memo: response.data[x].Memo,
                },
            );
        }
        return updatedArray;
    })).catch((response) => {
        alert(response.response.data);
    });
};

export default MuiTransactionGrid