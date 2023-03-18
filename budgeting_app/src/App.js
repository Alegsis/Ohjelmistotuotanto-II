import './App.css';
import Sidebar from './components/application-interface/Sidebar';
import Header from './components/application-interface/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import {useEffect, useState} from 'react';
import Account from "./pages/Account";

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [createAccSuccess, setCreateAccSuccess] = useState(false);

    const handleCreateAccSuccess = () => {
        setCreateAccSuccess(true);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        if (localStorage.getItem('UserID') !== null) {
            setLoggedIn(true)
            setTimeout(() => {
                localStorage.clear();
                setLoggedIn(false)
            }, 3600000); // 3600000 milliseconds = 60 minutes
        }
    }, [localStorage.getItem('UserID')])

    return (
        <Router>
            <div className="header">
                <Header setIsSidebarOpen={setIsSidebarOpen} toggleSidebar={toggleSidebar} loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn} createAccSuccess={createAccSuccess}
                        setCreateAccSuccess={setCreateAccSuccess}/>
            </div>
            <div className="row">
                <div className={`column left ${isSidebarOpen ? '' : 'hidden'}`}>
                    <Sidebar loggedIn={loggedIn} createAccSuccess={createAccSuccess} setCreateAccSuccess={setCreateAccSuccess}
                             handleCreateAccSuccess={handleCreateAccSuccess}/>
                </div>
                <div className={`column middle ${loggedIn ? '' : 'hidden'}`}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/accounts" element={<Accounts loggedIn={loggedIn}/>}/>
                        <Route path={`/accounts/:AccountName`} element={<Account/>}/>
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
