// import instance from "../api";
//
// export const usersAPI = {
//     getUsers: (currentPage = 1, pageSize = 10, term = '', friend ) => {
//         try {
//             return instance.get(`users?page=${currentPage}&pageSize=${pageSize}&term=${term}&friend=${friend}`).then(res => res.data);
//         } catch (error) {
//             console.log(error);
//             throw error;
//         }
//     },
//
//     setFollow: (userId) => {
//         try {
//             return instance.post(`/profile/${userId}`).then(res => res.data)
//         }
//         catch (error) {
//             throw error
//         }
//     }
// };
//



import instance from "../api";

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10, term = '', friend = null) => {
        return instance.get(`users?page=${currentPage}&pageSize=${pageSize}&term=${term}&friend=${friend}`)
            .then(res => res.data);
    },
    follow: (userId) => {
        return instance.post(`follow/${userId}`).then(res => res.data);
    },
    unfollow: (userId) => {
        return instance.delete(`follow/${userId}`).then(res => res.data);
    },
};