import instance from "../api";

export const authAPI = {
    authMe: () => {
        try {
            return instance.get('auth/me/')
        } catch (error) {
            console.log('Your error is ', error)
            throw error
        }

    },
    login: (email, password, rememberMe, captcha) => {
        try {
            return instance.post('/auth/login', {email, password, rememberMe, captcha})
        } catch (error) {
            throw error
        }
    },
    getCaptchaURL: () => {
        try {
            return instance.get('/security/get-captcha-url')
        }
        catch (error) {
            throw error
        }
    },
    deleteUser: () => {
      try {
          return instance.delete('/auth/login')
      }
      catch (error) {
          throw error
      }
    }
}