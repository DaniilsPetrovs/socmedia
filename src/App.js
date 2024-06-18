import './App.css';
import Header from "./components/Header/header";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";

import SideBar from "./components/SideBar/SideBar";
import NavigationRoutes from './Routes/NavigationRoutes'
import {useDispatch, useSelector} from "react-redux";
import {LoginPage} from "./components/Login/LoginPage";
import React, {useEffect} from "react";
import {initializedThunk} from "./redux/Initialized/initializedApp";
import {RightSideBar} from "./components/RightSideBar/RightSideBar";

const App = () => {

    const navigate = useNavigate()
    const {isAuth} = useSelector(state => state.auth.data)
    const initialized = useSelector(state => state.initializedApp.initialized)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(initializedThunk())
    }, [dispatch]);


    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate]);

    // useEffect(() => {
    //     if(!initialized) {
    //         return <div>hello my friend</div>
    //     }
    // }, [initialized]);

    return (
        <div>
            <Header/>
            <div className='app'>

                <SideBar className='sidebar-left'/>
                <div className='container-main'>
                    <Routes>
                        {NavigationRoutes.map(item => (
                            <Route path={item.path} element={item.element} key={item.name}/>
                        ))}
                    </Routes>
                </div>
                <div className='sidebar-right'>
                    <RightSideBar/>
                </div>
            </div>
        </div>

    )
}

export default App;
