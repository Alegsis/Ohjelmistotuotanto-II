import React from 'react';
import TransactionGrid from '../components/transaction/TransactionGrid';
import AddTransaction from '../components/transaction/AddTransaction';

const Accounts = () => {

  return (
      <div className="transaction">
        <div className="buttonWrapper">
          <AddTransaction/>
        </div>
        <TransactionGrid/>
      </div>
  );
};

export default Accounts;