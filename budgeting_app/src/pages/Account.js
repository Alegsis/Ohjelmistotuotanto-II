import React, {useEffect} from 'react';
import AccountTransactionGrid from "../components/account/AccountTransactionGrid";
import {useParams} from "react-router-dom";


const Account = () => {
    const { AccountName } = useParams();

    return (
        <div className="transaction">
            <AccountTransactionGrid AccountName={AccountName}/>
        </div>
    );
};

export default Account;