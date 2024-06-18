import {authMeThunkCreator} from "../Auth/AuthReducer";
import React from 'react'



const initialState = {
    initialized : false,
}


export const InitializedAppReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return  {
                ...state,
                initialState: true
            }
        default:
            return state
    }
 }


 const initializedActionCreator = () => ({
     type: 'INITIALIZED_SUCCESS'
 })




export const initializedThunk = () => (dispatch) => {
   let promise = dispatch(authMeThunkCreator())
    Promise.all([promise]).then(()=> {
        dispatch(initializedActionCreator())
    }
    )
}


