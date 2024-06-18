


import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import styles from '../Users/UsersContainer.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {Paginator} from "../common/paginator";
import {getUsersThunkCreator, followThunkCreator, unfollowThunkCreator} from "../../redux/Users/UsersReducer";
import avatar from '../../assets/images/auth/luxeWeb.png'
import {
    getPageSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersFilterSelector,
    getUsersPageSelector
} from "../../redux/Selectors/UsersSelectors";

export const UsersContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(getUsersPageSelector);
    console.log('Users:', users)
    const page = useSelector(getPageSelector);
    const pageSize = useSelector(getPageSizeSelector);
    const totalUsersCount = useSelector(getTotalUsersCountSelector);
    const filter = useSelector(getUsersFilterSelector);

    useEffect(() => {
        dispatch(getUsersThunkCreator(page, pageSize, filter.term, filter.friend));
    }, [dispatch, page, pageSize, filter.term, filter.friend]);

    useEffect(() => {
        if (page !== undefined) {
            return navigate(`?page=${page}`);
        }
    }, [page]);

    const handleFollow = (userId) => {
        dispatch(followThunkCreator(userId));
    };

    const handleUnfollow = (userId) => {
        dispatch(unfollowThunkCreator(userId));
    };

    return (
        <div className={styles.container}>
            {users.map((user) => (
                <div className={styles.card} key={user.id}>
                    <div className={styles.nameWrapper}>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={avatar} alt={user.name} className={styles.avatar}/>
                        </NavLink>
                        <div>
                            <div className={styles.name}>{user.name}</div>
                            <span>@{user.name}</span>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        {user.followed
                            ? <button className={styles.followButton} onClick={() => handleUnfollow(user.id)}>Unfollow</button>
                            : <button className={styles.followButton} onClick={() => handleFollow(user.id)}>Follow</button>}
                    </div>
                </div>
            ))}
            <Paginator totalUsersCount={totalUsersCount}/>
        </div>
    );
};
