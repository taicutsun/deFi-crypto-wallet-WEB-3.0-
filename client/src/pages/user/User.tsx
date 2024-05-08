/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../../App.css';
import './User.css';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
//redux imports
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  CheckUserPass,
  createUser,
  selectUserName,
  selectUserBalance,
  //selectUserIndex,
} from '../../app/appSlice'; //jwt and else pt1
//redux imports
import { sendAccToken, sendRefToken } from '../../api/posts';
import { NavBar } from '../nav/NavBar';



//for logged user
export let interval: any; //для остановки цикла когда пользователь выйдет из акк
function UserPage() {
  const username: string = useAppSelector(selectUserName);
  const balance: number = useAppSelector(selectUserBalance);
 // const dispatch = useAppDispatch();

  useEffect(() => {
    //отправляю токен 1 раз при рендере и создаю интервал в котором вызываю отправку токена повторно
    clearInterval(interval); //при возвращении на страницу после каких либо действий создается еще один интервал---я его удоляю

    sendAccToken().then((res) => {
      interval = setInterval(() => {
        sendRefToken().then((res) => {
          setTimeout(async () => {
            await sendAccToken();
          }, 15000);
        });
      }, 14000);
    });
  }, []);

  return (
    <div>
    <header>
        <h1>
            Здравствуйте {username}, ваш баланс {balance} ETH
            <NavBar />
        </h1>
    </header>
    <ul> 
        <li className='liU'>
            <Link className="link" to="/user">Главная</Link>
        </li>
        <li className='liU'>
            <Link className="link" to="/user/sendMoney">Перевод средств</Link>
        </li>
        <li className='liU'>
            <Link className="link" to="/">Выйти</Link>
        </li>
    </ul>
</div>
  );
}
//for logged user

//for flag
let verOfCreate: boolean = false; //true for new user;false-password
let alrdCreate: boolean = false;
let donExist: boolean = false;

//set func
function setFlag(value: boolean): void {
  verOfCreate = value;
}

function setAlr(value: boolean): void {
  alrdCreate = value;
}

function setExist(value: boolean): void {
  donExist = value;
}

//set func

//for new User
function Create() {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(false);
  const [newuser, setNewUsername] = useState('');
  const [newpass, setNewPass] = useState('');
  const [secpass, setSecPass] = useState('');
  const [click, setClick] = useState(0);

  const user: CheckUserPass = {
    username: newuser,
    password: newpass,
    secPass: secpass,
  };

  useEffect(() => {
    if (
      newuser !== '' &&
      newpass === secpass &&
      newpass !== '' &&
      alrdCreate !== true &&
      donExist !== true
    ) {
      //have to rework click>1(not smart solution)
      console.log(user);
      setStatus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click]);

  if (status) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <div id="createWrap">
          <div className="greating">
            {verOfCreate === false
              ? 'Введите данные для создания пользователя'
              : 'Введите данные для создания нового пароля'}
          </div>
          <form>
            <label>Имя</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <label>пароль</label>
            <input
              type="text"
              name="password"
              id="addPass"
              onChange={(e) => setNewPass(e.target.value)}
            />
            <label>подтвердите пароль</label>
            <input
              type="text"
              name="password"
              id="addPass"
              onChange={(e) => setSecPass(e.target.value)}
            />
          </form>
          <div>
            {' '}
            <button
              className="loginBtn"
              onClick={() => {
                dispatch(createUser(user));
                setClick(click + 1);
              }}
            >
              {verOfCreate === false ? 'Создать пользователя' : 'создать пароль'}
            </button>
          </div>
          <div className="errorMass">
            {' '}
            {secpass === newpass ? '' : 'проверте поля : подтверждения пароля и пароль'}
            {alrdCreate === false ? '' : 'пользователь с текущим именем уже создан'}
            {donExist === false ? '' : 'пользователь с текущим именем не существует'}
          </div>
          <div>
            <button className="backBtn">
              <Link className="Link" to="/">Назад</Link>
            </button>
          </div>
        </div>
      </>
    );
  }
}
//for new User

export { UserPage, Create, setFlag, verOfCreate, setAlr, setExist };
