import AddCategory from '../components/categories/AddCategory';
import AddSubCategory from '../components/categories/AddSubCategory';
import MoveDeleteSubCategory from '../components/categories/UpdateSubCategory';
import React from 'react';
import AddBudget from '../components/budget/AddBudget';
import BudgetingGrid from '../components/budget/BudgetingGrid.js';
const Dashboard = () => {
  return (
      <div className="home">
        <div className="budgetingRow">
          <AddCategory></AddCategory>
          <AddSubCategory></AddSubCategory>
          <MoveDeleteSubCategory></MoveDeleteSubCategory>
          <AddBudget/>
        </div>
        <BudgetingGrid/>
      </div>
  );

};

export default Dashboard;