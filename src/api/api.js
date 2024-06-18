import axios from 'axios'


  const instance = axios.create ({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        'API-KEY': '0b56bad5-793e-41fa-ade9-c838f7b9a79f'
    }
})

export const newsApi = axios.create ({
    baseURL:'https://newsapi.org/v2/',
    headers: {
        'X-API-KEY' : '4c82d553db674548b9ffcb798b497f4a'
    }
})




export default instance
