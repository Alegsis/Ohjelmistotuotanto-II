import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Account';
import {useState} from 'react';

/*
* Huom, jos haluat saada oikean sarakkeen näkymään, poista kommentit divistä*/

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
      <Router>
        <div className="header">
          <Header setIsSidebarOpen={setIsSidebarOpen}
                  toggleSidebar={toggleSidebar} loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}/>
        </div>
        <div className="row">
          <div className={`column left ${isSidebarOpen ? '' : 'hidden'}`}>
            <Sidebar/>
          </div>
          <div className="column middle">
            <Routes>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/accounts" element={<Accounts/>}/>
            </Routes>
          </div>
          {/*<div className="column right">*/}
          {/*  <p> Oikea sarake</p>*/}
          {/*</div>*/}
        </div>
      </Router>
  );
}

export default App;
