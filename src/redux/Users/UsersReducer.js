// import {usersAPI} from "../../api/Users/usersAPI";
//
//
// const initialState = {
//     count: null,
//     page: 1,
//     pageSize: 10,
//     totalUsersCount: 0,
//     users: [],
//     isFetching: true,
//     followingInProgress: [],
//     filter: {
//         term: '',
//         friend: null
//     },
// }
//
// export const UsersReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'SET_USERS':
//             return {
//                 ...state,
//                 users: action.items,
//             }
//
//
//         case 'SET_TOTAL_USERS_COUNT' :
//             return  {
//                 ...state,
//                 totalUsersCount: action.totalUsersCount
//             }
//         case 'CURRENT_PAGE':
//             return {
//                 ...state,
//                 page: action.currentPage
//             }
//         case 'SET_FILTER':
//             return {
//                 ...state,
//                 filter: action.filter
//             }
//         default:
//             return state
//     }
// }
//
// const UsersPage = (items) => ({
//     type: 'SET_USERS',
//     items
// })
//
// const setCurrentPage = (currentPage) => ({
//     type: 'CURRENT_PAGE',
//     currentPage
// })
//
// const setTotalUsersCount = (totalUsersCount) => ({
//     type : 'SET_TOTAL_USERS_COUNT',
//     totalUsersCount
// })
//
// const setFilter = (filter) => ({
//     type: 'SET_FILTER',
//     filter
// })
//
// // export const toogleIsFetching = (payload) =>  ({
// //     type: 'IS_FETCHING',
// //     payload
// // })
//
//
//
// export const getUsersThunkCreator = (currentPage, pageSize, term = '', friend = null) => {
//     return async (dispatch) => {
//         try {
//             const data = await usersAPI.getUsers(currentPage, pageSize, term, friend);
//             console.log(data)
//             dispatch(UsersPage(data.items));
//             dispatch(setCurrentPage(currentPage));
//             dispatch(setFilter({ term, friend }));
//             dispatch(setTotalUsersCount(data.totalCount))
//         } catch (error) {
//             console.log('Your error', error);
//         }
//     }
// }
//
//
// export const setFollowThunkCreator = (userId) => {
//     return async (dispatch) =>  {
//         const data = await usersAPI.setFollow(userId)
//     }
// }
//
//
//
//
//
//
//


import {usersAPI} from "../../api/Users/usersAPI";

const initialState = {
    count: null,
    page: 1,
    pageSize: 10,
    totalUsersCount: 0,
    users: [],
    isFetching: true,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null // null = all users, true = followed users, false = unfollowed users
    },
};

export const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.items,
            };
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            };
        case 'CURRENT_PAGE':
            return {
                ...state,
                page: action.currentPage,
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.filter,
            };
        case 'FOLLOW_SUCCESS':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.userId ? {...user, followed: true} : user
                ),
            };
        case 'UNFOLLOW_SUCCESS':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.userId ? {...user, followed: false} : user
                ),
            };
        case 'TOGGLE_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            };
        default:
            return state;
    }
};

const UsersPage = (items) => ({type: 'SET_USERS', items});
const setCurrentPage = (currentPage) => ({type: 'CURRENT_PAGE', currentPage});
const setTotalUsersCount = (totalUsersCount) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount});
const setFilter = (filter) => ({type: 'SET_FILTER', filter});
const followSuccess = (userId) => ({type: 'FOLLOW_SUCCESS', userId});
const unfollowSuccess = (userId) => ({type: 'UNFOLLOW_SUCCESS', userId});
const toggleFollowingProgress = (isFetching, userId) => ({type: 'TOGGLE_FOLLOWING_PROGRESS', isFetching, userId});

export const getUsersThunkCreator = (currentPage, pageSize, term = '', friend = null) => async (dispatch) => {
    try {
        const data = await usersAPI.getUsers(currentPage, pageSize, term, friend);
        dispatch(UsersPage(data.items));
        dispatch(setCurrentPage(currentPage));
        dispatch(setFilter({term, friend}));
        dispatch(setTotalUsersCount(data.totalCount));
    } catch (error) {
        console.log('Your error', error);
    }
};

export const followThunkCreator = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await usersAPI.follow(userId);
    if (data.resultCode === 0) {
        dispatch(followSuccess(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const unfollowThunkCreator = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    const data = await usersAPI.unfollow(userId);
    if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};
