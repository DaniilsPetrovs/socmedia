// import {createSelector} from 'reselect'
// import {queries} from "@testing-library/react";
//
//
//
// export const getUsersPage = (state) => state.usersPage
//
//
// export const getUsersPageSelector =  createSelector(
//     [getUsersPage],
//     (usersPage) => usersPage.users
// )
//
// export const getPageSizeSelector = createSelector(
//     [getUsersPage],
//     (usersPage) => usersPage.pageSize
// )
//
// export const getTotalUsersCountSelector = createSelector(
//     [getUsersPage],
//     (usersPage) => usersPage.totalUsersCount
// )
//
//
// export const getPageSelector = createSelector (
//     [getUsersPage],
//     (usersPage) => usersPage.page
// )
//
//
// export const getIsFetchingSelector = createSelector(
//     [getUsersPage],
//     (usersPage) => usersPage.isFetching
// )
//
//
//
// export const getFollowingInProgressSelector = createSelector (
//     [getUsersPage],
//     (usersPage) => usersPage.followingInProgress
// )
//
//
// export const getUsersFilterSelector = createSelector(
//     [getUsersPage],
//     (usersPage) => usersPage.filter
// )

import {createSelector} from 'reselect';

export const getUsersPage = (state) => state.usersPage;

export const getUsersPageSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.users
);

export const getPageSizeSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.pageSize
);

export const getTotalUsersCountSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.totalUsersCount
);

export const getPageSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.page
);

export const getIsFetchingSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.isFetching
);

export const getFollowingInProgressSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.followingInProgress
);

export const getUsersFilterSelector = createSelector(
    [getUsersPage],
    (usersPage) => usersPage.filter
);
