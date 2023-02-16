import Axios from 'axios';
import {useEffect, useState} from 'react';
import styled from '@emotion/styled';

export default function Total() {

  const [totalAmount, setTotalAmount] = useState(0);
  const [debt, setDebt] = useState(0);
  const [id, setId] = useState(1);
  const [accountStyle, setAccountStyle] = useState(true);
  const [debtStyle, setDebtStyle] = useState(true);

  useEffect(() => {
    fetchTotalAmount();
    setInterval(fetchTotalAmount, 15000);
  });

  const handleAccountChange = (props) => {
    setAccountStyle(props);
  };

  const handleDebtChange = (props) => {
    setDebtStyle(props);
  };

  const fetchTotalAmount = () => {

    const storedId = parseInt(localStorage.getItem('UserID'));
    setId(storedId);

    const baseurl = `http://localhost:3001/account/${id}/sum-balance`;

    Axios.get(baseurl).then((res) => {
      if (res.data.balance_summary !== null) {
        if (parseInt(res.data.balance_summary) >= 0) {
          handleAccountChange(true);
        } else {
          handleAccountChange(false);
        }
        setTotalAmount(res.data.balance_summary);
      } else {
        setTotalAmount(0);
      }

      if (res.data.debt_summary !== null) {
        if (res.data.debt_summary >= 0) {
          handleDebtChange(true);
        } else {
          handleDebtChange(false);
        }
        setDebt(res.data.debt_summary);
      } else {
        setDebt(0);
      }

    }).catch((err) => {
      console.log(err);
    });

  };

  const TotalsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;

  `;

  const AccountStyleSwitcher = styled.a`
    &.positive {
      color: darkseagreen;
    }

    &.negative {
      color: indianred;
    }
  `;

  const SegmentWrapper = styled.div`
    padding: 0.5em;
  `;

  const DebtStyleSwitcher = styled.a`
    &.positive {
      color: darkseagreen;
    }

    &.negative {
      color: indianred;
    }
  `;

  return (
      <TotalsWrapper className="totals">
        <SegmentWrapper>
          Total:
          <AccountStyleSwitcher
              className={accountStyle ? 'positive' : 'negative'}>
            {totalAmount}€
          </AccountStyleSwitcher>
        </SegmentWrapper>
        <SegmentWrapper>
          Available to budget:
          <DebtStyleSwitcher className={debtStyle ? 'positive' : 'negative'}>
            {debt}€
          </DebtStyleSwitcher>
        </SegmentWrapper>
      </TotalsWrapper>
  );

}