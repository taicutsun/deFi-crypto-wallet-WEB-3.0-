import React from 'react';
import '../../App.css';
import './Log.css';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
//redux imports
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setUser, selectLog, UserState } from '../../app/appSlice';
//redux imports
import { axLogin } from '../../api/posts';
import { setFlag } from '../user/User';

interface ErrMassProps {
  cl: number;
}

function LogMass(props: ErrMassProps) {
  const log = useAppSelector(selectLog);
  if (log.logged === 'failed' && props.cl >= 1) {
    return (
      <>
        <div className="errorMass">Пароль или Имя неверно</div>
      </>
    );
  } else return <></>;
}


export function LoginPage() {
  const [user, setUsername] = useState('');
  const [pass, setPass] = useState('');
  //for sending to server
  const dispatch = useAppDispatch();
  //for user
  const failed: UserState = {
    //для корректной отправки состаяния пользователя
    username: user,
    password: pass,
    logged: 'failed',
    balance: 0,
    cryptoI: -1,
  };
  //for user
  const [status, setStatus] = useState(false);
  const [click, setClick] = useState(0);

  useEffect(() => {
    if (click >= 1) {
      axLogin(user, pass).then((res) => {
        console.log(res);

        const pending: UserState = {
          //для корректной отправки состаяния пользователя
          username: user,
          password: pass,
          logged: 'pending',
          balance: res.balance,
          cryptoI: res.cryptoI,
        };

        if (res.status) {
          dispatch(setUser(pending));
          setStatus(true);
          setClick(0);
        } else if (!res.status) dispatch(setUser(failed));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click, status]);

  //for sending to server

  if (status) {
    return <Navigate to="/user" />;
  } else {
    return (
      <>
        <div id="mainWrap">
          <div className="greating">Вход</div>
          <form>
            <label>Имя</label>
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
            <label>пароль</label>
            <input type="text" name="password" onChange={(e) => setPass(e.target.value)} />
          </form>
          <button
            className="loginBtn"
            onClick={() => {
              setClick(click + 1);
            }}
          >
            Войти
          </button>
          <LogMass cl={click} />
          <div>
            <button className="backBtn">
              <Link className="Link" to="/">
                Назад
              </Link>
            </button>
          </div>
          <div onClick={() => setFlag(true)}>
            <Link className="Link" to="/create">
              Забыли пароль?
            </Link>
          </div>
        </div>
      </>
    );
  }
}
//for log
