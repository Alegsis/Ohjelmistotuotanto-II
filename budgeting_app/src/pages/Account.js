import React from 'react';
import AccountTransactionGrid from "../components/account/AccountTransactionGrid";
import {useParams} from "react-router-dom";


const Account = () => {
    const { AccountName } = useParams();

    return (
        <div className="transaction">
            <AccountTransactionGrid key={AccountName} AccountName={AccountName}/>
        </div>
    );
};

export default Account;