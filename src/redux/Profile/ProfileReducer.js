import {aboutMeProfileAPI, profileAPI, setStatusAPI} from "../../api/Profile/profileAPI";


let initialState = {
    profile: {
        aboutMe: "",
        contacts: {
            facebook: "",
            website: '',
            vk: "",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "",
            mainLink: "",
        },
        lookingForAJob: false,
        lookingForAJobDescription: "",
        fullName: "",
        userId: 1,
        photos: {
            small: "" ,
            large: ""
        }
    },
    status: "" ,
    error: ""
}



export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'SET_PROFILE_STATUS' :
            return {
                ...state,
                status: action.status
            }



        default:
            return state;
    }
};


let profileActionCreator = (profile) => ({
    type: "SET_USER_PROFILE",
    profile
})


let setStatusActionCreator = (status) => ({
    type: 'SET_PROFILE_STATUS',
    status
})





export const profileThunkCreator = (userId) => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.profileAuth(userId)
            const statusData = await profileAPI.getStatus(userId)
            dispatch(profileActionCreator(data))
            dispatch(setStatusActionCreator(statusData))
        } catch (error) {
            throw error
        }
    }
}




export const setStatusProfileThunkCreator = (status) => {
     return async () => {
        try {
            const data = await setStatusAPI.setStatus(status)
        }
        catch (error) {
            throw error
        }
    }
}



export const  aboutMeThunkCreator = (profile) => {
    return async () => {
        try {
            const data = await aboutMeProfileAPI.aboutMe(profile)
            if(data.resultCode !== 0) {
                data.messages.forEach((item) => {
                    alert(item)
                })
            }
            }
        catch (error) {
        }
    }
}


