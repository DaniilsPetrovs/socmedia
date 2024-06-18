import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {profileThunkCreator} from '../../redux/Profile/ProfileReducer';
import styles from '../../styles/Profile/profileStaticInfo.module.css';
import avatar from '../../assets/images/auth/luxeWeb.png'


export const ProfileStaticInfo = () => {
    const {profile, status} = useSelector((state) => state.profile);
    const authorizedUserId = useSelector((state) => state.auth.data.id);
    const {email, login} = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();
    const {id} = useParams();

    const userId = Number(id) ? Number(id) : authorizedUserId;

    useEffect(() => {
        if (userId) {
            dispatch(profileThunkCreator(userId));
        }
    }, [authorizedUserId, id, dispatch, userId]);

    return (
        <div className={styles.profileContent}>
            <div className={styles.header}>
                <img src={avatar} alt="Profile" className={styles.profilePicture}/>
                <div className={styles.profileHeaderInfo}>
                    <h2 className={styles.profileName}>{profile.fullName}</h2>
                    {status && <p className={styles.status}>{status}</p>}
                </div>
            </div>
            <div className={styles.body}>
                {userId === authorizedUserId && (
                    <div className={styles.userInfo}>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Username:</strong> {login}</p>
                    </div>
                )}
                <div className={styles.section}>
                    <strong>About Me:</strong>
                    <p>{profile.aboutMe || 'No information available'}</p>
                </div>
                <div className={styles.section}>
                    <strong>Looking for A Job?</strong>
                    <p>{profile.lookingForAJob ? 'Yes' : 'No'}</p>
                </div>
                <div className={styles.section}>
                    <strong>Job Description:</strong>
                    <p>{profile.lookingForAJobDescription || 'No job preference mentioned'}</p>
                </div>
            </div>
            <div className={styles.contactsSection}>
                <strong>Contacts:</strong>
                <ul className={styles.contactList}>
                    {Object.entries(profile.contacts).map(([key, value]) => (
                        <li key={key} className={`${styles.contactItem} ${key.toLowerCase()}`}>
                            <span className={styles.contactType}>{key}:</span>
                            <span>{value || 'Not provided'}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


