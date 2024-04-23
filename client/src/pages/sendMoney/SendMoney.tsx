import React from 'react';
import '../../App.css';
import './SendMoney.css';
import { useState, useEffect } from 'react';
//redux imports
import { useAppSelector } from '../../app/hooks';
import { selectUserBalance, selectUserIndex } from '../../app/appSlice';
//redux imports
import { NavBar } from '../nav/NavBar';
import { axGetPublicKeys, axSendMoney } from '../../api/posts';
import axios from 'axios';

function Publickeys() {
  const [isLoading, setValueLoading] = useState(true);
  const [addresses, setAdresses] = useState([]);

  useEffect(() => {
    axGetPublicKeys().then((res) => {
      if (res.status) setAdresses(res.addresses);
    });
  }, []);

  useEffect(() => {
    setValueLoading(false);
  }, [addresses]);

  return (
    <>
      {isLoading ? (
        <>loading </>
      ) : (
        <ul>
          {addresses.map((address: string, index: number) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export function SendMoney() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [checkForInput, setcheckForInput] = useState(false);
  const [succses, setSuccses] = useState(false);
  const [click, setClick] = useState(0);
  const [msg, setMsg] = useState('');

  const balance: number = useAppSelector(selectUserBalance);
  const cryptoI: number = useAppSelector(selectUserIndex);

  useEffect(() => {
    if (amount > 0) setcheckForInput(true);
    else setcheckForInput(false);

    if (click > 0) {

      axios.post('http://localhost:3001/sendMoney', {
      cryptoI: cryptoI,
      _to: address,
      amountEther: amount.toString()
    })
    .then((res:any) => {
      console.log(res.data);

        if (res.data.succses) setSuccses(true);

        setMsg(res.data.msg);
        setClick(0);
        
    })
    .catch((err) => {
      if (err.response) console.log('error in sendmoney');
      else if (err.request) console.log('req sendmoney');
      else console.log('me sendmoney');

      window.location.href = 'http://localhost:3000/';
    });
    /*
      axSendMoney(cryptoI, address, amount.toString()).then((res: any) => {
        console.log(res);

        if (res.succses) setSuccses(true);

        setMsg(res.msg);
      });
      */
    }
  }, [amount,address,click]);

  if (succses) {
    return (
      <div>
        <h1>
          перевод средств <NavBar />{' '}
        </h1>
      </div>
    );
  } else {
    return (
      <>
        <h1>
          перевод средств <NavBar />{' '}
        </h1>

        <div>ваш баланс {balance}ETH</div>
        <form>
          <label style={{ color: 'black', display: 'block', margin: '10px 0' }}>количество</label>
          <input
            type="text"
            name="amount"
            min="0"
            pattern="[0-9]*"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            style={{
              display: 'block',
              width: '200px',
              padding: '8px',
              margin: '10px 0',
              borderColor: 'grey',
              borderWidth: '1px',
              backgroundColor: '#e0e0e0',
            }}
          />
          <label style={{ color: 'black', display: 'block', margin: '10px 0' }}>адресс</label>
          <input
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            style={{
              display: 'block',
              width: '200px',
              padding: '8px',
              margin: '10px 0',
              borderColor: 'grey',
              borderWidth: '1px',
              backgroundColor: '#e0e0e0',
            }}
          />
        </form>

        {checkForInput ? (
          <button onClick={() => setClick(click + 1)}>отправить ефир</button>
        ) : (
          'неправильный ввод количества или адресса    '
        )}

        <div>
          <div>{msg}</div>
          public keys: <Publickeys />
        </div>
      </>
    );
  }
}
