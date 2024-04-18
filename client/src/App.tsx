import React from "react";
import "./App.css";
import { UserPage, Create } from "./pages/user/User";
import { LoginPage } from "./pages/log/Log";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Balance } from "./pages/balance/Balance";
import { BuyMenu } from "./pages/buy/BuyMenu";



function App() {//change or think ab routes of buy
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<Create />} />

        <Route path="user">
          <Route index element={<UserPage />} />
          <Route path="buy" element={<BuyMenu />} />
          <Route path="balance" element={<Balance />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
