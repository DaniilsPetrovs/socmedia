import React from 'react';
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { getUsersThunkCreator } from "../../redux/Users/UsersReducer";
import styles from '../../styles/Users/UsersHeader.module.css';
import SearchICON from '../../assets/images/header/icons8-search.svg';
import CustomFriendSelector from './CustomFriendSelector';

export const UsersHeader = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        let friendValue;
        if (values.friend === 'true') {
            friendValue = true;
        } else if (values.friend === 'false') {
            friendValue = false;
        } else {
            friendValue = null;
        }
        await dispatch(getUsersThunkCreator(1, 10, values.term, friendValue));
    };

    const initialValues = {
        term: '',
        friend: 'all' // all, followed, unfollowed
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
                <Form>
                    <div className={styles.header}>
                        <div className={styles.form}>
                            <div className={styles.searchWrapper}>
                                <img className={styles.searchIcon} src={SearchICON} alt="Search Icon" />
                                <Field name='term' component='input' placeholder="Search users..." className={styles.searchInput} />
                            </div>
                            <button type="submit" className={styles.searchButton}>Search</button>
                        </div>
                        <div className={styles.customFriendsWrapper}>
                            <Field name="friend" component={CustomFriendSelector} />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
