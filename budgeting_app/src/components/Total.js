import Axios from 'axios';
import {useEffect, useState} from 'react';
import styled from '@emotion/styled';

export default function Total() {

  const [totalAmount, setTotalAmount] = useState(0);
  const [id, setId] = useState(1);
  const [style, setStyle] = useState('positive');

  useEffect(() => {
    fetchTotalAmount();
    setInterval(fetchTotalAmount, 15000);
  });

  const fetchTotalAmount = () => {

    const storedId = parseInt(localStorage.getItem('UserID'));
    setId(storedId);

    const baseurl = `http://localhost:3001/account/${id}/sum-balance`;

    Axios.get(baseurl).then((res) => {
      if (res.data.balance_summary !== null) {
        setTotalAmount(res.data.balance_summary);
      } else setTotalAmount(0);

    }).catch((err) => {
      console.log(err);
    });

  };

  const StyleSwitcher = styled.a`
    &.positive {
      color: darkseagreen;
    }

    &.negative {
      color: indianred;
    }

    &.neutral {
      color: ghostwhite;
    }
  `;

  return (
      <div className="totalOnAccounts">
        Total available on accounts:
        <StyleSwitcher className={style ? 'positive' : 'negative'}>
          {totalAmount}
        </StyleSwitcher>
      </div>
  );

}