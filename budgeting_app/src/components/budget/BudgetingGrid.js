import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useEffect, useState} from 'react';
import Axios from 'axios';

const CollapsibleTable = () => {
    const [gridData, setGridData] = useState();
    const [rows, setRows] = useState([])


    const getGridData = () => {
        const userID = localStorage.getItem('UserID');
        const baseURL = `http://localhost:3001/category/${userID}/return-category-dictionary`
        Axios.get(baseURL)
        .then((response) => {

            console.log(response.data)

            const data = response.data;
            const categoryCount = data.length;
            let tempArray = []

            for(let x = 0; categoryCount > x; x++){
                console.log('jaa')
                const categoryName = data[x].category;
                const subCategoryCount = data[x].subcategory.length;

                let subcategoryArray = [];

                for(let y = 0; subCategoryCount > y; y++){
                    const subCategoryName = data[x].subcategory[y].category;
                    const subCategoryBalance = data[x].subcategory[y].balance;

                    const subcategoryJson = {
                        subcategoryName : subCategoryName,
                        budgetedAmount : 0,
                        activityAmount: 0,
                        availableAmount: subCategoryBalance
                    }
                    subcategoryArray.push(subcategoryJson);
                }
                tempArray.push(createData(categoryName, 0, 0, 0, subcategoryArray))

            }

            setRows(tempArray)

        }).catch((response) => {
            alert(response.response.data)
        })
    }

    useEffect(() => {
        getGridData();
    }, [])

    const createData = (categoryName, totalBudgetedAmount, totalActivityAmount, totalAvailableAmount, subcategorySection) => {
        console.log(subcategorySection)
        return {
            categoryName,
            totalBudgetedAmount,
            totalActivityAmount,
            totalAvailableAmount,
            subcategorySection

/*
            subcategorySection: [
                {
                    subcategoryName: 'Asuntolaina',
                    budgetedAmount: '600',
                    activityAmount: -580,
                    availableAmount: 20,
                },
                {
                    subcategoryName: 'Autolaina',
                    budgetedAmount: '200',
                    activityAmount: -100,
                    availableAmount: 100,
                },
            ],

 */
        };
    }

    const Row = (props) => {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell width="5%">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell width="30%" component="th" scope="row">
                        {row.categoryName}
                    </TableCell>
                    <TableCell align="right" width="10%">{row.totalBudgetedAmount}</TableCell>
                    <TableCell align="right" width="10%">{row.totalActivityAmount}</TableCell>
                    <TableCell align="right" width="10%">{row.totalAvailableAmount}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 0 }}>
                                <Table size="small" aria-label="budgets">
                                    <TableHead>
                                    </TableHead>
                                    <TableBody>
                                        {row.subcategorySection.map((subcategoryRow) => (
                                            <TableRow key={subcategoryRow.subcategoryName}>
                                                <TableCell></TableCell>
                                                <TableCell component="th" scope="row">
                                                    {subcategoryRow.subcategoryName}
                                                </TableCell>
                                                <TableCell align="right">{subcategoryRow.budgetedAmount}</TableCell>
                                                <TableCell align="right">{subcategoryRow.activityAmount}</TableCell>
                                                <TableCell align="right">{subcategoryRow.availableAmount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            totalBudgetedAmount: PropTypes.number.isRequired,
            totalActivityAmount: PropTypes.number.isRequired,
            totalAvailableAmount: PropTypes.number.isRequired,
            subcategory: PropTypes.arrayOf(
                PropTypes.shape({
                    activityAmount: PropTypes.number.isRequired,
                    budgetedAmount: PropTypes.string.isRequired,
                    subcategoryName: PropTypes.string.isRequired,
                }),
            ).isRequired,
            categoryName: PropTypes.string.isRequired,
        }).isRequired,
    };


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" density="">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>All categories</TableCell>
                        <TableCell align="right">Budgeted</TableCell>
                        <TableCell align="right">Activity</TableCell>
                        <TableCell align="right">Available</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CollapsibleTable