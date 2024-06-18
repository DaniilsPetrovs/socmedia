import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsersThunkCreator} from "../../redux/Users/UsersReducer";
import {getPageSizeSelector, getUsersFilterSelector} from "../../redux/Selectors/UsersSelectors";
import styles from './Paginator.module.css'
export const Paginator = ({totalUsersCount}) => {
    const dispatch = useDispatch();
    const filter = useSelector(getUsersFilterSelector);
    const pageSize = useSelector(getPageSizeSelector);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(0);

    const pagesPerGroup = 10;
    const totalPages = Math.ceil(totalUsersCount / pageSize);
    const totalGroups = Math.ceil(totalPages / pagesPerGroup);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        dispatch(getUsersThunkCreator(page, pageSize, filter.term, filter.friend));
    };

    const handleNextGroup = () => {
        if (currentGroup < totalGroups - 1) {
            setCurrentGroup(currentGroup + 1);
        }
    };

    const handlePreviousGroup = () => {
        if (currentGroup > 0) {
            setCurrentGroup(currentGroup - 1);
        }
    };

    useEffect(() => {
        if (filter.term || filter.term === '') {
            setCurrentPage(1);
            setCurrentGroup(0);
        }
    }, [filter.term]);

    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                onClick={() => handlePageClick(i)}
                className={`${styles.pageButton} ${currentPage === i ? styles.active : ''}`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className={styles.paginator}>
            <button onClick={handlePreviousGroup} disabled={currentGroup === 0} className={styles.navButton}>
                Previous
            </button>
            {pageButtons}
            <button onClick={handleNextGroup} disabled={currentGroup === totalGroups - 1} className={styles.navButton}>
                Next
            </button>
        </div>
    );
};
