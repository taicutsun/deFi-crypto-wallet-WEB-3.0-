import React from "react";
import "../../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//from redux
import { selectUserIndex } from "../../app/appSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
//from redux



//for balance
export function BuyMenu() {
    const [status, setStatus] = useState(false);
    const dispatch = useAppDispatch();
    const signer = useAppSelector(selectUserIndex);

    useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (status) {
        return (
            <>
                <div>Спасибо за покупку!</div>
                <button className="backBtn" style={{ width: '7%' }}>
                    <Link className="Link" to="/user">
                        Назад
                    </Link>
                </button>

            </>
        );
    }
    else {
        return (
            <div>


                <button className="backBtn" style={{ width: '7%' }}  >
                    <Link className="Link" to="/user">
                        Назад
                    </Link>
                </button>

            </div>
        );
    }
}
