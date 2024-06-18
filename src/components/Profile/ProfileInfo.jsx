import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authMeThunkCreator} from '../../redux/Auth/AuthReducer';
import petrowBook from '../../assets/images/auth/petrowbookwall.png';
import styles from '../../styles/Profile/profileinfo.module.css';
import avatar from '../../assets/images/auth/luxeWeb.png';
import {useParams} from 'react-router-dom';
import {aboutMeThunkCreator, profileThunkCreator} from '../../redux/Profile/ProfileReducer';
import {ProfileEditInfoFormik} from "./ProfileEditInfoFormik";
import {ProfileStaticInfo} from "./ProfileStaticInfo";
import {ProfilePosts} from "./ProfilePosts";

export const ProfileInfo = () => {
    const authorizedUserId = useSelector(state => state.auth.data.id);
    const {profile, status} = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const {id} = useParams();
    const [isEdit, setIsEdit] = useState(false);

    // useEffect(() => {
    //     dispatch(authMeThunkCreator());
    // }, [dispatch]);

    const userId = Number(id) ? Number(id) : authorizedUserId;

    useEffect(() => {
        if (userId) {
            dispatch(profileThunkCreator(userId));
        }
    }, [authorizedUserId, id, dispatch, userId]);

    const handleSetEdit = () => {
        setIsEdit(!isEdit);
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <img className={styles.profileCover} src={petrowBook} alt="Cover"/>
            </div>
            <div className={styles.profileContent}>
                <div className={styles.profileAvatarWrapper}>
                    <img className={styles.profileAvatar} src={avatar} alt="Avatar"/>
                </div>
                <div className={styles.profileDetails}>
                    <div className={styles.profileName}>{profile.fullName}</div>
                    <div className={styles.profileStatus}>{status}</div>
                </div>
                {userId === authorizedUserId && (
                    <button onClick={handleSetEdit} className={styles.profileButton}>
                        Edit Profile
                    </button>
                )}

            </div>
            <hr className={styles.line}/>
            <div className={styles.profileInfo}>
                {!isEdit ? (
                    <div className={styles.profileInfoWrapper}>
                        <div className={styles.profileStaticalInfo}>
                            <ProfileStaticInfo/>
                        </div>
                        <div className={styles.profilePosts}>
                            <ProfilePosts/>
                        </div>
                    </div>

                ) : (
                    <div>
                        <ProfileEditInfoFormik setIsEdit={setIsEdit}/>
                    </div>
                )}
            </div>
            {/*<div className={styles.profilePosts}>*/}
            {/*    <ProfilePosts/>*/}
            {/*</div>*/}
            {/*</div>*/}
        </div>
    )
        ;
};
