import React from "react";
import AddCategory from "../components/categories/AddCategory";
import AddSubCategory from "../components/categories/AddSubCategory";
import React from 'react'
import AddBudget from '../components/budget/AddBudget';

const Dashboard = () => {
  return (
    <div className="home">
      <AddCategory></AddCategory>
      <AddSubCategory></AddSubCategory>
      <AddBudget/>
    </div>
  );
};

export default Dashboard;
