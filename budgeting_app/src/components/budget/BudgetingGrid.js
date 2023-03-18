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

function createData(categoryName, totalBudgetedAmount, totalActivityAmount, totalAvailableAmount) {
    return {
        categoryName,
        totalBudgetedAmount,
        totalActivityAmount,
        totalAvailableAmount,
        //TODO subcategorySection should get subcategories, maybe as a list? We have all calls for amounts already.
        //TODO Somehow subcategories needs to be grouped under each correct category
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
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.categoryName}
                </TableCell>
                <TableCell align="right">{row.totalBudgetedAmount}</TableCell>
                <TableCell align="right">{row.totalActivityAmount}</TableCell>
                <TableCell align="right">{row.totalAvailableAmount}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="budgets">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Subcategory</TableCell>
                                        <TableCell>Budgeted</TableCell>
                                        <TableCell align="">Activity</TableCell>
                                        <TableCell align="">Available</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.subcategorySection.map((historyRow) => (
                                        <TableRow key={historyRow.subcategoryName}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.subcategoryName}
                                            </TableCell>
                                            <TableCell>{historyRow.budgetedAmount}</TableCell>
                                            <TableCell align="">{historyRow.activityAmount}</TableCell>
                                            <TableCell align="">{historyRow.availableAmount}</TableCell>
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

const rows = [
    //TODO These are categories!
    createData('Lainat', 800, -680, 120),
    createData('Säästäminen', 300, 9.0, 37),
];

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
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
