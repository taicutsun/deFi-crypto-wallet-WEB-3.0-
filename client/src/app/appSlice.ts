import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { axSendCreate } from "../api/posts";

//interface and state
export interface CheckUserPass {
  username: string,
  password: string,
  secPass: string
}


export interface UserState {
  username: string,
  password: string,
  logged: "failed" | "pending",
  balance:number,
  cryptoI: number
}

const initialState: UserState = {
  username: "",
  password: "",
  logged: "pending",
  balance:0,
  cryptoI: -1
};


//interface and state

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {//login
      state.logged = action.payload.logged;
      state.username = action.payload.username;
      state.balance = action.payload.balance;
      state.cryptoI = action.payload.cryptoI;
    },
    createUser(state,action: PayloadAction<CheckUserPass>) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      if (state.password === action.payload.secPass && state.password !== "") axSendCreate(state.username, state.password);
      
    },
  },
});

export const { setUser, createUser } = appSlice.actions;

export const selectLog = (state: RootState) => state.app;//if logged
export const selectUserName = (state: RootState) => state.app.username;//users name
//export const selectUserPass = (state: RootState) => state.app.password;//users password
export const selectUserBalance = (state: RootState) => state.app.balance;//users password
export const selectUserIndex = (state: RootState) => state.app.cryptoI;//users balance

export default appSlice.reducer;
