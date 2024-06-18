import {authAPI} from "../../api/Auth/authAPI";


const initialState = {
    resultCode: null,
    messages: [],
    data: {
        id: null,
        email: null,
        login: null,
        isAuth: false,
    },
    captchaURL: null,
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                data: {
                    ...state.data, ...action.payload
                }
            };
        case 'SET_CAPTCHA' :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};


const authMe = (id,login,email, isAuth) => ({
    type: 'SET_USER_DATA',
    payload: {id,login,email,isAuth}
});



const logoutActionCreator = () => ({
    type: 'SET_USER_DATA' ,
    payload: {id: null, email:null, login:null, isAuth:false}
})

const captchaActionCreator = (captchaURL) => ({
    type: 'SET_CAPTCHA',
    payload: {captchaURL}
})

export const authMeThunkCreator = () => {
    return async (dispatch) => {
        try {
            const { data } = await authAPI.authMe();
            console.log('ma boys' , data)

            if (data.resultCode === 0) {
                const {id, login, email} = data.data
                dispatch(authMe(id,login,email,true));
            }
        } catch (error) {
        }
    };
};


export const loginThunkCreator =  (email,password,rememberMe,captcha) => {
    return async (dispatch) => {
        try {
            const data = await  authAPI.login(email,password,rememberMe,captcha)
            if  (data.data.resultCode === 0) {
                dispatch(authMeThunkCreator())
            }
        }
        catch (error) {
            throw error
            }
        }
    }


    export const captchaThunkCreator = () => async (dispatch) => {
            const response = await authAPI.getCaptchaURL()
        console.log('Captcha URL' , response)
            const captchaURL = response.data.url
            dispatch(captchaActionCreator(captchaURL))
    }



   export const logoutThunk = () => {
        return async (dispatch) => {
        const data = await authAPI.deleteUser()
            if(data.data.resultCode === 0) {
                dispatch(logoutActionCreator())
            }
        }
    }