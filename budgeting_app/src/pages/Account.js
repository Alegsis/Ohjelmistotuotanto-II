import React from 'react';
import TransactionGrid from '../components/TransactionGrid';
import AddTransaction from '../components/AddTransaction';

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