import instance from "../api";

export const profileAPI = {
    profileAuth: (userId) => {
        try {
            return instance.get('/profile/' + userId).then(res => res.data)
        }
        catch (error) {
            console.log('Your error is', error)
            throw error
        }
    },
    getStatus:(userID) => {
        try {
        return instance.get('/profile/status/' + userID).then(res => res.data)
        }
        catch (error) {

        }
    }
}


export const setStatusAPI = {
    setStatus: (status) => {
        try {
            return instance.put('/profile/status/' , {status})
        }
        catch (error) {
            throw error
        }
    }
}


export const aboutMeProfileAPI = {
    aboutMe: (profile) => {
        try {
            return  instance.put('/profile/',profile)


        }
        catch (error) {
            console.log('Your error is ' , error)
            throw error
        }

    }
}


