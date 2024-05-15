import axios from 'axios';
import { setAlr, setExist, verOfCreate } from '../pages/user/User';

let tokens = {
  accessToken: '',
  refreshToken: '',
};

//for loginPage
export const axLogin = async (user: string, pass: string) => {
  const res = await axios.post('http://localhost:3001/login', {
    username: user,
    password: pass,
  });
  if (res.data.status) {
    tokens.accessToken = res.data.accessToken;
    tokens.refreshToken = res.data.refreshToken;
  } else if (res.data.status === false) {
    console.log('err in auth func');
  }
  return res.data;
};

//for loginPage

//for userPage
export async function sendAccToken() {
  axios
    .post(
      'http://localhost:3001/posts',
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    )
    .then((res) => {
      console.log('sended acc');
    })
    .catch((err) => {
      if (err.response) console.log('error in acctoken');
      else if (err.request) console.log('req');
      else console.log('me AcT');

      window.location.href = 'http://localhost:3000/';
    });
}

export async function sendRefToken() {
  axios
    .post(
      'http://localhost:3001/token',
      {
        token: `${tokens.refreshToken}`,
      },
      {},
    )
    .then((res) => {
      console.log('sended ref');
      tokens.accessToken = res.data.accessToken;
    })
    .catch((err) => {
      if (err.response) console.log('error in reftoken');
      else if (err.request) console.log('req refT');
      else console.log('me refT');

      window.location.href = 'http://localhost:3000/';
    });
}

export function axSendCreate(newuser: string, newpass: string): void {
  console.log(`verOfCreate=${verOfCreate}`);

  axios
    .post(`http://localhost:3001/create`, {
      username: newuser,
      password: newpass,
      verOfCreate: verOfCreate,
    })
    .then((res) => {
      setAlr(res.data.alrdCreate);
      setExist(res.data.donExist);

      console.log(res.data);
    })
    .catch((err) => {
      if (err.response) console.log('error in create');
      else if (err.request) console.log('req create');
      else console.log('me create');

      window.location.href = 'http://localhost:3000/';
    });
}

//for bC func
/*
export function axGetBalance(cryptoI: number): void {
  axios
    .post(`http://localhost:3001/create`, {
      cryptoI: cryptoI,
    })
    .then((res) => {
     
      console.log(res.data);
    })
    .catch((err) => {
      if (err.response) console.log("error in bal");
      else if (err.request) console.log("req bal");
      else console.log("me bal");
      
      window.location.href  = "http://localhost:3000/";
    });
}
*/

export async function axGetPublicKeys() {
  const res = await axios.get('http://localhost:3001/getPublicAddress', {});

  if (res.data.status === false) console.log('err in auth func');

  return res.data;
}

export async function axSendMoney(cryptoI: number, _to: string, amountEther: string) {
 
    const res = await axios.post('http://localhost:3001/sendMoney', {
      cryptoI: cryptoI,
      _to: _to,
      amountEther: amountEther,
    });

    return res.data;
}
