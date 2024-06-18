import {Link, NavLink} from 'react-router-dom'
import React from 'react'
import HOME from '../../assets/images/header/home-icon.svg'
import PROFILE from '../../assets/images/header/profile-icon.svg'
import MESSAGE from '../../assets/images/header/message-icon.svg'
import GROUPS from '../../assets/images/header/groups-icon.svg'
import SUBSCRIPTION from '../../assets/images/header/subscription-icon.svg'
import USERS from '../../assets/images/header/users.svg'
import avatar from '../../assets/images/auth/luxeWeb.png';


import HEART from '../../assets/images/header/heart.svg'
import styles from '../../styles/SideBar/SideBar.module.css'

const SideBar = () => {
    return (
        <section className={styles.sideBar}>
            <div>
                <div className={styles.block}>
                    <img className={styles.avatar} src={avatar}/>
                </div>
                <ul className={styles.sideBarList}>
                    <li><NavLink to='/newsfeed'><img src={HOME}/>Home</NavLink></li>
                    <li><NavLink to='/users'><img src={USERS}/>Users</NavLink></li>
                    <li><NavLink to='/exploreStories'><img src={MESSAGE}/>Messages</NavLink></li>
                    <li><NavLink to='/popularGroups'><img src={GROUPS}/>Groups</NavLink></li>
                    <li><NavLink to='/profile'><img src={PROFILE}/>Profile</NavLink></li>
                    <li><NavLink to='/profile'><img src={SUBSCRIPTION}/>Subscription</NavLink></li>
                </ul>
            </div>
        </section>
    )
}


export default SideBar