import React from "react";
import AddCategory from "../components/categories/AddCategory";
import AddSubCategory from "../components/categories/AddSubCategory";

const Dashboard = () => {
  return (
    <div className="home">
      <AddCategory></AddCategory>
      <AddSubCategory></AddSubCategory>
    </div>
  );
};

export default Dashboard;
