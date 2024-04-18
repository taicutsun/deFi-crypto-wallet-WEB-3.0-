import axios from "axios";
import { setAlr,setExist,verOfCreate } from "../pages/user/User";

let tokens = {
  accessToken: "",
  refreshToken: "",
};

//for loginPage
export const axLogin = async (user: string, pass: string) => {
  const res = await axios.post("http://localhost:3001/login", {
    username: user,
    password: pass,
  });
  if (res.data.status === true) {
    tokens.accessToken = res.data.accessToken;
    tokens.refreshToken = res.data.refreshToken;
  } else if (res.data.status === false) {
    console.log("err in auth func");
  }
  return res.data;
};



//for loginPage

//for userPage
export let success: boolean = true;
export async function sendAccToken() {
  axios
    .post(
      "http://localhost:3001/posts",
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    )
    .then((res) => {
      console.log("sended acc");
      success = res.data.success;
    })
    .catch((err) => {
      if (err.response) {
        console.log("error in acctoken");
        window.location.href  = "http://localhost:3000/";
      } else if (err.request) {
        console.log("req");
      } else {
        console.log("me");
      }
    });
}

export async function sendRefToken() {
  axios
    .post(
      "http://localhost:3001/token",
      {
        token: `${tokens.refreshToken}`,
      },
      {}
    )
    .then((res) => {
      console.log("sended ref");
      tokens.accessToken = res.data.accessToken;
    })
    .catch((err) => {
      if (err.response) {
        console.log("error in reftoken");
        window.location.href  = "http://localhost:3000/";
      } else if (err.request) {
        console.log("req");
      } else {
        console.log("me");
      }
    });
}

export function axSendCreate(newuser: string, newpass: string): void {
  console.log(`verOfCreate=${verOfCreate}`);

  axios
    .post(`http://localhost:3001/create`, {
      username: newuser,
      password: newpass,
      verOfCreate:verOfCreate
    })
    .then((res) => {
      setAlr(res.data.alrdCreate);
      setExist(res.data.donExist);

      console.log(res.data);
    })
    .catch((err) => {
      if (err.response) {
        console.log("why");
      } else if (err.request) {
        console.log("req");
      } else {
        console.log("me");
      }
    });
}

//for bC func
export function axGetBalance(cryptoI: number): void {

  axios
    .post(`http://localhost:3001/create`, {
      cryptoI: cryptoI,
    })
    .then((res) => {
     
      console.log(res.data);
    })
    .catch((err) => {
      if (err.response) {
        console.log("why");
      } else if (err.request) {
        console.log("req");
      } else {
        console.log("me");
      }
    });
}
