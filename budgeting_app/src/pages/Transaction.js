import React from 'react'
import TransactionGrid from '../components/TransactionGrid';
import Button from '@mui/material/Button';
import AddTransaction from '../components/AddTransaction';

const Transaction = () => {
  const openAddTransaction = () => {
    AddTransaction();
  }

    return (
        <div className ='transaction'>

          <div className="buttonWrapper">
            <AddTransaction/>
          </div>

          <TransactionGrid/>
        </div>
    );
};

export default Transaction;