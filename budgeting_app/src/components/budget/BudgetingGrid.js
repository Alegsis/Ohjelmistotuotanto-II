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
import {useState} from 'react';
import Axios from 'axios';

const CollapsibleTable = ({rows}) => {

  const [accountStyle, setAccountStyle] = useState(true);

  const handleAccountChange = (props) => {
    setAccountStyle(props);
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
                      {row.subcategorySection.map((subcategoryRow, index) => (
                          <TableRow key={index}>
                            <TableCell></TableCell>
                            <TableCell component="th" scope="row">
                              {subcategoryRow.subcategoryName}
                            </TableCell>
                            <TableCell
                                align="right">{subcategoryRow.budgetedAmount}</TableCell>
                            <TableCell
                                align="right">{subcategoryRow.activityAmount}</TableCell>
                            <TableCell
                                align="right"
                                style={{backgroundColor: subcategoryRow.goalColor}}>{subcategoryRow.availableAmount}</TableCell>
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
      ),
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
            {rows.map((row, index) => (
                <Row key={index} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export const getGridData = async () => {
  const userID = localStorage.getItem('UserID');
  const month = localStorage.getItem('Month');
  const year = localStorage.getItem('Year');
  const date = `${year}-${month}`;

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

  const getSql1 = `http://localhost:3001/subcategory/user-${userID}/activity-and-budgeted-this-month/date-${date}`;
  const resultBudget = await Axios.get(getSql1);
  const budgetData = resultBudget.data;

  const getSql2 = `http://localhost:3001/category/${userID}/return-category-dictionary/date-${date}`;
  const resultCategories = await Axios.get(getSql2);
  const categoryData = resultCategories.data;
  const categoryCount = categoryData.length;
  let tempArray = [];

  const getSql3 = `http://localhost:3001/goal/${userID}/get-goal-amounts`;
  const resultGoals = await Axios.get(getSql3);
  const goalsData = resultGoals.data;

  //TODO here go the conditions of balance look up either Total.js or
  for (let x = 0; categoryCount > x; x++) {
    const categoryName = categoryData[x].category;
    const subCategoryCount = categoryData[x].subcategory.length;

    let subcategoryArray = [];
    let totalAvailable = 0;
    let totalBudgeted = 0;
    let totalActivity = 0;

    for (let y = 0; subCategoryCount > y; y++) {

      const subCategoryName = categoryData[x].subcategory[y].category;
      const availableAmount = parseFloat(
          categoryData[x].subcategory[y].balance);

      const budgetedIndex = budgetData.findIndex(
          obj => obj.SubCategoryName === subCategoryName);

      const goalIndex = goalsData.findIndex(
          obj => obj.SubCategoryName === subCategoryName);



      let activityAmount = 0;
      let budgetedAmount = 0;
      let goalAmount = 0;
      let color;

      if (budgetedIndex !== -1) {
        budgetedAmount = parseFloat(budgetData[budgetedIndex].Budgeted) || 0;
        activityAmount = parseFloat(budgetData[budgetedIndex].Activity) || 0;
      }
      if (goalIndex !== -1) {
        goalAmount = parseFloat(goalsData[goalIndex].Amount) || 0;
      }

      //goalType 1 here made (maybe?):
      if (goalAmount === 0){
        //green
        color = '#099300';
      }
      else if (budgetedAmount < goalAmount ) {
        //orange
        color = '#fd8200';
      }
      else if (budgetedAmount >= goalAmount) {
        //green
        color = '#099300';
      }
      else if (availableAmount < 0) {
        //red
        color = '#ca0000';
      }

      totalAvailable += availableAmount;
      totalBudgeted += budgetedAmount;
      totalActivity += activityAmount;

      const subcategoryJson = {
        subcategoryName: subCategoryName,
        budgetedAmount: budgetedAmount.toFixed(2),
        activityAmount: activityAmount.toFixed(2),
        availableAmount: availableAmount.toFixed(2),
        goalColor: color,
      };
      subcategoryArray.push(subcategoryJson);
    }

    tempArray.push(createData(categoryName, totalBudgeted.toFixed(2),
        totalActivity.toFixed(2), totalAvailable.toFixed(2), subcategoryArray));
  }

  return tempArray;
};

export default CollapsibleTable;