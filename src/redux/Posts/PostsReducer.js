
const initialState = {
    posts: [],
};

export const PostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        case 'REMOVE_ALL_POSTS':
            return  {
                ...state,
                posts:[],
            }

        case 'REMOVE_POST' :
            return {
                ...state,
                posts: state.posts.filter((_, index) => index !== action.payload),
            }
        default:
            return state;
    }
};

export const PostsActionCreator = (payload) => ({
    type: 'ADD_POST',
    payload,
});



export const removeAllPosts  = () => ({
     type: 'REMOVE_ALL_POSTS'
})


export const removePost = (payload) =>  ({
  type: 'REMOVE_POST',
    payload
})