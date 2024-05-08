import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import "./Home.css";
import { interval } from "../user/User";
import { useEffect } from "react";

export function Home() {
    useEffect(() => {//для остановки цикла когда пользователь выйдет из акк
        clearInterval(interval);
    }, []);

    return (
        <div id="homeWrap">
        <main>
            <h2>Добро пожаловать на начальную страницу!</h2>
        </main>
        <nav>
            <button className="homeBtn">
                <Link className="Link" to="/login">
                    Войти
                </Link>
            </button>
            <button className="homeBtn">
                <Link className="Link" to="/create">
                    Создать пользователя
                </Link>
            </button>
        </nav>
    </div>
    
    );
}

