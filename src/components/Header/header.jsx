import React from 'react'
import {Link, Navigate, NavLink} from "react-router-dom";
import LOGO from "../../assets/images/header/petrowbook.svg"
import styles from '../../styles/header/header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../../redux/Auth/AuthReducer";


const Header = () => {
    const {login, isAuth} = useSelector(state => state.auth.data)
    const dispatch = useDispatch()

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <NavLink to={'/profile'}>
                    <img src={LOGO} alt="#"/>
                </NavLink>
            </div>

            <div className={styles.authButtons}>
                {isAuth ? (
                    <button onClick={() => dispatch(logoutThunk())}>{login} - Log out</button>
                ) : (
                    <NavLink to={"/login"}>
                        <button id="loginBtn">Login</button>
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Header
