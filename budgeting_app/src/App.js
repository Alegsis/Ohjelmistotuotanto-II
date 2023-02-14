import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Categories";
import Transaction from "./pages/Transaction";
import Accounts from "./pages/Account";


function App() {
  return (
    <Router>
        <div className="header">
            <Header/>
        </div>

        <div className="row">
        <div className="column left">
            <Sidebar/>
        </div>
            <div className="column middle">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/categories" element={<Category />} />
                <Route path="/dashboard/transaction" element={<Transaction />} />
                <Route path="/accounts" element={<Accounts />} />
              </Routes>
            </div>
            <div className="column right">
            <p> Oikea sarake</p>
            </div>
        </div>
    </Router>
  );
}

export default App;
