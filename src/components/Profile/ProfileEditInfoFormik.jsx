import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { aboutMeThunkCreator, setStatusProfileThunkCreator } from "../../redux/Profile/ProfileReducer";
import styles from '../../styles/Profile/profileinfo.module.css';
import * as Yup from 'yup';

export const ProfileEditInfoFormik = ({ setIsEdit }) => {
    const { profile, status } = useSelector(state => state.profile);

    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        await dispatch(aboutMeThunkCreator(values));
        await dispatch(setStatusProfileThunkCreator(values.status));
        setIsEdit(false);
    };

    // Dynamically create a validation schema for the contacts
    // const contactsValidationSchema = Yup.object().shape(
    //     Object.keys(profile.contacts).reduce((acc, key) => {
    //         acc[key] = Yup.string()
    //             .max(50, 'Too Long!')
    //         return acc;
    //     }, {})
    // );

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required'),
        aboutMe: Yup.string().min(5, 'Too short!').max(30, 'Too long!').required('Required'),
        lookingForAJob: Yup.boolean().oneOf([true], 'It means that you are looking for a job'),
        lookingForAJobDescription: Yup.string().min(5, 'Too short!').max(30, 'Too long!').required('Required'),
        status: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required'),
        // contacts: contactsValidationSchema
    });

    const initialValues = {
        ...profile,
        status
    };

    return (
        <div className={styles.editFormContainer}>
            <h1>Edit Your Profile</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={SignupSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <ul className={styles.editFormList}>
                            <li className={styles.editFormItem}>
                                <span>Full name</span>
                                <Field name="fullName" placeholder="Enter your full name" component="input" />
                                {errors.fullName && touched.fullName && (
                                    <div className={styles.validationError}>{errors.fullName}</div>
                                )}
                            </li>
                            <li className={styles.editFormItem}>
                                <span>About me</span>
                                <Field name="aboutMe" placeholder="About me" component="textarea" />
                                {errors.aboutMe && touched.aboutMe && (
                                    <div className={styles.validationError}>{errors.aboutMe}</div>
                                )}
                            </li>
                            <li className={styles.editFormItem}>
                                <span>Am I looking for a job?</span>
                                <Field name="lookingForAJob" component="input" type="checkbox" />
                                {errors.lookingForAJob && touched.lookingForAJob && (
                                    <div className={styles.validationError}>{errors.lookingForAJob}</div>
                                )}
                            </li>
                            <li className={styles.editFormItem}>
                                <span>Job description</span>
                                <Field name="lookingForAJobDescription" component="textarea" />
                                {errors.lookingForAJobDescription && touched.lookingForAJobDescription && (
                                    <div className={styles.validationError}>{errors.lookingForAJobDescription}</div>
                                )}
                            </li>
                            <li className={styles.editFormItem}>
                                <span>Your status</span>
                                <Field name="status" component="input" />
                                {errors.status && touched.status && (
                                    <div className={styles.validationError}>{errors.status}</div>
                                )}
                            </li>
                            {profile.contacts && Object.entries(profile.contacts).map(([key, value]) => (
                                <li key={key} className={styles.editFormItem}>
                                    <span>{key}</span>
                                    <Field name={`contacts.${key}`} type="text" placeholder={value || 'Not provided'} />
                                    {/*{errors.contacts?.[key] && (*/}
                                    {/*    <div className={styles.validationError}>{errors.contacts[key]}</div>*/}
                                    {/*)}*/}
                                </li>
                            ))}
                        </ul>
                        <button type="submit" className={styles.profileButton}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
