import "./NavBar.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";


export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button
        className={`menu-button ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ≡
      </button>
      {isMenuOpen && (
        <nav className="navMenu">
          <ul>
            <li>
              <Link className="link" to="/user">
                Главная
              </Link>
            </li>
            <li>
              <Link className="link" to="/user/sendMoney">
               Перевод средств
              </Link>
            </li>
            <li>
              <Link className="link" to="/">
                Выйти
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};


