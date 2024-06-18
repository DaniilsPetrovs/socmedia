import React from 'react'
import {Newsfeed} from "../components/Newsfeed/Newsfeed";
import { Users} from '../components/Users/Users'
import {Profile} from "../components/Profile/Profile";
import {LoginPage} from "../components/Login/LoginPage";


const navigationRoutes = [

    {path: '/login', element: <LoginPage/>, name:'Login'},
    {path: '/newsfeed', element: <Newsfeed/>, name: 'Newsfeed'},
    {path: '/users', element: <Users/>, name: 'Badges'},
    {path: '/profile/:id?', element: <Profile/>, name: 'Profile'},
]


export default navigationRoutes





