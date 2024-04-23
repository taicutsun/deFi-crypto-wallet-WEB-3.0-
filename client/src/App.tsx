import React from "react";
import "./App.css";
import { UserPage, Create } from "./pages/user/User";
import { LoginPage } from "./pages/log/Log";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { SendMoney } from "./pages/sendMoney/SendMoney";




function App() {//change or think ab routes of buy
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<Create />} />

        <Route path="user">
          <Route index element={<UserPage />} />
          <Route path="sendMoney" element={<SendMoney />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
