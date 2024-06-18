import React from 'react';
import styles from '../../styles/Users/UsersHeader.module.css';

const options = [
    { label: 'All', value: 'all' },
    { label: 'Followed', value: 'true' },
    { label: 'Unfollowed', value: 'false' }
];

const CustomFriendSelector = ({ field, form }) => {
    const handleClick = (value) => {
        form.setFieldValue(field.name, value);
    };

    return (
        <div className={styles.friendSelector}>
            {options.map(option => (
                <div
                    key={option.value}
                    className={`${styles.option} ${field.value === option.value ? styles.selected : ''}`}
                    onClick={() => handleClick(option.value)}
                >
                    {option.label}
                </div>
            ))}
        </div>
    );
};

export default CustomFriendSelector;
