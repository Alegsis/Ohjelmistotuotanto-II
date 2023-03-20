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
  const [rows, setRows] = useState([]);

  const getGridData = async () => {
    const userID = localStorage.getItem('UserID');
    const month = localStorage.getItem('Month');
    const year = localStorage.getItem('Year');
    const date = `${year}-${month}`

    const getSql1 = `http://localhost:3001/subcategory/user-${userID}/activity-and-budgeted-this-month/date-${date}`;
    const resultBudget = await Axios.get(getSql1);
    const budgetData = resultBudget.data;


    const getSql2 = `http://localhost:3001/category/${userID}/return-category-dictionary`;
    const resultCategories = await Axios.get(getSql2);
    const categoryData = resultCategories.data;
    const categoryCount = categoryData.length;
    let tempArray = [];

    for (let x = 0; categoryCount > x; x++) {
      const categoryName = categoryData[x].category;
      const subCategoryCount = categoryData[x].subcategory.length;

      let subcategoryArray = [];
      let totalAvailable = 0;
      let totalBudgeted = 0;
      let totalActivity = 0;

      for (let y = 0; subCategoryCount > y; y++) {

        const subCategoryName = categoryData[x].subcategory[y].category;
        const availableAmount = parseFloat(categoryData[x].subcategory[y].balance);

        const budgetedIndex = budgetData.findIndex(obj => obj.SubCategoryName===subCategoryName);

        let activityAmount = 0;
        let budgetedAmount = 0;

        if(budgetedIndex !== -1){
          budgetedAmount = parseFloat(budgetData[budgetedIndex].Budgeted) || 0;
          activityAmount = parseFloat(budgetData[budgetedIndex].Activity) || 0;
        }


        totalAvailable += availableAmount
        totalBudgeted += budgetedAmount
        totalActivity += activityAmount

        const subcategoryJson = {
          subcategoryName: subCategoryName,
          budgetedAmount: budgetedAmount,
          activityAmount: activityAmount,
          availableAmount: availableAmount,
        };
        subcategoryArray.push(subcategoryJson);
      }

      tempArray.push(createData(categoryName, totalBudgeted,
          totalActivity, totalAvailable, subcategoryArray));
    }

    setRows(tempArray);
  };

  useEffect(() => {
    getGridData();
  }, []);

  const createData = (
      categoryName, totalBudgetedAmount, totalActivityAmount,
      totalAvailableAmount, subcategorySection) => {
    return {
      categoryName,
      totalBudgetedAmount,
      totalActivityAmount,
      totalAvailableAmount,
      subcategorySection,
    };
  };

  const Row = (props) => {
    const {row} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
          <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
            <TableCell width="5%">
              <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </IconButton>
            </TableCell>
            <TableCell width="30%" component="th" scope="row">
              {row.categoryName}
            </TableCell>
            <TableCell align="right"
                       width="10%">{row.totalBudgetedAmount}</TableCell>
            <TableCell align="right"
                       width="10%">{row.totalActivityAmount}</TableCell>
            <TableCell align="right"
                       width="10%">{row.totalAvailableAmount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{margin: 0}}>
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
                            <TableCell
                                align="right">{subcategoryRow.budgetedAmount}</TableCell>
                            <TableCell
                                align="right">{subcategoryRow.activityAmount}</TableCell>
                            <TableCell
                                align="right">{subcategoryRow.availableAmount}</TableCell>
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
  };

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
              <TableCell/>
              <TableCell>All categories</TableCell>
              <TableCell align="right">Budgeted</TableCell>
              <TableCell align="right">Activity</TableCell>
              <TableCell align="right">Available</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <Row key={row.name} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default CollapsibleTable;