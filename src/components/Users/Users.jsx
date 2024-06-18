// Users.js
import React from 'react';
import { UsersHeader } from "./UsersHeader";
import { UsersContainer } from "./UsersContainer";
import styles from '../Users/users.module.css';

export const Users = () => {
    return (
        <section className={styles.usersSection}>
            <div className={styles.usersWrapper}>
                <UsersHeader />
                <UsersContainer />
            </div>
        </section>
    );
};
