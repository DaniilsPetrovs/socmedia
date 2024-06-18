import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import styles from './LoginPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator} from "../../redux/Auth/AuthReducer";
import {Navigate, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
export const LoginPage = () => {
    const authMe = useSelector(state => state.auth)
    const dispatch = useDispatch()


    if (authMe.data.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    const handleSubmit = (values, {resetForm}) => {
        let {email, password, rememberMe, captcha} = values
        dispatch(loginThunkCreator(email, password, rememberMe, captcha))
        Cookies.set('email' , email)
        Cookies.set('rememberMe', rememberMe)
        resetForm();
    };

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: '',
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>
                <h1>Login</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className={styles.inputGroup}>
                                <label>Email</label>
                                <Field type="email" name="email" component="input" className={styles.inputField}/>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Password</label>
                                <Field type="password" name="password" component="input" className={styles.inputField}/>
                            </div>
                            <div className={styles.inputGroup}>
                                <div className={styles.checkboxGroup}>
                                    <Field type="checkbox" name="rememberMe" component="input"/>
                                    <label>Remember Me</label>
                                </div>
                            </div>
                            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                                Submit
                            </button>
                            {authMe.captchaURL && (
                                <div>
                                    <img src={authMe.captchaURL} alt='captcha'/>
                                    <Field type='text' name='captcha' placeholder='Type text for image' component='input'/>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
