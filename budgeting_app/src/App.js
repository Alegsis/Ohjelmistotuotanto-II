import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Categories";
import Transaction from "./pages/Transaction";
import Accounts from "./pages/Account";

function App() {
  return (
    <Router>
        <Topbar/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/categories" element={<Category />} />
        <Route path="/dashboard/transaction" element={<Transaction />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </Router>
  );
}

export default App;
