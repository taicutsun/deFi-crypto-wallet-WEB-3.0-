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
      axios
        .post('http://localhost:3001/sendMoney', {
          cryptoI: cryptoI,
          _to: address,
          amountEther: amount.toString(),
        })
        .then((res: any) => {
          console.log(res.data);

          setMsg(res.data.msg);
          setClick(0);
        })
        .catch((err) => {
          if (err.response) console.log('error in sendmoney');
          else if (err.request) console.log('req sendmoney');
          else console.log('me sendmoney');

          // window.location.href = 'http://localhost:3000/';
        });
    }
  }, [amount, address, click]);

  return (
    <>
      <h1>
        перевод средств <NavBar />{' '}
      </h1>

      <div className="container">
        <div className="left-panel">
          <div className="balance">ваш баланс {balance} ETH</div>
          <form>
            <label className="form-label">количество</label>
            <input
              type="text"
              name="amount"
              className="form-input"
              min="0"
              pattern="[0-9]*"
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <label className="form-label">адресс</label>
            <input
              type="text"
              name="address"
              className="form-input"
              onChange={(e) => setAddress(e.target.value)}
            />
            {checkForInput && address !== '' ? (
              <button className="send-button" onClick={(e) =>{e.preventDefault(); setClick(click + 1);}}>
                отправить ефир
              </button>
            ) : (
              <div className="error-message">неправильный ввод количества или адресса</div>
            )}
            <div>{msg}</div>
          </form>
        </div>
        <div className="right-panel">
          
          <div>
            public keys: <Publickeys />
          </div>
        </div>
      </div>
    </>
  );
}
