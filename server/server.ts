require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
//const ethers = require('ethers');//bloxkchain
const { ethers, JsonRpcProvider } = require('ethers');

const helpFuncs = require('./helpFunc');

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//for blockchain INIT

const LockArtifact = require('../blockchain/artifacts/contracts/Lock.sol/Lock.json');
const contractAddressArtifact = require('../blockchain/ignition/deployments/chain-31337/deployed_addresses.json');

const abi: any[] = LockArtifact.abi;
const contractAddress: string = contractAddressArtifact['LockModule#Lock'];
const provider = new JsonRpcProvider('http://127.0.0.1:8545');

const owner: any = new ethers.Wallet(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  provider,
);

interface forUsers {
  username: string;
  password: string;
  cryptoI: number;
}

let users: Array<forUsers> = [{ username: 'gg', password: 'gg', cryptoI: 0 }];

const contract = new ethers.Contract(contractAddress, abi, owner);
//for blockchain INIT

// Example usage

const toAddress: string = '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'; // recipient address
const amountInEther: string = '1'; // amount of Ether you want to send

/*
helpFuncs.sendEther(0, toAddress, amountInEther)
  .then(() => console.log(`success`))
  .catch((error: any) => console.error("Transaction failed:", error));
*/
  

//for blockchain

//for JWT
//переменые для хранение хэдэров карэнтюзера и токона(в идиале переделать)
let user: any;
let refreshTokens: Array<string> = [];
//переменые для хранение хэдэров карэнтюзера и токона(в идиале переделать)

//create
let indexOfUser: number = 1;
app.post('/create', (req: any, res: any) => {
  const { username, password, verOfCreate } = req.body;
  user = users.find((u) => u.username == username);
 
  if (user != undefined) res.send({ mass: 'user already created', alrdCreate: true });
  else if (!verOfCreate) {
    
    users.push({
      username: username,
      password: password,
      cryptoI: indexOfUser,
    });

    indexOfUser++;
    console.log(users);

    res.send({ mass: 'new user logged' });
  } else {
    if (user == undefined) res.send({ mass: 'user dont exist', donExist: true });
    else {
      user.password = password;
      res.send({ mass: 'new password setted' });
    }
  }
});

//создание токенов
app.post('/login', async (req: any, res: any) => {
  const { username, password } = req.body;
  if (username === '' || password === '')
    res.json({ mass: 'Username or password incorrect', status: false });

  user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    const accessToken = helpFuncs.generateAccessToken(user);
    const refreshToken: string = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
    );
    refreshTokens.push(refreshToken);
    
    const balance = await helpFuncs.getBalance(user.cryptoI);
 
    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      balance: parseFloat(balance),
      cryptoI:user.cryptoI,
      status: true, 
    });
  } else res.json({ mass: 'Username or password incorrect', status: false });
});

//обработка аксестокена
app.post('/posts', helpFuncs.authenticateToken, (req: any, res: any) => {
  res.json({ success: true });
});

//создание токенов
 
app.post('/token', (req: any, res: any) => {
  const refreshToken = req.body.token;
  if (refreshToken == null || undefined) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: string) => {
    if (err) return res.sendStatus(403);
    const accessToken = helpFuncs.generateAccessToken(user);
    //console.log('creating new atoken');
    res.json({ accessToken: accessToken });
  });
});

//for JWT

//blockchain
app.post('/getBalance', async (req: any, res: any) => {
  const { index } = req.body;
  console.log(`index = ${index}`);

  const balance:number = await helpFuncs.getBalance(index);

  res.json({ balance: balance });
});


app.listen(3001);

export { provider, contract };
